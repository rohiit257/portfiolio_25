import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetail from "@/pages/ProjectDetail";

type ProjectPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } };
  return {
    title: project.title,
    description: project.subtitle,
    alternates: { canonical: `/project/${project.id}` },
    openGraph: {
      type: "article",
      title: `${project.title} | Rohit Shahi`,
      description: project.subtitle,
      url: `https://rohitdebugbugs.in/project/${project.id}`,
      ...(project.heroImage ? { images: [project.heroImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Rohit Shahi`,
      description: project.subtitle,
      images: project.heroImage ? [project.heroImage] : ["/opengraph-image"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  if (!projects.some((item) => item.id === id)) notFound();
  return <ProjectDetail />;
}
export default ProjectDetail;
