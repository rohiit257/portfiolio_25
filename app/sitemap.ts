import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const siteUrl = "https://rohitdebugbugs.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    ...projects.map((project) => ({
      url: `${siteUrl}/project/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
