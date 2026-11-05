import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyAdmin } from "@/lib/server-auth";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const keys = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];
  if (keys.some((key) => !process.env[key])) return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 503 });
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
  const timestamp = Math.round(Date.now() / 1000), folder = "portfolio";
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, process.env.CLOUDINARY_API_SECRET!);
  return NextResponse.json({ timestamp, folder, signature, apiKey: process.env.CLOUDINARY_API_KEY, cloudName: process.env.CLOUDINARY_CLOUD_NAME });
}
