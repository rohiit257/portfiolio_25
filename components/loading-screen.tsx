"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const LoadingContext = createContext<{ isLoading: boolean }>({
  isLoading: true,
});

export function useLoadingState() {
  return useContext(LoadingContext);
}

export function LoadingScreen({ children }: { children?: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsLoading(false);
      return;
    }

    const fadeTimer = window.setTimeout(() => {
      setIsFading(true);
    }, 420);

    const hideTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {isLoading && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-background px-4 transition-opacity duration-500 ${
            isFading ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 shadow-[0_30px_120px_rgba(15,23,42,0.16)] backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-border/70 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                booting portfolio.session
              </span>
            </div>

            <div className="space-y-8 px-5 py-8 sm:px-8 sm:py-10">
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-muted-foreground">
                  {"//initializing workspace"}
                </p>
                <div className="space-y-2">
                  <h1 className="text-3xl font-medium tracking-[-0.05em] text-foreground sm:text-4xl">
                    Rohit Shahi
                  </h1>
                  <p className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    minimalist desktop interface
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Loading UI shell</span>
                  <span>OK</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Mounting sections</span>
                  <span>OK</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Starting assistant</span>
                  <span>OK</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary/80">
                  <div className="h-full rounded-full bg-foreground animate-loading-bar" />
                </div>
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span>status</span>
                  <span>readying interface...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
