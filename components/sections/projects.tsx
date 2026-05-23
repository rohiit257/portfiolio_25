"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import type { PublicProject } from "@/lib/portfolio-public";

type Props = {
  projects: PublicProject[];
};

export function Projects({ projects }: Props) {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="border-t border-border/70 py-8 sm:py-9">
      <h2 className="sr-only">Featured full stack, blockchain, and AI projects</h2>
      <div className="grid gap-7 lg:grid-cols-[140px_minmax(0,1fr)]">
        <Reveal className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {"//projects"}
          </p>
          <p className="max-w-[13rem] text-sm leading-6 text-muted-foreground">
            Selected builds across full-stack, web3, and systems work.
          </p>
        </Reveal>

        <div className="space-y-7">
          <RevealGroup className="grid gap-4 xl:grid-cols-2">
            {featuredProjects.map((project) => (
              <RevealItem key={project.title}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex h-full flex-col rounded-[1.35rem] border border-border/70 bg-background/45 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-[1.125rem]"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-border/70 bg-card/80 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          featured
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium tracking-[-0.04em] text-foreground sm:text-[1.6rem]">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/75 text-muted-foreground transition-all duration-200 hover:border-foreground/15 hover:text-foreground"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/75 text-muted-foreground transition-all duration-200 hover:border-foreground/15 hover:text-foreground"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mb-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-6">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="rounded-[1.35rem] border border-border/70 bg-background/45 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-[1.125rem]">
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-border/70 pb-4">
              <div>
                <h3 className="text-lg font-medium tracking-[-0.03em] text-foreground">
                  More builds
                </h3>
                <p className="text-[13px] text-muted-foreground">
                  Smaller experiments and supporting systems projects.
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {otherProjects.length} entries
              </span>
            </div>

            <RevealGroup className="space-y-2">
              {otherProjects.map((project, index) => (
                <RevealItem key={project.title}>
                  <motion.article
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="grid gap-3 rounded-[1.1rem] border border-transparent px-3 py-3.5 transition-colors duration-200 hover:border-border/70 hover:bg-card/65 sm:grid-cols-[48px_minmax(0,1fr)_110px_auto]"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-[15px] font-medium text-foreground">
                        {project.title}
                      </h4>
                      <p className="text-[13px] leading-6 text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      {project.tech.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {project.year}
                      </span>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.article>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
