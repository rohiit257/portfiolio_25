/** Simple Icons CDN helpers — same pattern as tech-stack.tsx */
export function buildIconUrls(
  slug: string,
  colorLight: string,
  colorDark?: string
) {
  const dark = colorDark ?? colorLight;
  return {
    iconLight: `https://cdn.simpleicons.org/${slug}/${colorLight}`,
    iconDark: `https://cdn.simpleicons.org/${slug}/${dark}`,
  };
}

export type TechIconPreset = {
  name: string;
  slug: string;
  colorLight: string;
  colorDark?: string;
};

/** Curated presets for admin dropdown + seed migration */
export const TECH_ICON_PRESETS: TechIconPreset[] = [
  { name: "Next.js", slug: "nextdotjs", colorLight: "000000", colorDark: "ffffff" },
  { name: "Express.js", slug: "express", colorLight: "000000", colorDark: "ffffff" },
  { name: "Express", slug: "express", colorLight: "000000", colorDark: "ffffff" },
  { name: "TypeScript", slug: "typescript", colorLight: "3178C6" },
  { name: "C++", slug: "cplusplus", colorLight: "00599C" },
  { name: "C", slug: "c", colorLight: "A8B9CC" },
  { name: "Rust", slug: "rust", colorLight: "CE422B" },
  { name: "Solana", slug: "solana", colorLight: "14F195" },
  { name: "Ethereum", slug: "ethereum", colorLight: "3C3C3D", colorDark: "ffffff" },
  { name: "Solidity", slug: "solidity", colorLight: "363636", colorDark: "ffffff" },
  { name: "Neon", slug: "neon", colorLight: "00E599" },
  { name: "Prisma", slug: "prisma", colorLight: "2D3748", colorDark: "ffffff" },
  { name: "Zod", slug: "zod", colorLight: "3E67B1" },
  { name: "Redis", slug: "redis", colorLight: "FF4438" },
  { name: "Docker", slug: "docker", colorLight: "2496ED" },
  { name: "Python", slug: "python", colorLight: "3776AB" },
  { name: "MongoDB", slug: "mongodb", colorLight: "47A248" },
  { name: "PostgreSQL", slug: "postgresql", colorLight: "4169E1" },
  { name: "React", slug: "react", colorLight: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", colorLight: "339933" },
  { name: "Tailwind CSS", slug: "tailwindcss", colorLight: "06B6D4" },
  { name: "OpenAI", slug: "openai", colorLight: "412991", colorDark: "ffffff" },
  { name: "LangChain", slug: "langchain", colorLight: "1C3C3C", colorDark: "ffffff" },
  { name: "Anchor", slug: "anchor", colorLight: "5534FF" },
  { name: "WebSockets", slug: "socketdotio", colorLight: "010101", colorDark: "ffffff" },
  { name: "NextAuth", slug: "auth0", colorLight: "EB5424" },
  { name: "ChromaDB", slug: "chromadb", colorLight: "FF6F61" },
  { name: "DeFi", slug: "defillama", colorLight: "0673E0" },
  { name: "Web3", slug: "web3dotjs", colorLight: "F16822" },
  { name: "HTTP Protocol", slug: "httpie", colorLight: "A1050A" },
  { name: "Socket Programming", slug: "socketdotio", colorLight: "010101", colorDark: "ffffff" },
  { name: "Canvas API", slug: "html5", colorLight: "E34F26" },
];

export function presetForName(name: string): TechIconPreset | undefined {
  const exact = TECH_ICON_PRESETS.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
  if (exact) return exact;
  return TECH_ICON_PRESETS.find(
    (p) => p.name.toLowerCase().replace(/\s/g, "") === name.toLowerCase().replace(/\s/g, "")
  );
}

export function urlsFromPreset(preset: TechIconPreset) {
  return buildIconUrls(preset.slug, preset.colorLight, preset.colorDark);
}
