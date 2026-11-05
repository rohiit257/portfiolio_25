import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
export const runtime = "nodejs";
export async function GET() {
  try {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
    const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS portfolio_content (id integer PRIMARY KEY CHECK (id = 1), content jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())`;
    const rows = await sql`SELECT content, updated_at FROM portfolio_content WHERE id = 1`;
    return NextResponse.json(rows[0] ?? { content: null });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load content" }, { status: 503 }); }
}
