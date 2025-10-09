"use client";

import { useState } from "react";

const skills = [
  {
    name: "Solana",
    icon: "🟣",
    level: 90,
    description: "Smart contracts, DeFi protocols",
  },
  {
    name: "Rust",
    icon: "🦀",
    level: 85,
    description: "Systems programming, blockchain",
  },
  {
    name: "Anchor",
    icon: "⚓",
    level: 88,
    description: "Solana framework development",
  },
  {
    name: "Next.js",
    icon: "▲",
    level: 92,
    description: "Full-stack React framework",
  },
  {
    name: "TypeScript",
    icon: "TS",
    level: 90,
    description: "Type-safe JavaScript",
  },
  {
    name: "React",
    icon: "⚛️",
    level: 95,
    description: "UI library & component design",
  },
  {
    name: "Node.js",
    icon: "🟢",
    level: 87,
    description: "Backend & API development",
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    level: 82,
    description: "Database design & optimization",
  },
];

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            generally i be with:
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-foreground/20 cursor-pointer">
                <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                  {skill.icon}
                </div>
                <h3 className="text-sm font-semibold text-center">
                  {skill.name}
                </h3>
                {hoveredSkill === skill.name && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-10 animate-scale-in">
                    <div className="bg-foreground text-background px-4 py-3 rounded-xl shadow-xl min-w-[200px]">
                      <p className="text-xs font-medium text-center mb-2">
                        {skill.description}
                      </p>
                      <div className="w-full bg-background/20 rounded-full h-1.5">
                        <div
                          className="bg-background rounded-full h-1.5 transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <p className="text-xs text-center mt-1 opacity-80">
                        {skill.level}% proficiency
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
