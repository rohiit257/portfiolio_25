import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Mistral } from "@mistralai/mistralai";
import { embedText } from "@/lib/embeddings";
import { retrieveTopK, countDocs, initVectorStore } from "@/lib/vector-store";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// ── Clients ──────────────────────────────────────────────────────────────────
function getGroq() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");
  return new Groq({ apiKey });
}

function getMistral() {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) throw new Error("MISTRAL_API_KEY is not set");
  return new Mistral({ apiKey });
}

// ── System prompt ─────────────────────────────────────────────────────────────
function buildSystemPrompt(context: string) {
  return `You are an AI assistant embedded in Rohit Shahi's developer portfolio. Your job is to answer questions about Rohit — his skills, projects, experience, and background — based on the provided context.

RULES:
- Answer concisely and naturally. Keep responses under 150 words unless detail is explicitly asked.
- Only answer from the given context. If something is not in the context, say you don't have that info but suggest the visitor contact Rohit directly.
- Be friendly and enthusiastic about Rohit's work.
- Never make up facts, numbers, or links.
- If asked something unrelated to Rohit's portfolio, politely redirect.

CONTEXT ABOUT ROHIT:
${context}

Current date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`;
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Embed the user query with Mistral
    let queryEmbedding: number[];
    try {
      queryEmbedding = await embedText(message);
    } catch (embeddingErr) {
      console.error("[chat] embedding failed:", embeddingErr);
      return NextResponse.json(
        { error: "Embedding service unavailable. Please ensure MISTRAL_API_KEY is set." },
        { status: 503 }
      );
    }

    // 2. Ensure schema exists (idempotent — safe to call every request)
    try {
      await initVectorStore();
    } catch (initErr) {
      console.warn("[chat] DB init skipped:", initErr);
    }

    // 3. Retrieve context via RAG, fall back to full knowledge.txt if DB empty
    let context = "";
    let ragActive = false;
    try {
      const docCount = await countDocs();
      if (docCount > 0) {
        const results = await retrieveTopK(queryEmbedding, 6);
        const filtered = results.filter((r) => r.similarity > 0.25);
        if (filtered.length > 0) {
          context = filtered.map((r) => r.chunk).join("\n\n---\n\n");
          ragActive = true;
        }
      }
    } catch (dbErr) {
      console.warn("[chat] DB retrieval failed:", dbErr);
    }

    // Fallback: read the full knowledge.txt directly (no vector search)
    if (!context) {
      try {
        const filePath = join(process.cwd(), "public", "knowledge.txt");
        context = readFileSync(filePath, "utf-8").slice(0, 6000); // keep within token budget
      } catch {
        context = `Rohit Shahi is a 21-year-old full-stack developer and blockchain engineer from India.
Currently working at PirateCrewFun building DeFi apps with Next.js and Solana.
Completed Solana Turbine cohort. Built: Versus (real-time voting), MetaBazar (NFT marketplace), LandLedger (blockchain land registry).
Contact: rohitshahi581@gmail.com`;
      }
    }

    console.log(`[chat] context source: ${ragActive ? "pgvector RAG" : "fallback knowledge.txt"}`);

    // 4. Build messages
    const systemPrompt = buildSystemPrompt(context);
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
      // Inject recent history (last 6 messages)
      ...history.slice(-6).map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // 4. Try Groq first
    try {
      const groq = getGroq();
      const model = process.env.GROQ_MODEL ?? "llama3-70b-8192";
      const completion = await groq.chat.completions.create({
        model,
        messages,
        temperature: 0.65,
        max_tokens: 512,
      });
      const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
      return NextResponse.json({
        reply,
        provider: "groq",
        model,
        context_chunks: context ? context.split("\n\n---\n\n").length : 0,
      });
    } catch (groqErr) {
      console.warn("[chat] Groq failed, falling back to Mistral:", groqErr);
    }

    // 5. Fallback: Mistral chat
    const mistral = getMistral();
    const mistralModel = process.env.MISTRAL_MODEL ?? "mistral-large-latest";
    const mistralRes = await mistral.chat.complete({
      model: mistralModel,
      messages,
      temperature: 0.65,
      maxTokens: 512,
    });
    const reply =
      (mistralRes.choices?.[0]?.message?.content as string) ??
      "Sorry, I couldn't generate a response right now.";
    return NextResponse.json({
      reply,
      provider: "mistral-fallback",
      model: mistralModel,
      context_chunks: context ? context.split("\n\n---\n\n").length : 0,
    });
  } catch (err) {
    console.error("[chat] unhandled error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
