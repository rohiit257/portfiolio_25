"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const skills = [
  {
    name: "Solana",
    icon: "sol",
    level: 90,
    description: "Smart contracts, DeFi protocols",
  },
  {
    name: "Rust",
    icon: "rs",
    level: 85,
    description: "Systems programming, blockchain",
  },
  {
    name: "Anchor",
    icon: "an",
    level: 88,
    description: "Solana framework development",
  },
  {
    name: "Next.js",
    icon: "nx",
    level: 92,
    description: "Full-stack React framework",
  },
  {
    name: "TypeScript",
    icon: "ts",
    level: 90,
    description: "Type-safe JavaScript",
  },
  {
    name: "React",
    icon: "rc",
    level: 95,
    description: "UI library and component design",
  },
  {
    name: "Node.js",
    icon: "nd",
    level: 87,
    description: "Backend and API development",
  },
  {
    name: "PostgreSQL",
    icon: "pg",
    level: 82,
    description: "Database design and optimization",
  },
];

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string>(skills[0].name);
  const activeSkill =
    skills.find((skill) => skill.name === hoveredSkill) ?? skills[0];

  return (
    <section id="skills" className="border-t border-border/70 py-8 sm:py-10">
      <div className="grid gap-7 lg:grid-cols-[150px_minmax(0,1fr)]">
        <Reveal className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {"//skills"}
          </p>
          <p className="max-w-[13rem] text-sm leading-6 text-muted-foreground">
            The stack I reach for most often when building.
          </p>
        </Reveal>

        <div className="space-y-6">
          <Reveal className="grid gap-4 rounded-[1.45rem] border border-border/70 bg-background/45 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center sm:p-5">
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                active skill
              </p>
              <div className="flex flex-wrap items-end gap-3">
                <h3 className="text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-[1.85rem]">
                  {activeSkill.name}
                </h3>
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {activeSkill.level}% proficiency
                </span>
              </div>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {activeSkill.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-2 overflow-hidden rounded-full bg-secondary/70">
                <motion.div
                  key={activeSkill.name}
                  initial={{ width: 0 }}
                  animate={{ width: `${activeSkill.level}%` }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-foreground"
                />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Hover any card to inspect the stack.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill) => (
              <RevealItem key={skill.name}>
                <motion.button
                  type="button"
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onFocus={() => setHoveredSkill(skill.name)}
                  className="flex w-full flex-col gap-3.5 rounded-[1.35rem] border border-border/70 bg-background/45 p-4 text-left shadow-[0_14px_36px_rgba(15,23,42,0.05)] transition-colors duration-200 hover:border-foreground/15"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-card/80 font-mono text-sm uppercase tracking-[0.18em] text-foreground">
                      {skill.icon}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium tracking-[-0.03em] text-foreground">
                      {skill.name}
                    </h4>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                </motion.button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
