import { Mistral } from "@mistralai/mistralai";

let _client: Mistral | null = null;

function getMistral(): Mistral {
  if (!_client) {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) throw new Error("MISTRAL_API_KEY is not set");
    _client = new Mistral({ apiKey });
  }
  return _client;
}

const EMBEDDING_MODEL =
  process.env.MISTRAL_EMBEDDING_MODEL ?? "mistral-embed";

/**
 * Embed a single string.
 */
export async function embedText(text: string): Promise<number[]> {
  const client = getMistral();
  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    inputs: [text],
  });
  const embedding = response.data[0]?.embedding;
  if (!embedding) throw new Error("Mistral returned no embedding");
  return embedding as number[];
}

/**
 * Embed a batch of strings.
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const client = getMistral();
  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    inputs: texts,
  });
  return response.data.map((d) => (d.embedding ?? []) as number[]);
}

/**
 * Chunk text into fixed-size windows with overlap.
 * Uses a guaranteed-forward step so start never goes backwards.
 *
 * chunkSize: max characters per chunk
 * overlap:   characters shared between adjacent chunks
 */
export function chunkText(
  text: string,
  chunkSize = 500,
  overlap = 80
): string[] {
  // Normalize line endings, collapse 3+ blank lines into 2
  const normalized = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (normalized.length === 0) return [];

  const step = chunkSize - overlap; // always positive (500-80=420)
  const chunks: string[] = [];
  let start = 0;

  while (start < normalized.length) {
    const end = Math.min(start + chunkSize, normalized.length);
    const chunk = normalized.slice(start, end).trim();

    // Only keep non-trivial chunks
    if (chunk.length > 40) {
      chunks.push(chunk);
    }

    // Always advance by `step` — never go backwards
    start += step;
  }

  return chunks;
}
