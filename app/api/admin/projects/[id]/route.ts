import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { updateProject } from "@/lib/portfolio-queries";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdminSession();
    const body = await req.json();
    await updateProject(Number(params.id), {
      title: body.title,
      description: body.description,
      year: body.year,
      featured: Boolean(body.featured),
      githubUrl: body.githubUrl,
      demoUrl: body.demoUrl,
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
