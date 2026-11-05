import type { Metadata, Viewport } from "next";
import "../src/index.css";
import { SiteProviders } from "./providers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitdebugbugs.in"),
  title: {
    default: "Rohit Shahi — Software & AI Engineer",
    template: "%s — Rohit Shahi",
  },
  description:
    "Rohit Shahi is a Mumbai-based software engineer building agentic AI systems, real-time web platforms, and full-stack products.",
  applicationName: "Rohit Shahi Portfolio",
  creator: "Rohit Shahi",
  publisher: "Rohit Shahi",
  authors: [{ name: "Rohit Shahi", url: "https://rohitdebugbugs.in" }],
  keywords: [
    "Rohit Shahi",
    "rohitdebugbugs",
    "software engineer",
    "AI engineer",
    "agentic AI",
    "LLM",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Mumbai",
    "India",
    "portfolio",
    "web developer",
    "real-time systems",
    "distributed systems",
  ],
  category: "technology",
  classification: "Software Engineering Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://rohitdebugbugs.in/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://rohitdebugbugs.in/",
    siteName: "Rohit Shahi",
    locale: "en_IN",
    title: "Rohit Shahi | Software Engineer",
    description:
      "Agentic AI systems, real-time platforms, and full-stack products by Rohit Shahi.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rohit Shahi — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rohitdebugbugs",
    site: "@rohitdebugbugs",
    title: "Rohit Shahi | Software Engineer",
    description:
      "Agentic AI systems, real-time platforms, and full-stack products by Rohit Shahi.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Add your Google Search Console verification token here when ready
    // google: "your-token-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
