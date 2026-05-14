"use client";

import { useState, useRef } from "react";
import { Home, FolderGit2, Briefcase, Code2, Trophy, FileText, Linkedin, Mail } from "lucide-react";
import { useLoadingState } from "@/components/loading-screen";

const NAV = [
  { id: "home",       icon: Home,       label: "Home",       href: "#home" },
  { id: "experience", icon: Briefcase,  label: "Experience", href: "#experience" },
  { id: "projects",   icon: FolderGit2, label: "Projects",   href: "#projects" },
  { id: "skills",     icon: Code2,      label: "Skills",     href: "#skills" },
];

const SOCIALS = [
  { icon: Trophy,   href: "https://leetcode.com/azzyXT",                              label: "LeetCode" },
  { icon: FileText, href: "/resume.pdf",                                               label: "Resume"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rohit-shahi-152661253/",       label: "LinkedIn" },
  { icon: Mail,     href: "mailto:rohitshahi581@gmail.com",                           label: "Email"    },
];

interface DockItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
  variant?: "nav" | "social";
}

function DockItem({ icon: Icon, label, href, active, onClick, variant = "nav" }: DockItemProps) {
  return (
    <div className="relative group/item flex flex-col items-center">
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all duration-200 group-hover/item:-translate-y-1">
        <div className="bg-foreground text-background text-[10px] font-medium px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
          {label}
        </div>
        <div className="w-1.5 h-1.5 bg-foreground rotate-45 mx-auto -mt-1" />
      </div>

      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        aria-label={label}
        onClick={onClick}
        className={`
          flex items-center justify-center rounded-xl
          transition-all duration-200
          group-hover/item:scale-110 group-hover/item:-translate-y-1
          active:scale-95
          ${variant === "nav"
            ? active
              ? "h-10 w-10 sm:h-11 sm:w-11 bg-foreground text-background shadow-md"
              : "h-10 w-10 sm:h-11 sm:w-11 text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            : "h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }
        `}
      >
        <Icon className={variant === "nav" ? "h-4 w-4" : "h-3.5 w-3.5"} />
      </a>

      {/* Active dot */}
      {variant === "nav" && active && (
        <div className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-foreground" />
      )}
    </div>
  );
}

export function FloatingDock() {
  const [active, setActive] = useState("home");
  const { isLoading } = useLoadingState();

  return (
    <div
      className={`
        fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-50
        transition-all duration-500
        ${isLoading
          ? "opacity-0 pointer-events-none translate-y-4"
          : "opacity-100 translate-y-0"
        }
      `}
    >
      <div className="
        flex items-center gap-0.5 sm:gap-1
        bg-card/90 backdrop-blur-xl
        border border-border/60
        rounded-2xl
        px-2 py-2 sm:px-3 sm:py-2.5
        shadow-xl shadow-black/10
        dark:shadow-black/40
      ">
        {/* Nav items */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {NAV.map((item) => (
            <DockItem
              key={item.id}
              {...item}
              active={active === item.id}
              onClick={() => setActive(item.id)}
              variant="nav"
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border/60 mx-1.5 sm:mx-2 shrink-0" />

        {/* Social icons */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {SOCIALS.map((item) => (
            <DockItem key={item.label} {...item} variant="social" />
          ))}
        </div>
      </div>
    </div>
  );
}
