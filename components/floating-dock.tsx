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
		{ icon: Trophy, href: "https://leetcode.com/azzyXT", label: "LeetCode" },
		{ icon: FileText, href: "/resume.pdf", label: "Resume" },
		{ icon: Linkedin, href: "https://www.linkedin.com/in/rohit-shahi-152661253/", label: "LinkedIn" },
		{ icon: Mail, href: "mailto:rohitshahi581@gmail.com", label: "Email" },
	];

	return (
		<div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-scale-in w-full max-w-xs sm:max-w-fit px-2">
			<div className="flex items-center gap-1 sm:gap-2 bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl px-2 sm:px-4 py-2 sm:py-3 shadow-2xl dark:shadow-zinc-950/50">
				{navItems.map((item, index) => (
					<div key={item.id} className="relative group">
						<Button
							variant="ghost"
							size="icon"
							className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 ${
								activeItem === item.id
									? "bg-primary text-primary-foreground shadow-lg scale-105 -translate-y-0.5"
									: "hover:bg-primary/10 hover:text-primary"
							}`}
							asChild
							onClick={() => setActiveItem(item.id)}
						>
							<a href={item.href} aria-label={item.label}>
								<item.icon className="h-5 w-5 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-12" />
							</a>
						</Button>
						<div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:-translate-y-1">
							<div className="bg-foreground text-background text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg whitespace-nowrap shadow-lg">
								<span className="hidden sm:inline">{item.label}</span>
							</div>
						</div>
					</div>
				))}

				<div className="w-px h-6 sm:h-8 bg-border/50 mx-1 sm:mx-2" />

				{socialLinks.map((link, index) => (
					<div key={link.label} className="relative group">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:shadow-lg hover:shadow-secondary/20 hover:bg-secondary/10 hover:text-secondary hover:rotate-6"
							asChild
						>
							<a
								href={link.href}
								target={link.href.startsWith("http") ? "_blank" : "_self"}
								rel="noopener noreferrer"
								aria-label={link.label}
							>
								<link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
							</a>
						</Button>
						<div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:-translate-y-2">
							<div className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-secondary/20">
								<span className="hidden sm:inline">{link.label}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
