import type { Metadata } from "next";
import Contact from "@/views/Contact";
import { defaultContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rohit Shahi about AI engineering, full-stack roles, or project collaboration.",
  alternates: { canonical: "https://rohitdebugbugs.in/contact" },
  openGraph: {
    type: "website",
    url: "https://rohitdebugbugs.in/contact",
    title: "Contact — Rohit Shahi",
    description:
      "Get in touch with Rohit Shahi about AI engineering, full-stack roles, or project collaboration.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rohitdebugbugs",
    title: "Contact — Rohit Shahi",
    description:
      "Get in touch with Rohit Shahi about AI engineering, full-stack roles, or project collaboration.",
    images: ["/opengraph-image"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://rohitdebugbugs.in/contact#page",
      url: "https://rohitdebugbugs.in/contact",
      name: "Contact Rohit Shahi",
      description:
        "Get in touch with Rohit Shahi about AI engineering, full-stack roles, or project collaboration.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://rohitdebugbugs.in/#website",
        url: "https://rohitdebugbugs.in/",
      },
      mainEntity: {
        "@type": "Person",
        name: defaultContent.name,
        email: `mailto:${defaultContent.contact.email}`,
        url: "https://rohitdebugbugs.in/",
        sameAs: [
          defaultContent.contact.linkedin,
          defaultContent.contact.github,
          defaultContent.contact.x,
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://rohitdebugbugs.in/contact#breadcrumb",
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
          name: "Contact",
          item: "https://rohitdebugbugs.in/contact",
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Contact />
    </>
  );
}
