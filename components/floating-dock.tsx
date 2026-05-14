"use client";

import {
  Home,
  FolderGit2,
  Briefcase,
  Trophy,
  FileText,
  Linkedin,
  Mail,
  MessageSquareText,
} from "lucide-react";
import { useLoadingState } from "@/components/loading-screen";
import { useActiveSection } from "@/hooks/use-active-section";

const NAV = [
  { id: "home", icon: Home, label: "Home", href: "#home" },
  { id: "experience", icon: Briefcase, label: "Experience", href: "#experience" },
  { id: "projects", icon: FolderGit2, label: "Projects", href: "#projects" },
  { id: "contact", icon: MessageSquareText, label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Trophy, href: "https://leetcode.com/azzyXT", label: "LeetCode" },
  { icon: FileText, href: "/resume.pdf", label: "Resume" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rohit-shahi-152661253/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:rohitshahi581@gmail.com", label: "Email" },
];

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "projects",
  "contact",
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
    <div className="group/item relative flex flex-col items-center">
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover/item:-translate-y-1 group-hover/item:opacity-100">
        <div className="whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-[10px] font-medium text-background shadow-lg">
          {label}
        </div>
        <div className="-mt-1 mx-auto h-1.5 w-1.5 rotate-45 bg-foreground" />
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
          group-hover/item:-translate-y-1 group-hover/item:scale-110
          active:scale-95
          ${
            variant === "nav"
              ? active
                ? "h-9 w-9 bg-foreground text-background shadow-md sm:h-10 sm:w-10"
                : "h-9 w-9 text-muted-foreground hover:bg-secondary/60 hover:text-foreground sm:h-10 sm:w-10"
              : "h-[30px] w-[30px] text-muted-foreground hover:bg-secondary/60 hover:text-foreground sm:h-[34px] sm:w-[34px]"
          }
        `}
      >
        <Icon className={variant === "nav" ? "h-[15px] w-[15px]" : "h-[13px] w-[13px]"} />
      </a>

      {variant === "nav" && active && (
        <div className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-foreground" />
      )}
    </div>
  );
}

export function FloatingDock() {
  const { isLoading } = useLoadingState();
  const activeSection = useActiveSection(SECTION_IDS);
  const active = activeSection === "about" ? "home" : activeSection;

  return (
    <div
      className={`
        fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 sm:bottom-7
        ${
          isLoading
            ? "pointer-events-none translate-y-4 opacity-0"
            : "translate-y-0 opacity-100"
        }
      `}
    >
      <div
        className="
          flex max-w-[calc(100vw-1rem)] items-center gap-0.5 border border-border/60
          rounded-[1.15rem] bg-card/90 px-1.5 py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]
          backdrop-blur-xl sm:gap-1 sm:rounded-2xl sm:px-2.5 sm:py-2
        "
      >
        <div className="flex items-center gap-0.5 sm:gap-1">
          {NAV.map((item) => (
            <DockItem key={item.id} {...item} active={active === item.id} variant="nav" />
          ))}
        </div>

        <div className="hidden h-6 w-px shrink-0 bg-border/60 sm:mx-2 sm:block" />

        <div className="hidden items-center gap-0.5 sm:flex sm:gap-1">
          {SOCIALS.map((item) => (
            <DockItem key={item.label} {...item} variant="social" />
          ))}
        </div>
      </div>
    </div>
  );
}
