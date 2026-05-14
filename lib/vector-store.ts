import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

/**
 * Initialise the pgvector extension and the documents table.
 * Does NOT create the ivfflat index here — that's done post-ingest.
 */
export async function initVectorStore() {
  const sql = getDb();
  await sql`CREATE EXTENSION IF NOT EXISTS vector`;
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_docs (
      id         SERIAL PRIMARY KEY,
      chunk      TEXT         NOT NULL,
      embedding  vector(1024) NOT NULL,
      source     TEXT,
      created_at TIMESTAMPTZ  DEFAULT NOW()
    )
  `;
}

/**
 * Create (or replace) the ivfflat index — call AFTER inserting rows.
 * Silently skips if it fails (e.g. empty table).
 */
export async function createIndex() {
  const sql = getDb();
  try {
    await sql`
      CREATE INDEX IF NOT EXISTS portfolio_docs_embedding_idx
      ON portfolio_docs
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 10)
    `;
  } catch (e) {
    console.warn("[vector-store] index creation skipped:", e);
  }
}

/**
 * Check whether the portfolio_docs table exists.
 */
async function tableExists(): Promise<boolean> {
  const sql = getDb();
  try {
    const rows = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables
        WHERE  table_schema = 'public'
        AND    table_name   = 'portfolio_docs'
      ) AS "exists"
    `;
    return Boolean((rows[0] as { exists: boolean }).exists);
  } catch {
    return false;
  }
}

export async function insertChunks(
  chunks: { text: string; embedding: number[]; source?: string }[]
) {
  const sql = getDb();
  for (const { text, embedding, source } of chunks) {
    const vec = `[${embedding.join(",")}]`;
    await sql`
      INSERT INTO portfolio_docs (chunk, embedding, source)
      VALUES (${text}, ${vec}::vector, ${source ?? "knowledge.txt"})
    `;
  }
}

/**
 * Top-k cosine-similarity retrieval.
 * Returns [] gracefully if table missing or query fails.
 */
export async function retrieveTopK(
  queryEmbedding: number[],
  k = 6
): Promise<{ chunk: string; similarity: number }[]> {
  if (!(await tableExists())) return [];
  const sql = getDb();
  const vec = `[${queryEmbedding.join(",")}]`;
  try {
    const rows = await sql`
      SELECT chunk,
             1 - (embedding <=> ${vec}::vector) AS similarity
      FROM   portfolio_docs
      ORDER  BY embedding <=> ${vec}::vector
      LIMIT  ${k}
    `;
    return rows as { chunk: string; similarity: number }[];
  } catch {
    return [];
  }
}

/**
 * Row count — returns 0 if table doesn't exist or query fails.
 */
export async function countDocs(): Promise<number> {
  if (!(await tableExists())) return 0;
  const sql = getDb();
  try {
    const rows = await sql`SELECT COUNT(*) AS cnt FROM portfolio_docs`;
    return Number((rows[0] as { cnt: string }).cnt);
  } catch {
    return 0;
  }
}
