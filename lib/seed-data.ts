import { presetForName, urlsFromPreset } from "@/lib/tech-icons";

export const SEED_FEATURED_STACK_NAMES = [
  "Next.js",
  "Express.js",
  "TypeScript",
  "C++",
  "Rust",
  "Solana",
  "Ethereum",
  "Solidity",
];

export const SEED_EXPERIENCES = [
  {
    title: "Software Engineer",
    company: "PirateCrewFun",
    companyUrl: "https://piratecrewfun.com",
    period: "2024 - Present",
    type: "Full-time / Remote",
    description:
      "Building full-stack web applications with Next.js and TypeScript. Integrating Solana smart contracts and Meteora DeFi protocols. Shipped features improving performance and UX across DeFi products.",
    tags: ["Next.js", "TypeScript", "Solana", "DeFi"],
    sortOrder: 0,
  },
  {
    title: "Cohort Participant",
    company: "Solana Turbine",
    companyUrl: "https://turbine.so",
    period: "2023 - 2024",
    type: "Program / Online",
    description:
      "Completed builders and advanced SVM cohorts. Deep dive into Solana blockchain architecture, building and deploying multiple on-chain programs.",
    tags: ["Rust", "Solana", "Anchor", "Web3"],
    sortOrder: 1,
  },
];

export const SEED_PROJECTS = [
  {
    title: "Versus Dilemma Platform",
    description:
      "Full stack realtime scalable platform to clear your dilemmas while other users vote on that.",
    tech: ["Next.js", "Express", "Neon", "Prisma", "Zod", "Redis", "WebSockets", "Docker"],
    year: "2025",
    featured: true,
    githubUrl: "https://github.com/rohiit257/versus",
    demoUrl: "https://versus-chat.vercel.app",
    sortOrder: 0,
  },
  {
    title: "MetaBazar",
    description: "Decentralised NFT marketplace built on Ethereum blockchain.",
    tech: ["Next.js", "Solidity", "Ethereum"],
    year: "2024",
    featured: true,
    githubUrl: "https://github.com/rohiit257/metabazar",
    demoUrl: "https://metabazaar.vercel.app",
    sortOrder: 1,
  },
  {
    title: "LandLedger",
    description: "Land registry system decentralised on Ethereum blockchain.",
    tech: ["Next.js", "Solidity", "Ethereum"],
    year: "2024",
    featured: false,
    githubUrl: "https://github.com/rohiit257/Landstate",
    demoUrl: null as string | null,
    sortOrder: 2,
  },
  {
    title: "HTTP Server",
    description:
      "Custom HTTP server implementation built from scratch using C programming language.",
    tech: ["C", "Socket Programming", "HTTP Protocol"],
    year: "2024",
    featured: false,
    githubUrl: "https://github.com/rohiit257/http-server-c",
    demoUrl: null,
    sortOrder: 3,
  },
  {
    title: "RAG Chatbot",
    description:
      "Retrieval-Augmented Generation chatbot that consumes PDFs and provides intelligent responses.",
    tech: ["Python", "ChromaDB", "LangChain", "OpenAI"],
    year: "2024",
    featured: false,
    githubUrl: "https://github.com/rohiit257/rag-chatbot",
    demoUrl: null,
    sortOrder: 4,
  },
  {
    title: "AMA App",
    description:
      "Ask Me Anything platform with user authentication and real-time question management.",
    tech: ["Next.js", "MongoDB", "NextAuth", "Tailwind CSS"],
    year: "2024",
    featured: false,
    githubUrl: "https://github.com/rohiit257/ama-app",
    demoUrl: null,
    sortOrder: 5,
  },
  {
    title: "Draw - Real-time Collaboration",
    description:
      "Real-time collaborative platform for creating and editing diagrams with multiple users.",
    tech: ["Next.js", "Express", "WebSockets", "Canvas API"],
    year: "2024",
    featured: false,
    githubUrl: "https://github.com/rohiit257/draw-collaboration",
    demoUrl: null,
    sortOrder: 6,
  },
];

/** All unique tag names from seed projects + experiences + featured stack */
export function collectAllTechNames(): string[] {
  const names = new Set<string>();
  for (const n of SEED_FEATURED_STACK_NAMES) names.add(n);
  for (const e of SEED_EXPERIENCES) for (const t of e.tags) names.add(t);
  for (const p of SEED_PROJECTS) for (const t of p.tech) names.add(t);
  return Array.from(names);
}

export function seedPresetForName(name: string) {
  const preset = presetForName(name);
  if (preset) return { ...preset, ...urlsFromPreset(preset) };
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return {
    name,
    slug: slug || "code",
    colorLight: "64748b",
    colorDark: "ffffff",
    ...urlsFromPreset({
      name,
      slug: slug || "code",
      colorLight: "64748b",
      colorDark: "ffffff",
    }),
  };
}
