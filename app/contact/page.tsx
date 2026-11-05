import type { Metadata } from "next";
import Contact from "@/pages/Contact";

export const metadata: Metadata = {
  title: "Contact Rohit Shahi",
  description: "Get in touch with Rohit Shahi about AI engineering, full-stack roles, or project collaboration.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "https://rohitdebugbugs.in/contact",
    title: "Contact Rohit Shahi",
    description: "Get in touch with Rohit Shahi about AI engineering, full-stack roles, or project collaboration.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", title: "Contact Rohit Shahi", description: "Get in touch with Rohit Shahi about AI engineering, full-stack roles, or project collaboration.", images: ["/opengraph-image"] },
};

export default Contact;
