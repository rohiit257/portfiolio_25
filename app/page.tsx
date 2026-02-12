import { Introduction } from "@/components/sections/introduction";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Skills } from "@/components/sections/skills";
import { SocialGrid } from "@/components/sections/social-grid";
import { FloatingDock } from "@/components/floating-dock";
import { StatusIndicator } from "@/components/status-indicator";
import { Header } from "@/components/header";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen pb-24">
      <Header />
      <FloatingDock />

      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <Introduction />
        <TechStack />
       
        <div className="space-y-0">
          <Projects />
        </div>
        
        <SocialGrid />
      
      </div>

      <footer className="border-t border-border/40 mt-20 py-8">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} rohit. crafted with care.
          </p>
        </div>
      </footer>
    </main>
  );
}
