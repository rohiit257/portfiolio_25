import type { Metadata } from "next";
import "../src/index.css";
import { SiteProviders } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitdebugbugs.in"),
  title: {
    default: "Rohit Shahi | Software Engineer",
    template: "%s | Rohit Shahi",
  },
  description: "Rohit Shahi is a Mumbai-based software engineer building agentic AI systems, real-time web platforms, and full-stack products.",
  applicationName: "Rohit Shahi Portfolio",
  creator: "Rohit Shahi",
  authors: [{ name: "Rohit Shahi", url: "https://rohitdebugbugs.in" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: "https://rohitdebugbugs.in/",
    siteName: "Rohit Shahi",
    locale: "en_IN",
    title: "Rohit Shahi | Software Engineer",
    description: "Agentic AI systems, real-time platforms, and full-stack products by Rohit Shahi.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Rohit Shahi — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Shahi | Software Engineer",
    description: "Agentic AI systems, real-time platforms, and full-stack products by Rohit Shahi.",
    images: ["/opengraph-image"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteProviders>{children}</SiteProviders></body></html>;
}
