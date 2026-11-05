import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetail from "@/views/ProjectDetail";

type ProjectPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } };
  return {
    title: project.title,
    description: project.subtitle,
    keywords: [...project.tags, "Rohit Shahi", "portfolio", "project"],
    alternates: { canonical: `https://rohitdebugbugs.in/project/${project.id}` },
    openGraph: {
      type: "article",
      title: `${project.title} — Rohit Shahi`,
      description: project.subtitle,
      url: `https://rohitdebugbugs.in/project/${project.id}`,
      siteName: "Rohit Shahi",
      ...(project.heroImage ? { images: [{ url: project.heroImage, alt: project.title }] } : { images: ["/opengraph-image"] }),
    },
    twitter: {
      card: "summary_large_image",
      creator: "@rohitdebugbugs",
      title: `${project.title} — Rohit Shahi`,
      description: project.subtitle,
      images: project.heroImage ? [project.heroImage] : ["/opengraph-image"],
    },
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `https://rohitdebugbugs.in/project/${project.id}#app`,
        name: project.title,
        description: project.fullDescription || project.subtitle,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url: `https://rohitdebugbugs.in/project/${project.id}`,
        author: {
          "@type": "Person",
          name: "Rohit Shahi",
          url: "https://rohitdebugbugs.in/",
        },
        keywords: project.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://rohitdebugbugs.in/project/${project.id}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://rohitdebugbugs.in/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: "https://rohitdebugbugs.in/work",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `https://rohitdebugbugs.in/project/${project.id}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectDetail />
    </>
  );
}
