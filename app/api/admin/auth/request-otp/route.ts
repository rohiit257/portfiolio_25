import { NextResponse } from "next/server";
import {
  generateOtp,
  getAdminEmail,
  storeOtp,
} from "@/lib/admin-auth";
import { sendAdminOtpEmail } from "@/lib/email";
import { initPortfolioTables } from "@/lib/portfolio-schema";

export async function POST() {
  try {
    await initPortfolioTables();
    const email = getAdminEmail();
    const otp = generateOtp();
    await storeOtp(email, otp);
    await sendAdminOtpEmail(email, otp);
    return NextResponse.json({
      ok: true,
      message: `Login code sent to ${email}`,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to send OTP";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
