import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { migrateSeedData } from "@/lib/portfolio-queries";

export async function POST(req: Request) {
  try {
    await requireAdminSession();
    const { force } = (await req.json().catch(() => ({}))) as {
      force?: boolean;
    };
    const result = await migrateSeedData(Boolean(force));
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Migration failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
