"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const technologies = [
  {
    name: "Next.js",
    iconLight: "https://cdn.simpleicons.org/nextdotjs/000000",
    iconDark: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  },
  {
    name: "Express.js",
    iconLight: "https://cdn.simpleicons.org/express/000000",
    iconDark: "https://cdn.simpleicons.org/express/ffffff",
  },
  {
    name: "TypeScript",
    iconLight: "https://cdn.simpleicons.org/typescript/3178C6",
    iconDark: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "C++",
    iconLight: "https://cdn.simpleicons.org/cplusplus/00599C",
    iconDark: "https://cdn.simpleicons.org/cplusplus/00599C",
  },
  {
    name: "Rust",
    iconLight: "https://cdn.simpleicons.org/rust/CE422B",
    iconDark: "https://cdn.simpleicons.org/rust/CE422B",
  },
  {
    name: "Solana",
    iconLight: "https://cdn.simpleicons.org/solana/14F195",
    iconDark: "https://cdn.simpleicons.org/solana/14F195",
  },
  {
    name: "Ethereum",
    iconLight: "https://cdn.simpleicons.org/ethereum/3C3C3D",
    iconDark: "https://cdn.simpleicons.org/ethereum/ffffff",
  },
  {
    name: "Solidity",
    iconLight: "https://cdn.simpleicons.org/solidity/363636",
    iconDark: "https://cdn.simpleicons.org/solidity/ffffff",
  },
];

export function TechStack() {
  return (
    <section className="border-t border-border/70 py-8 sm:py-9">
      <div className="grid gap-6 lg:grid-cols-[140px_minmax(0,1fr)]">
        <Reveal className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {"//stack"}
          </p>
          <p className="max-w-[12rem] text-sm leading-6 text-muted-foreground">
            Tools I use most for product, backend, and chain work.
          </p>
        </Reveal>

        <div className="space-y-5">
          <Reveal className="max-w-2xl">
            <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">
              Daily tools for shipping full-stack products, blockchain work, and
              performance-minded interfaces.
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8">
            {technologies.map((tech) => (
              <RevealItem key={tech.name}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group flex flex-col items-center gap-3 rounded-[1.25rem] border border-border/70 bg-background/50 px-4 py-4 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] border border-border/60 bg-card/80 p-3.5">
                    <div className="relative h-8 w-8">
                      <Image
                        src={tech.iconLight}
                        alt={tech.name}
                        width={32}
                        height={32}
                        className="h-full w-full object-contain dark:hidden"
                      />
                      <Image
                        src={tech.iconDark}
                        alt={tech.name}
                        width={32}
                        height={32}
                        className="hidden h-full w-full object-contain dark:block"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-sm font-medium text-foreground">
                      {tech.name}
                    </span>
                  
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
