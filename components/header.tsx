"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setIsAnimating(true);
    setTheme(theme === "dark" ? "light" : "dark");
    
    // Reset animation after completion
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl bg-card border border-border hover:bg-accent transition-all duration-300 relative overflow-hidden"
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          {/* Spread animation overlay */}
          {isAnimating && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-primary/20 rounded-xl animate-ping" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl animate-pulse" />
            </div>
          )}
          
          {/* Icon with rotation animation */}
          <div className={`transition-all duration-300 ${isAnimating ? 'rotate-180 scale-110' : ''}`}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </div>
        </Button>

        {/* Enhanced ripple spread effect */}
        {isAnimating && (
          <>
            {/* Main spread circle */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-primary/30 rounded-xl theme-spread" />
            </div>
            
            {/* Multiple ripple waves */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 border-2 border-primary/60 rounded-xl theme-ripple-1" />
            </div>
            <div className="absolute -inset-2 pointer-events-none">
              <div className="absolute inset-0 border border-primary/40 rounded-2xl theme-ripple-2" />
            </div>
            <div className="absolute -inset-4 pointer-events-none">
              <div className="absolute inset-0 border border-primary/20 rounded-3xl theme-ripple-3" />
            </div>
            
            {/* Additional glow effect */}
            <div className="absolute -inset-8 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-full animate-pulse" style={{ animationDuration: '0.6s' }} />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-sm font-medium">rohitdebugbugs</span>
      </div>
    </header>
  );
}
