import { NextResponse } from "next/server";
import { clearSessionCookieOptions } from "@/lib/admin-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const opts = clearSessionCookieOptions();
  res.cookies.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
    maxAge: opts.maxAge,
  });
  return res;
}
