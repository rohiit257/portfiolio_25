export const SITE_URL = "https://www.rohitdebugbugs.in";
export const SITE_HOST = "www.rohitdebugbugs.in";
export const SITE_NAME = "Rohit Shahi | rohitdebugbugs";

export const PERSON = {
  name: "Rohit Shahi",
  handle: "rohitdebugbugs",
  email: "rohitshahi581@gmail.com",
  jobTitle:
    "Full Stack Developer, Blockchain Engineer, AI Engineer, and Solana Developer",
  location: "India",
  image: `${SITE_URL}/avat.jpg`,
  sameAs: [
    "https://github.com/rohiit257",
    "https://twitter.com/rohitdebugbugs",
    "https://rohitdebugbugs.hashnode.dev",
    SITE_URL,
  ],
};

export const SEO = {
  title: "Rohit Shahi - Full Stack Developer, Blockchain & AI Engineer",
  description:
    "Rohit Shahi, known as rohitdebugbugs, is a full stack developer, blockchain engineer, AI engineer, and Solana developer building scalable web, DeFi, and agentic AI products.",
  shortDescription:
    "Full stack, blockchain, AI, and Solana developer portfolio of Rohit Shahi.",
  keywords: [
    "Rohit Shahi",
    "rohitdebugbugs",
    "Full Stack Developer",
    "Blockchain Engineer",
    "Blockchain Developer",
    "Solana Developer",
    "AI Engineer",
    "AI Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Web3 Developer",
    "Smart Contracts",
    "DeFi Developer",
    "India Full Stack Developer",
  ],
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getSearchVerification() {
  return {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.YANDEX_VERIFICATION || undefined,
    yahoo: process.env.YAHOO_SITE_VERIFICATION || undefined,
  };
}
