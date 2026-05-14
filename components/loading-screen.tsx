"use client";

import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

// Context to share loading state across components
export const LoadingContext = createContext<{ isLoading: boolean }>({ isLoading: true });

export function useLoadingState() {
  return useContext(LoadingContext);
}

export function LoadingScreen({ children }: { children?: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {isLoading && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
            isFading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Logo/Name */}
            <div className="text-2xl sm:text-3xl font-bold tracking-tight">
              <span className="animate-pulse">rohitdebugbugs</span>
            </div>

            {/* Loading dots */}
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>

            {/* Progress Bar */}
            <div className="w-48 h-px bg-border overflow-hidden">
              <div className="h-full bg-foreground rounded-full animate-loading-bar" />
            </div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
