"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reveal } from "@/components/reveal";

const ROLES = [
  "Full Stack Developer",
  "Blockchain Engineer",
  "Solana Builder",
  "AI Workflow Dev",
];

export function Introduction() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (typing) {
      if (charIndex < current.length) {
        const timeoutId = window.setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((currentIndex) => currentIndex + 1);
        }, 55);

        return () => window.clearTimeout(timeoutId);
      }

      const timeoutId = window.setTimeout(() => setTyping(false), 1800);
      return () => window.clearTimeout(timeoutId);
    }

    if (charIndex > 0) {
      const timeoutId = window.setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((currentIndex) => currentIndex - 1);
      }, 28);

      return () => window.clearTimeout(timeoutId);
    }

    setRoleIndex((currentIndex) => (currentIndex + 1) % ROLES.length);
    setTyping(true);
  }, [typing, charIndex, roleIndex]);

  return (
    <section id="home" className="space-y-8 pb-5 pt-3 sm:space-y-10 sm:pb-8">
      <div className="grid gap-7 lg:grid-cols-[116px_minmax(0,1fr)] lg:items-center">
        <Reveal className="flex lg:justify-start">
          <div className="relative">
            <Avatar className="h-[4.5rem] w-[4.5rem] rounded-[1.2rem] border border-border/70 bg-background/75 shadow-[0_18px_40px_rgba(15,23,42,0.10)] sm:h-[5.25rem] sm:w-[5.25rem] lg:h-24 lg:w-24">
              <Image
                src="/avat.jpg"
                alt="Rohit Shahi portrait"
                fill
                priority
                sizes="(min-width: 1024px) 96px, (min-width: 640px) 84px, 72px"
                className="object-cover"
              />
              <AvatarFallback className="rounded-[1.2rem] bg-gradient-to-br from-background via-secondary/70 to-accent/60 font-mono text-lg font-semibold text-foreground sm:text-xl lg:text-[1.7rem]">
                RS
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-2 -right-2 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              live
            </span>
          </div>
        </Reveal>

        <div className="space-y-7">
          <Reveal className="space-y-4" delay={0.05}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground shadow-sm">
              <MapPin className="h-3 w-3" />
              India / open to remote
            </div>

            <div className="space-y-2.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                {/* {"//hero"} */}
              </p>
              <h1 className="max-w-4xl text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.06em] text-foreground sm:text-[3.15rem] lg:text-[4.15rem] xl:text-[4.5rem]">
                Rohit Shahi
              </h1>
              <div className="flex min-h-[2.1rem] items-center">
                <span className="font-mono text-sm text-muted-foreground sm:text-lg lg:text-[1.15rem]">
                  {`//${displayed}`}
                  <span className="ml-1 inline-block h-4 w-px animate-pulse bg-foreground/70 align-middle sm:h-[1.15rem]" />
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="max-w-2xl space-y-3" delay={0.12}>
            <p className="text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              Final year{" "}
              <span className="font-medium text-foreground">Computer Engineering</span>{" "}
              student working across full-stack, blockchain, and agentic AI.
              Currently part of{" "}
              <span className="font-medium text-foreground">School of Solana</span>.
            </p>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground/80 sm:text-[15px] sm:leading-6">
              Into gaming, music, and thinking way too much about systems.
            </p>
          </Reveal>

          <Reveal className="flex flex-wrap items-center gap-3" delay={0.18}>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-[1.125rem] py-2.5 text-sm font-medium text-background shadow-[0_16px_30px_rgba(15,23,42,0.18)]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              View my work
            </motion.a>
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/55 px-[1.125rem] py-2.5 text-sm font-medium text-muted-foreground"
            >
              Experience
            </motion.a>
          </Reveal>

          <Reveal delay={0.24}>
            <a
              href="#about"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <ArrowDown className="h-3.5 w-3.5" />
              scroll to explore
            </a>
          </Reveal>
        </div>
      </div>

      <Reveal className="border-t border-border/70 pt-7 sm:pt-8" delay={0.1}>
        <div id="about" className="grid gap-5 lg:grid-cols-[140px_minmax(0,1fr)]">
          <h2 className="sr-only">About Rohit Shahi</h2>
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {"//about"}
          </div>
          <div className="max-w-3xl space-y-4">
            <p className="text-balance text-[15px] leading-7 text-foreground sm:text-[1.05rem] sm:leading-8">
              Currently in my final year of computer engineering, working across
              full-stack systems, blockchain, and agentic AI workflows.
            </p>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              In my free time, I enjoy gaming, music, programming, and thinking
              a lot about how systems should feel as much as how they work.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
