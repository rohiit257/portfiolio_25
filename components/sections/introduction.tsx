"use client";

import { useState, useEffect } from "react";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";

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
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 28);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [typing, charIndex, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-[88vh] flex flex-col items-start justify-center pt-28 pb-8"
    >
      <div className="max-w-3xl w-full space-y-10">
        {/* Location pill */}
        <div
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-border/50 rounded-full px-3 py-1 bg-card/60 backdrop-blur-sm animate-fade-in"
          style={{ animationDelay: "0.05s" }}
        >
          <MapPin className="h-3 w-3 text-emerald-500" />
          India · Open to remote
        </div>

        {/* Name + role */}
        <div className="space-y-3">
          <p
            className="text-sm font-medium text-muted-foreground tracking-widest uppercase animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Hello, I&apos;m
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-in"
            style={{ animationDelay: "0.18s" }}
          >
            Rohit Shahi
          </h1>

          {/* Typewriter */}
          <div
            className="h-9 flex items-center animate-fade-in"
            style={{ animationDelay: "0.28s" }}
          >
            <span className="text-xl sm:text-2xl font-light text-muted-foreground">
              {displayed}
              <span className="inline-block w-0.5 h-5 bg-foreground/70 ml-0.5 animate-pulse align-middle" />
            </span>
          </div>
        </div>

        {/* Bio */}
        <div
          className="space-y-4 max-w-xl animate-fade-in"
          style={{ animationDelay: "0.38s" }}
        >
          <p className="text-base text-muted-foreground leading-relaxed">
            Final year{" "}
            <span className="text-foreground font-medium">
              Computer Engineering
            </span>{" "}
            student working across full-stack, Blockchain, and Agentic AI.
            Currently part of{" "}
            <span className="text-foreground font-medium">School of Solana</span>.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Into gaming, music, and thinking way too much about systems.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-3 animate-fade-in"
          style={{ animationDelay: "0.48s" }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-foreground/10 active:scale-[0.98]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            View my work
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-card transition-all duration-200 active:scale-[0.98]"
          >
            Experience
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="flex items-center gap-2 animate-fade-in pt-4"
          style={{ animationDelay: "0.6s" }}
        >
          <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/40 animate-bounce" />
          <span className="text-xs text-muted-foreground/40 tracking-wide">
            scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
