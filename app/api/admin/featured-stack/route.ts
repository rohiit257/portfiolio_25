import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getFeaturedTechStack, setFeaturedTechStackIds } from "@/lib/portfolio-queries";

export async function GET() {
  try {
    await requireAdminSession();
    const items = await getFeaturedTechStack();
    return NextResponse.json(items);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdminSession();
    const { techStackIds } = (await req.json()) as { techStackIds: number[] };
    await setFeaturedTechStackIds(techStackIds ?? []);
    const items = await getFeaturedTechStack();
    return NextResponse.json(items);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
