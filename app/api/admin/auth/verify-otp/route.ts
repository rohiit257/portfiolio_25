import { NextResponse } from "next/server";
import {
  createSessionToken,
  getAdminEmail,
  sessionCookieOptions,
  verifyOtp,
} from "@/lib/admin-auth";
import { initPortfolioTables } from "@/lib/portfolio-schema";

export async function POST(req: Request) {
  try {
    await initPortfolioTables();
    const { otp } = (await req.json()) as { otp?: string };
    if (!otp || otp.length !== 6) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
    const email = getAdminEmail();
    const valid = await verifyOtp(email, otp);
    if (!valid) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 401 });
    }
    const token = createSessionToken(email);
    const res = NextResponse.json({ ok: true });
    const opts = sessionCookieOptions(token);
    res.cookies.set(opts.name, opts.value, {
      httpOnly: opts.httpOnly,
      secure: opts.secure,
      sameSite: opts.sameSite,
      path: opts.path,
      maxAge: opts.maxAge,
    });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
