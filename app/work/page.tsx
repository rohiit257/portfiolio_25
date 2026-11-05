import type { Metadata } from "next";
import Work from "@/pages/Work";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected projects by Rohit Shahi, including real-time platforms, AI systems, and full-stack products.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "https://rohitdebugbugs.in/work",
    title: "Selected Work | Rohit Shahi",
    description: "Selected projects by Rohit Shahi, including real-time platforms, AI systems, and full-stack products.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", title: "Selected Work | Rohit Shahi", description: "Selected projects by Rohit Shahi, including real-time platforms, AI systems, and full-stack products.", images: ["/opengraph-image"] },
};

export default Work;
