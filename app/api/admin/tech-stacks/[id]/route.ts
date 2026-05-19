import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { upsertTechStack } from "@/lib/portfolio-queries";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdminSession();
    const id = Number(params.id);
    const body = await req.json();
    const row = await upsertTechStack(
      {
        name: body.name,
        simpleIconSlug: body.simpleIconSlug,
        colorLight: body.colorLight,
        colorDark: body.colorDark,
        sortOrder: body.sortOrder,
      },
      id
    );
    return NextResponse.json(row);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
