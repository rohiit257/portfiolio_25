"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import type { PublicExperience } from "@/lib/portfolio-public";

type Props = {
  experiences: PublicExperience[];
};

export function Experience({ experiences }: Props) {
  return (
    <section id="experience" className="border-t border-border/70 py-7 sm:py-9">
      <h2 className="sr-only">Professional experience and Solana training</h2>
      <div className="grid gap-6 lg:grid-cols-[140px_minmax(0,1fr)]">
        <Reveal className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {"//experience"}
          </p>
          <p className="max-w-[12rem] text-sm leading-6 text-muted-foreground">
            Where I have worked, learned, and shipped.
          </p>
        </Reveal>

        <RevealGroup className="grid gap-3">
          {experiences.map((experience) => (
            <RevealItem key={`${experience.company}-${experience.period}`}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="rounded-[1.15rem] border border-border/70 bg-background/45 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)] sm:p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-medium text-foreground sm:text-lg">
                        {experience.company}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {`//${experience.title}`}
                      </span>
                    </div>

                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      Visit company
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2 md:max-w-[15rem] md:justify-end">
                    <span className="rounded-full border border-border/70 bg-card/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {experience.period}
                    </span>
                    <span className="rounded-full border border-border/60 bg-background/65 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/85">
                      {experience.type}
                    </span>
                  </div>
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                  {experience.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/70 bg-card/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
