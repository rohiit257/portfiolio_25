import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { initVectorStore, insertChunks, countDocs, getDb, createIndex } from "@/lib/vector-store";
import { chunkText, embedBatch } from "@/lib/embeddings";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    // Bearer-token guard
    const auth = req.headers.get("authorization") ?? "";
    const secret = process.env.INGEST_SECRET ?? "rohit-ingest-2025";
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "1" || searchParams.get("force") === "true";

    // Initialise schema (idempotent)
    await initVectorStore();

    // Wipe existing if force
    if (force) {
      const sql = getDb();
      await sql`DELETE FROM portfolio_docs`;
      console.log("[ingest] Wiped existing chunks (force mode)");
    } else {
      // Check if already populated
      const existingCount = await countDocs();
      if (existingCount > 0) {
        return NextResponse.json({
          message: `Already ingested. ${existingCount} chunks in DB. Call with ?force=true to re-ingest.`,
          count: existingCount,
          tip: "POST /api/assistant/ingest?force=true",
        });
      }
    }

    // Read knowledge base
    const filePath = join(process.cwd(), "public", "knowledge.txt");
    const rawText = readFileSync(filePath, "utf-8");

    // Chunk by characters (500 chars, 100 overlap)
    const chunks = chunkText(rawText, 500, 100);
    console.log(`[ingest] ${chunks.length} chunks created from ${rawText.length} chars`);

    // Batch-embed with Mistral
    const batchSize = 16; // conservative batch size
    const allEmbeddings: number[][] = [];
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      console.log(`[ingest] Embedding batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)}`);
      const embeddings = await embedBatch(batch);
      allEmbeddings.push(...embeddings);
    }

    // Persist to NeonDB
    const records = chunks.map((text, i) => ({
      text,
      embedding: allEmbeddings[i],
      source: "knowledge.txt",
    }));
    await insertChunks(records);

    // Build ivfflat index now that the table has data
    await createIndex();

    return NextResponse.json({
      success: true,
      message: `Ingested ${chunks.length} chunks into NeonDB pgvector`,
      count: chunks.length,
      chars_processed: rawText.length,
    });
  } catch (err) {
    console.error("[ingest] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

// GET — check status
export async function GET() {
  try {
    const count = await countDocs();
    return NextResponse.json({
      chunks_in_db: count,
      status: count > 0 ? "ready" : "empty — run POST to ingest",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
