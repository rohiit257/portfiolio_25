import type { Metadata } from "next";
import Index from "@/views/Index";
import { defaultContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: {
    absolute: "Rohit Shahi — Software & AI Engineer",
  },
  description:
    "Explore Rohit Shahi’s portfolio in agentic AI, real-time web platforms, and full-stack engineering. Based in Mumbai, India.",
  alternates: { canonical: "https://rohitdebugbugs.in/" },
  openGraph: {
    type: "profile",
    url: "https://rohitdebugbugs.in/",
    title: "Rohit Shahi — Software & AI Engineer",
    description:
      "Explore Rohit Shahi’s portfolio in agentic AI, real-time web platforms, and full-stack engineering. Based in Mumbai, India.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Shahi — Software & AI Engineer",
    description:
      "Explore Rohit Shahi’s portfolio in agentic AI, real-time web platforms, and full-stack engineering. Based in Mumbai, India.",
    images: ["/opengraph-image"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://rohitdebugbugs.in/#website",
      url: "https://rohitdebugbugs.in/",
      name: "Rohit Shahi Portfolio",
      description:
        "Portfolio of Rohit Shahi, a software engineer building agentic AI systems, real-time web platforms, and full-stack products.",
      publisher: {
        "@id": "https://rohitdebugbugs.in/#rohit-shahi",
      },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://rohitdebugbugs.in/#webpage",
      url: "https://rohitdebugbugs.in/",
      name: "Rohit Shahi | AI & Full-Stack Engineer in Mumbai",
      isPartOf: {
        "@id": "https://rohitdebugbugs.in/#website",
      },
      about: {
        "@id": "https://rohitdebugbugs.in/#rohit-shahi",
      },
      mainEntity: {
        "@id": "https://rohitdebugbugs.in/#rohit-shahi",
      },
    },
    {
      "@type": "Person",
      "@id": "https://rohitdebugbugs.in/#rohit-shahi",
      name: defaultContent.name,
      alternateName: ["rohitdebugbugs", "Rohit"],
      url: "https://rohitdebugbugs.in/",
      image: "https://rohitdebugbugs.in/opengraph-image",
      description: defaultContent.bio,
      jobTitle: "Software Engineer",
      worksFor: defaultContent.experience.map((exp) => ({
        "@type": "Organization",
        name: exp.company,
        jobTitle: exp.role,
      })),
      alumniOf: defaultContent.education.map((edu) => ({
        "@type": "EducationalOrganization",
        name: edu.school,
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressCountry: "IN",
      },
      sameAs: [
        defaultContent.contact.linkedin,
        defaultContent.contact.github,
        defaultContent.contact.x,
      ],
      knowsAbout: [
        ...defaultContent.stack,
        ...defaultContent.interests.map((item) => item.title),
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Index />
    </>
  );
}
