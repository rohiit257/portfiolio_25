"use client";

import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { useSiteContent } from "@/lib/content";

const Work = () => {
  const { projects, workIntro } = useSiteContent();
  return (
    <Layout variant="dark">
      <div className="bg-black min-h-screen">
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-[1.1] tracking-[-0.02em] max-w-5xl">
              {workIntro}
            </h1>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="container">
            <div className="w-full h-px bg-gray-800 mb-4" />
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-8 border-b border-gray-800 hover:bg-gray-900/40 transition-colors px-2 -mx-2"
              >
                <span className="text-xs text-gray-500 w-8 shrink-0 pt-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-4xl font-medium text-white group-hover:text-gray-300 transition-colors tracking-[-0.01em]">
                    {project.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-400 mt-1 max-w-xl">
                    {project.subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end md:max-w-xs">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-widest text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Work;
