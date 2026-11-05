import type { Metadata } from "next";
import Work from "@/views/Work";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected projects by Rohit Shahi, including real-time platforms, AI systems, and full-stack products.",
  alternates: { canonical: "https://rohitdebugbugs.in/work" },
  openGraph: {
    type: "website",
    url: "https://rohitdebugbugs.in/work",
    title: "Selected Work | Rohit Shahi",
    description:
      "Selected projects by Rohit Shahi, including real-time platforms, AI systems, and full-stack products.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rohitdebugbugs",
    title: "Selected Work | Rohit Shahi",
    description:
      "Selected projects by Rohit Shahi, including real-time platforms, AI systems, and full-stack products.",
    images: ["/opengraph-image"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://rohitdebugbugs.in/work#page",
      url: "https://rohitdebugbugs.in/work",
      name: "Selected Work | Rohit Shahi",
      description:
        "Selected projects by Rohit Shahi, including real-time platforms, AI systems, and full-stack products.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://rohitdebugbugs.in/#website",
        url: "https://rohitdebugbugs.in/",
      },
      hasPart: projects.map((p) => ({
        "@type": "CreativeWork",
        name: p.title,
        url: `https://rohitdebugbugs.in/project/${p.id}`,
        description: p.subtitle,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://rohitdebugbugs.in/work#breadcrumb",
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
      ],
    },
  ],
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Work />
    </>
  );
}
