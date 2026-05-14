"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLoadingState } from "@/components/loading-screen";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const { isLoading } = useLoadingState();

  useEffect(() => { setMounted(true); }, []);

  const toggle = () => {
    setSpinning(true);
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => setSpinning(false), 500);
  };

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 transition-all duration-500 ${
        isLoading ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Logo / name */}
      <a
        href="#home"
        className="text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity duration-200 select-none"
      >
        rds<span className="text-muted-foreground font-normal">.dev</span>
      </a>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Live badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-card/80 border border-border/60 rounded-full backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-xs text-muted-foreground font-medium">rohitdebugbugs</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className={`relative h-9 w-9 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border hover:bg-card transition-all duration-200 hover:scale-105 active:scale-95 overflow-hidden ${spinning ? "rotate-180" : ""}`}
          style={{ transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, border-color 0.2s, color 0.2s" }}
        >
          {theme === "dark"
            ? <Sun className="h-4 w-4" />
            : <Moon className="h-4 w-4" />
          }
        </button>
      </div>
    </header>
  );
}
