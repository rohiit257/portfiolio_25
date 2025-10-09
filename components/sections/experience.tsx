"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/use-parallax";
import { ExternalLink, Calendar, MapPin, Briefcase, Code, Award, Zap } from "lucide-react";

export function Experience() {
  const scrollRef = useScrollAnimation();

  const items = [
    {
      title: "Engineer",
      organization: "piratecrewfun",
      period: "2024 — Present",
      location: "Remote",
      type: "Experience",
      category: "Full-time",
      logo: "🏴‍☠️",
      link: "https://piratecrewfun.com",
      points: [
        "Building full‑stack web apps with Next.js and TypeScript",
        "Integrations with Solana smart contracts and Meteora protocols",
        "Shipped features improving performance and user experience",
        "Collaborated with cross-functional teams on DeFi products",
      ],
      skills: ["Next.js", "TypeScript", "Solana", "DeFi"],
    },
    {
      title: "DeFi Trading Bot",
      organization: "Personal Project",
      period: "2024",
      location: "Open Source",
      type: "Project",
      category: "Web3",
      logo: "🤖",
      link: "https://github.com/rohiit257/defi-bot",
      points: [
        "Built automated trading bot for Solana DEXs",
        "Implemented arbitrage strategies across multiple protocols",
        "Real-time price monitoring and execution engine",
        "Achieved 15% average monthly returns in testing",
      ],
      skills: ["Rust", "Solana", "Jupiter", "Raydium"],
    },
    {
      title: "Cohort Participant",
      organization: "Solana Turbine",
      period: "2023 — 2024",
      location: "Online",
      type: "Experience",
      category: "Program",
      logo: "⚡",
      link: "https://turbine.so",
      points: [
        "Completed builders and advanced SVM cohorts",
        "Deep dive into Solana blockchain architecture",
        "Built and deployed multiple Solana programs",
        "Mentored junior developers in blockchain development",
      ],
      skills: ["Rust", "Solana", "Anchor", "Web3"],
    },
    {
      title: "NFT Marketplace",
      organization: "Side Project",
      period: "2023",
      location: "Mainnet",
      type: "Project",
      category: "Web3",
      logo: "🎨",
      link: "https://github.com/rohiit257/nft-marketplace",
      points: [
        "Full-stack NFT marketplace on Solana blockchain",
        "Custom smart contracts for minting and trading",
        "Integrated with Phantom and Solflare wallets",
        "Processed over 1000 NFT transactions",
      ],
      skills: ["Next.js", "Anchor", "Metaplex", "IPFS"],
    },
  ];

  return (
    <section className="py-20" id="experience" ref={scrollRef}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Experience & Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and key projects building innovative solutions in Web3 and blockchain technology.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative card-hover glow-effect bg-card border border-border rounded-2xl p-6 sm:p-8 animate-stagger overflow-hidden"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Floating particles animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                <div className="absolute top-12 right-12 w-1 h-1 bg-secondary/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-6">
                  {/* Enhanced Logo with animation */}
                  <div className="relative">
                    <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                      {item.logo}
                    </div>
                    <div className="absolute -inset-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                          item.type === 'Project' 
                            ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:bg-blue-500/20' 
                            : 'bg-green-500/10 text-green-500 border border-green-500/20 group-hover:bg-green-500/20'
                        }`}>
                          {item.type === 'Project' ? <Code className="w-3 h-3 mr-1 inline" /> : <Briefcase className="w-3 h-3 mr-1 inline" />}
                          {item.type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Enhanced metadata with icons */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        <Award className="w-4 h-4 text-primary/70" />
                        <span className="font-medium">{item.organization}</span>
                        <span className="text-xs">•</span>
                        <span className="text-sm">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary/70" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary/70" />
                          <span>{item.location}</span>
                        </div>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors group/link"
                          >
                            <ExternalLink className="w-3 h-3 group-hover/link:scale-110 transition-transform" />
                            <span className="text-xs">View</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Achievements */}
                <div className="space-y-4 mb-6">
                  {item.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 group/item p-3 rounded-lg hover:bg-secondary/20 transition-all duration-200">
                      <div className="relative mt-1">
                        <Zap className="w-4 h-4 text-primary/70 group-hover/item:text-primary group-hover/item:scale-110 transition-all duration-200" />
                        <div className="absolute -inset-1 bg-primary/10 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity blur-sm" />
                      </div>
                      <p className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-full border border-border/40 hover:bg-secondary hover:border-foreground/30 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline connector */}
              {idx < items.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-border to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
