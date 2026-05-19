export async function sendAdminOtpEmail(to: string, otp: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to .env to send admin OTP emails."
    );
  }

  const from =
    process.env.RESEND_FROM ?? "Portfolio Admin <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Your portfolio admin login code",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 420px;">
          <p>Your one-time admin login code:</p>
          <p style="font-size: 28px; font-weight: 700; letter-spacing: 0.2em;">${otp}</p>
          <p style="color: #64748b; font-size: 14px;">Expires in 10 minutes. If you did not request this, ignore this email.</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to send email: ${res.status} ${body}`);
  }
}
