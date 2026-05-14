"use client";

import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "Versus Dilemma Platform",
    description:
      "Full stack realtime scalable platform to clear your dilemmas while other users vote on that.",
    tech: ["Next.js", "Express", "Neon", "Prisma", "Zod", "Redis", "WebSockets", "Docker"],
    year: "2025",
    featured: true,
    links: {
      github: "https://github.com/rohiit257/versus",
      demo: "https://versus-chat.vercel.app",
    },
  },
  {
    title: "MetaBazar",
    description: "Decentralised NFT marketplace built on Ethereum blockchain.",
    tech: ["Next.js", "Solidity", "Ethereum"],
    year: "2024",
    featured: true,
    links: {
      github: "https://github.com/rohiit257/metabazar",
      demo: "https://metabazaar.vercel.app",
    },
  },
  {
    title: "LandLedger",
    description: "Land registry system decentralised on Ethereum blockchain.",
    tech: ["Next.js", "Solidity", "Ethereum"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/Landstate",
    },
  },
  {
    title: "HTTP Server",
    description:
      "Custom HTTP server implementation built from scratch using C programming language.",
    tech: ["C", "Socket Programming", "HTTP Protocol"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/http-server-c",
    },
  },
  {
    title: "RAG Chatbot",
    description:
      "Retrieval-Augmented Generation chatbot that consumes PDFs and provides intelligent responses.",
    tech: ["Python", "ChromaDB", "LangChain", "OpenAI"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/rag-chatbot",
    },
  },
  {
    title: "AMA App",
    description:
      "Ask Me Anything platform with user authentication and real-time question management.",
    tech: ["Next.js", "MongoDB", "NextAuth", "Tailwind CSS"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/ama-app",
    },
  },
  {
    title: "Draw — Real-time Collaboration",
    description:
      "Real-time collaborative platform for creating and editing diagrams with multiple users.",
    tech: ["Next.js", "Express", "WebSockets", "Canvas API"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/draw-collaboration",
    },
  },
];

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-muted-foreground text-sm">Things I&apos;ve built</p>
        </div>

        {/* Featured projects — slightly elevated */}
        <div className="space-y-3">
          {projects.filter((p) => p.featured).map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative rounded-xl border border-border/50 bg-card/40 p-5 transition-all duration-300 ${
                hoveredIndex === index
                  ? "border-foreground/20 bg-card shadow-md"
                  : "hover:border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm leading-none group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono text-muted-foreground/60 border border-border/40 rounded px-1 py-0.5">
                      {project.year}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] text-emerald-500/80 border border-emerald-500/20 bg-emerald-500/5 rounded px-1.5 py-0.5">
                        featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-200">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[11px] bg-secondary/30 text-muted-foreground rounded border border-border/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2 text-muted-foreground shrink-0">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="p-1.5 rounded-lg hover:bg-secondary/50 hover:text-foreground transition-all duration-200"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live demo"
                      className="p-1.5 rounded-lg hover:bg-secondary/50 hover:text-foreground transition-all duration-200"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/30" />

        {/* Other projects — table/list style */}
        <div className="space-y-1">
          {projects.filter((p) => !p.featured).map((project, index) => (
            <div
              key={index}
              className="group flex items-center justify-between gap-4 py-3 px-2 rounded-lg hover:bg-secondary/20 transition-all duration-200 cursor-default"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs text-muted-foreground/50 w-8 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </span>
                  <span className="hidden sm:inline text-muted-foreground/40 mx-2">—</span>
                  <span className="hidden sm:inline text-xs text-muted-foreground">
                    {project.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden md:flex flex-wrap gap-1">
                  {project.tech.slice(0, 2).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-muted-foreground/60 border border-border/30 rounded px-1.5 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs text-muted-foreground/40">{project.year}</span>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
