"use client";

import { Home, FolderGit2, Code2, Linkedin, Mail, FileText, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function FloatingDock() {
  const [activeItem, setActiveItem] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "#home" },
    { id: "projects", icon: FolderGit2, label: "Projects", href: "#projects" },
    { id: "skills", icon: Code2, label: "Skills", href: "#skills" },
  ];

  const socialLinks = [
    { icon: Trophy, href: "https://leetcode.com/rohiit257", label: "LeetCode" },
    { icon: FileText, href: "/resume.pdf", label: "Resume" },
    { icon: Linkedin, href: "https://linkedin.com/in/rohiit257", label: "LinkedIn" },
    { icon: Mail, href: "mailto:rohitdebugbugs@gmail.com", label: "Email" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-scale-in">
      <div className="flex items-center gap-2 bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 shadow-2xl dark:shadow-zinc-950/50">
        {navItems.map((item, index) => (
          <div key={item.id} className="relative group">
            <Button
              variant="ghost"
              size="icon"
              className={`h-12 w-12 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 ${
                activeItem === item.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105 -translate-y-0.5"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
              asChild
              onClick={() => setActiveItem(item.id)}
            >
              <a href={item.href} aria-label={item.label}>
                <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              </a>
            </Button>
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:-translate-y-1">
              <div className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                {item.label}
              </div>
            </div>
          </div>
        ))}

        <div className="w-px h-8 bg-border/50 mx-2" />

        {socialLinks.map((link, index) => (
          <div key={link.label} className="relative group">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:shadow-lg hover:shadow-secondary/20 hover:bg-secondary/10 hover:text-secondary hover:rotate-6"
              asChild
            >
              <a
                href={link.href}
                target={link.href.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </Button>
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:-translate-y-2">
              <div className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-secondary/20">
                {link.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
