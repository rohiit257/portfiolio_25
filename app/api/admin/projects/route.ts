import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/lib/portfolio-queries";

export async function GET() {
  try {
    await requireAdminSession();
    return NextResponse.json(await getProjects());
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
    const id = await createProject({
      title: body.title,
      description: body.description,
      year: body.year,
      featured: Boolean(body.featured),
      githubUrl: body.githubUrl,
      demoUrl: body.demoUrl,
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
    await deleteProject(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 500 }
    );
  }
}
