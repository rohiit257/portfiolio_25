"use client";

import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Versus Dilemma Platform",
    description: "Full stack realtime scalable platform to clear your dilemmas while other users vote on that.",
    tech: ["Next.js", "Express", "Neon", "Prisma", "Zod", "Redis", "Websockets", "Docker"],
    year: "2025",
    links: {
      github: "https://github.com/rohiit257/versus",
      demo: "https://versus-chat.vercel.app"
    }
  },
  {
    title: "MetaBazar",
    description: "Decentralised NFT marketplace built on Ethereum blockchain.",
    tech: ["Next.js", "Solidity", "Ethereum"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/metabazar",
      demo: "https://metabazaar.vercel.app"
    }
  },
  {
    title: "LandLedger",
    description: "Land registry system decentralised on Ethereum blockchain.",
    tech: ["Next.js", "Solidity", "Ethereum"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/Landstate"
    }
  },
  {
    title: "HTTP Server",
    description: "Custom HTTP server implementation built from scratch using C programming language.",
    tech: ["C", "Socket Programming", "HTTP Protocol"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/http-server-c"
    }
  },
  {
    title: "RAG Chatbot",
    description: "Retrieval-Augmented Generation chatbot that consumes PDFs and provides intelligent responses.",
    tech: ["Python", "ChromaDB", "LangChain", "OpenAI"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/rag-chatbot"
    }
  },
  {
    title: "AMA App",
    description: "Ask Me Anything platform with user authentication and real-time question management.",
    tech: ["Next.js", "MongoDB", "NextAuth", "Tailwind CSS"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/ama-app"
    }
  },
  {
    title: "Draw - Real-time Collaboration",
    description: "Real-time collaborative platform for creating and editing diagrams with multiple users.",
    tech: ["Next.js", "Express", "WebSockets", "Canvas API"],
    year: "2024",
    links: {
      github: "https://github.com/rohiit257/draw-collaboration"
    }
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-muted-foreground text-sm">Recent work and experiments</p>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group border-b border-border/40 pb-6 last:border-b-0 hover:border-primary/30 transition-all duration-200 hover:bg-primary/5 rounded-lg hover:px-3 hover:py-2"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-medium group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground group-hover:text-primary/60 transition-colors duration-200">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs bg-secondary/30 text-secondary-foreground rounded border border-border/40 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 text-muted-foreground">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors duration-200 p-1 rounded hover:bg-primary/10"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors duration-200 p-1 rounded hover:bg-primary/10"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
