import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  deleteTechStack,
  getTechStacks,
  upsertTechStack,
} from "@/lib/portfolio-queries";

export async function GET() {
  try {
    await requireAdminSession();
    const stacks = await getTechStacks();
    return NextResponse.json(stacks);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireAdminSession();
    const body = await req.json();
    const row = await upsertTechStack({
      name: body.name,
      simpleIconSlug: body.simpleIconSlug,
      colorLight: body.colorLight,
      colorDark: body.colorDark,
      sortOrder: body.sortOrder,
    });
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await deleteTechStack(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
