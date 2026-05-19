import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { updateExperience } from "@/lib/portfolio-queries";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdminSession();
    const body = await req.json();
    await updateExperience(Number(params.id), {
      title: body.title,
      company: body.company,
      companyUrl: body.companyUrl,
      period: body.period,
      type: body.type,
      description: body.description,
      techStackIds: body.techStackIds ?? [],
      sortOrder: body.sortOrder,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
