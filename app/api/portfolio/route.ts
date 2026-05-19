import { NextResponse } from "next/server";
import {
  getExperiences,
  getFeaturedTechStack,
  getProjects,
} from "@/lib/portfolio-queries";

export async function GET() {
  try {
    const [techStack, experiences, projects] = await Promise.all([
      getFeaturedTechStack(),
      getExperiences(),
      getProjects(),
    ]);
    return NextResponse.json({ techStack, experiences, projects });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load portfolio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
