import type { Metadata } from "next";
import Index from "@/pages/Index";
import { defaultContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "AI & Full-Stack Engineer in Mumbai",
  description: "Explore Rohit Shahi’s work in agentic AI, real-time systems, and full-stack engineering. Based in Mumbai, India.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "https://rohitdebugbugs.in/",
    title: "Rohit Shahi | AI & Full-Stack Engineer",
    description: "Explore Rohit Shahi’s work in agentic AI, real-time systems, and full-stack engineering. Based in Mumbai, India.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", title: "Rohit Shahi | AI & Full-Stack Engineer", description: "Explore Rohit Shahi’s work in agentic AI, real-time systems, and full-stack engineering. Based in Mumbai, India.", images: ["/opengraph-image"] },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://rohitdebugbugs.in/",
  mainEntity: {
    "@type": "Person",
    "@id": "https://rohitdebugbugs.in/#rohit-shahi",
    name: defaultContent.name,
    alternateName: "rohitdebugbugs",
    url: "https://rohitdebugbugs.in/",
    description: defaultContent.bio,
    jobTitle: "Software Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    sameAs: [defaultContent.contact.linkedin, defaultContent.contact.github, defaultContent.contact.x],
    knowsAbout: [...defaultContent.stack, ...defaultContent.interests.map((item) => item.title)],
  },
};

export default function HomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }} /><Index /></>;
}
