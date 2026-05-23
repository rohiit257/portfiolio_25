import { NextRequest, NextResponse } from "next/server";
import { SITE_HOST } from "@/lib/site-config";

const VERCEL_SUFFIX = ".vercel.app";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase();

  if (!host || host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return NextResponse.next();
  }

  const shouldRedirect =
    host.endsWith(VERCEL_SUFFIX) || host === "rohitdebugbugs.in";

  if (!shouldRedirect) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https";
  url.hostname = SITE_HOST;
  url.port = "";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
