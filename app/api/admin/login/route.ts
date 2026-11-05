import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; since: number }>();
export async function POST(request: Request) {
  const missing = ["DATABASE_URL", "JWT_SECRET"].filter((key) => !process.env[key]);
  if (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH) missing.push("ADMIN_PASSWORD or ADMIN_PASSWORD_HASH");
  if (missing.length) return NextResponse.json({ error: `Server is missing configuration: ${missing.join(", ")}` }, { status: 503 });
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const attempt = attempts.get(client) || { count: 0, since: Date.now() };
  if (Date.now() - attempt.since > 15 * 60 * 1000) { attempt.count = 0; attempt.since = Date.now(); }
  if (attempt.count >= 10) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  const body = await request.json().catch(() => ({}));
  const provided = String(body.password ?? "");
  const expected = process.env.ADMIN_PASSWORD || "";
  const valid = process.env.ADMIN_PASSWORD_HASH
    ? await bcrypt.compare(provided, process.env.ADMIN_PASSWORD_HASH)
    : provided.length === expected.length && Buffer.from(provided).equals(Buffer.from(expected));
  if (!valid) { attempt.count++; attempts.set(client, attempt); return NextResponse.json({ error: "Incorrect password." }, { status: 401 }); }
  attempts.delete(client);
  return NextResponse.json({ token: jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, { expiresIn: "12h" }) });
}
