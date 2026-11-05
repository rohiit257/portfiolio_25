import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  const required = ["DATABASE_URL", "JWT_SECRET", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];
  if (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH) required.push("ADMIN_PASSWORD or ADMIN_PASSWORD_HASH");
  const missing = required.filter((key) => !process.env[key]);
  return NextResponse.json({ configured: missing.length === 0, missing });
}
