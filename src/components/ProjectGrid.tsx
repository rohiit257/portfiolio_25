import { useSiteContent } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  embedded?: boolean;
}

export function ProjectGrid({ embedded = false }: ProjectGridProps) {
  const { projects, gridIntro } = useSiteContent();
  return (
    <section className={cn("bg-white", embedded ? "pb-20 md:pb-24" : "pb-24 md:pb-32")}>
      {!embedded && (
        <div className="container pt-32 pb-16 md:pt-40 md:pb-20">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-black leading-[1.1] tracking-[-0.02em] max-w-4xl">
            {gridIntro}
          </h1>
        </div>
      )}

      <div className="container">
        {!embedded && <div className="w-full h-px bg-gray-300 mb-16" />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
