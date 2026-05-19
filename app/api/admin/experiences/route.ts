import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "@/lib/portfolio-queries";

export async function GET() {
  try {
    await requireAdminSession();
    return NextResponse.json(await getExperiences());
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
    const id = await createExperience({
      title: body.title,
      company: body.company,
      companyUrl: body.companyUrl,
      period: body.period,
      type: body.type,
      description: body.description,
      techStackIds: body.techStackIds ?? [],
      sortOrder: body.sortOrder,
    });
    return NextResponse.json({ id });
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
    const id = Number(new URL(req.url).searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await deleteExperience(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
