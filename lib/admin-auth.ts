import { createHash, createHmac, randomInt, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { getDb } from "@/lib/vector-store";

const SESSION_COOKIE = "portfolio_admin_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24; // 24h
const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL ?? "rohitshahi581@gmail.com";
}

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    "portfolio-admin-dev-secret-change-in-production"
  );
}

function hashOtp(otp: string): string {
  return createHash("sha256")
    .update(`${getSessionSecret()}:${otp}`)
    .digest("hex");
}

export function generateOtp(): string {
  return String(randomInt(100000, 999999));
}

export async function storeOtp(email: string, otp: string) {
  const sql = getDb();
  const normalized = email.trim().toLowerCase();
  await sql`DELETE FROM admin_otp WHERE email = ${normalized}`;
  const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();
  await sql`
    INSERT INTO admin_otp (email, otp_hash, expires_at)
    VALUES (${normalized}, ${hashOtp(otp)}, ${expiresAt})
  `;
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  const sql = getDb();
  const normalized = email.trim().toLowerCase();
  const rows = await sql`
    SELECT id, otp_hash, expires_at, attempts
    FROM admin_otp
    WHERE email = ${normalized}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  const row = rows[0] as
    | { id: number; otp_hash: string; expires_at: string; attempts: number }
    | undefined;
  if (!row) return false;
  if (new Date(row.expires_at).getTime() < Date.now()) return false;
  if (row.attempts >= MAX_OTP_ATTEMPTS) return false;

  const expected = Buffer.from(row.otp_hash, "hex");
  const actual = Buffer.from(hashOtp(otp), "hex");
  const valid =
    expected.length === actual.length && timingSafeEqual(expected, actual);

  await sql`
    UPDATE admin_otp SET attempts = attempts + 1 WHERE id = ${row.id}
  `;

  if (valid) await sql`DELETE FROM admin_otp WHERE email = ${normalized}`;
  return valid;
}

type SessionPayload = { email: string; exp: number };

function encodeSession(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", getSessionSecret())
    .update(data)
    .digest("base64url");
  return `${data}.${sig}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = createHmac("sha256", getSessionSecret())
    .update(data)
    .digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf8")
    ) as SessionPayload;
    if (!payload.email || !payload.exp) return null;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createSessionToken(email: string): string {
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + SESSION_MAX_AGE_SEC * 1000,
  };
  return encodeSession(payload);
}

export function getSessionFromCookieValue(
  cookieValue: string | undefined
): SessionPayload | null {
  if (!cookieValue) return null;
  const session = decodeSession(cookieValue);
  if (!session) return null;
  if (session.email !== getAdminEmail().trim().toLowerCase()) return null;
  return session;
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return getSessionFromCookieValue(cookieStore.get(SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export async function requireAdminSession(): Promise<SessionPayload> {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}
