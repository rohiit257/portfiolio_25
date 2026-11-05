import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { verifyAdmin } from "@/lib/server-auth";
export const runtime = "nodejs";
export async function PUT(request: Request) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  try {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
    const body = await request.json();
    if (!body || !Array.isArray(body.projects)) return NextResponse.json({ error: "Content must include a projects array." }, { status: 400 });
    const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS portfolio_content (id integer PRIMARY KEY CHECK (id = 1), content jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())`;
    const rows = await sql`INSERT INTO portfolio_content (id, content, updated_at) VALUES (1, ${JSON.stringify(body)}::jsonb, now()) ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = now() RETURNING content, updated_at`;
    return NextResponse.json(rows[0]);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save content" }, { status: 500 }); }
}
