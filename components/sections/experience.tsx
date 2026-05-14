"use client";

import { ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "PirateCrewFun",
    companyUrl: "https://piratecrewfun.com",
    period: "2024 — Present",
    type: "Full-time · Remote",
    description:
      "Building full-stack web applications with Next.js and TypeScript. Integrating Solana smart contracts and Meteora DeFi protocols. Shipped features improving performance and UX across DeFi products.",
    tags: ["Next.js", "TypeScript", "Solana", "DeFi"],
  },
  {
    title: "Cohort Participant",
    company: "Solana Turbine",
    companyUrl: "https://turbine.so",
    period: "2023 — 2024",
    type: "Program · Online",
    description:
      "Completed builders and advanced SVM cohorts. Deep dive into Solana blockchain architecture, building and deploying multiple on-chain programs.",
    tags: ["Rust", "Solana", "Anchor", "Web3"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <p className="text-muted-foreground text-sm">Where I&apos;ve worked and learned</p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border/60" />

          <div className="space-y-10 pl-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-8 top-1.5 w-2 h-2 rounded-full border-2 border-foreground/40 bg-background group-hover:border-foreground group-hover:bg-foreground transition-all duration-300" />

                <div className="space-y-2">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                        <span className="text-muted-foreground/40 text-xs">·</span>
                        <span className="text-xs text-muted-foreground/70">{exp.type}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 pt-0.5 font-mono">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-200">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs bg-secondary/40 text-muted-foreground rounded border border-border/40 group-hover:bg-secondary/60 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
