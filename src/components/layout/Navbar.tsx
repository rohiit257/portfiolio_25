"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/lib/content";

interface NavbarProps {
  variant?: "light" | "dark";
}

// Grid icon (4 squares)
function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

// List icon (3 horizontal lines)
function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="2" width="14" height="2" rx="1" />
      <rect x="1" y="7" width="14" height="2" rx="1" />
      <rect x="1" y="12" width="14" height="2" rx="1" />
    </svg>
  );
}

export function Navbar({ variant = "light" }: NavbarProps) {
  const pathname = usePathname();
  const content = useSiteContent();
  const [scrolled, setScrolled] = useState(false);

  const isDark = variant === "dark";
  const isGridActive = pathname === "/";
  const isListActive = pathname.startsWith("/work") || pathname.startsWith("/project");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-20 py-5 lg:py-8">
      <div className="flex items-center justify-between">
        {/* Left: Name/Location */}
        <Link
          href="/"
          className={cn(
            "text-xs uppercase tracking-[0.12em] font-medium transition-opacity hover:opacity-60",
            isDark ? "text-white" : "text-black"
          )}
        >
          {content.name}
          <span className={cn(
            "block lg:inline lg:ml-2",
            isDark ? "text-gray-500" : "text-gray-400"
          )}>
            {content.location}
          </span>
        </Link>

        {/* Center: Floating Toggle Menu with Sliding Indicator */}
        <div
          className={cn(
            "fixed right-6 md:right-auto md:left-1/2 md:-translate-x-1/2 top-5 lg:top-8 lg:right-auto flex items-center rounded-full transition-all duration-300 bg-gray-900",
            scrolled
              ? "shadow-lg"
              : "shadow-md"
          )}
        >
          {/* Sliding white indicator */}
          <div
            className={cn(
              "absolute top-0 h-full w-14 bg-white rounded-full transition-all duration-300 ease-out",
              isGridActive ? "left-0" : "left-14"
            )}
          />

          {/* Grid button */}
          <Link
            href="/"
            className={cn(
              "relative z-10 flex items-center justify-center w-14 h-10 transition-colors duration-300",
              isGridActive
                ? "text-black"
                : "text-gray-400 hover:text-white"
            )}
          >
            <GridIcon />
          </Link>

          {/* List button */}
          <Link
            href="/work"
            className={cn(
              "relative z-10 flex items-center justify-center w-14 h-10 transition-colors duration-300",
              isListActive
                ? "text-black"
                : "text-gray-400 hover:text-white"
            )}
          >
            <ListIcon />
          </Link>
        </div>

        {/* Right: Social Links + Contacts (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-xs uppercase tracking-wide font-medium transition-colors inline-flex items-center gap-1",
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
              )}
            >
              LIN<span className="text-[10px]">↗</span>
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className={cn(
                "text-xs uppercase tracking-wide font-medium transition-colors inline-flex items-center gap-1",
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
              )}
            >
              EM<span className="text-[10px]">↗</span>
            </a>
          </div>
          <Link
            href="/contact"
            className={cn(
              "text-xs uppercase tracking-[0.12em] font-medium transition-opacity hover:opacity-60",
              isDark ? "text-white" : "text-black"
            )}
          >
            Contacts
          </Link>
        </div>
      </div>
    </header>
  );
}
