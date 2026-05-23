"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLoadingState } from "@/components/loading-screen";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTION_LABELS: Record<string, string> = {
  home: "//hero",
  about: "//about",
  stack: "//stack",
  experience: "//experience",
  projects: "//projects",
  network: "//network",
  contact: "//contact",
};

const SECTION_IDS = [
  "home",
  "about",
  "stack",
  "experience",
  "projects",
  "network",
  "contact",
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const { isLoading } = useLoadingState();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setSpinning(true);
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => setSpinning(false), 500);
  };

  if (!mounted) return null;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-all duration-500 sm:px-6 ${
        isLoading ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px]">
          {SECTION_LABELS[activeSection] ?? "//hero"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 backdrop-blur-xl sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            available for work
          </span>
        </div>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-card/70 text-muted-foreground backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:border-foreground/15 hover:text-foreground active:scale-95 ${
            spinning ? "rotate-180" : ""
          }`}
          style={{
            transition:
              "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, border-color 0.2s, color 0.2s",
          }}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
