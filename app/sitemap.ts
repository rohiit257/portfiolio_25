import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const siteUrl = "https://rohitdebugbugs.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
      lastModified: now,
    },
    {
      url: `${siteUrl}/work`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
      lastModified: now,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/project/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: now,
    })),
  ];
}
