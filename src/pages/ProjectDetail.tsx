"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { useSiteContent } from "@/lib/content";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useSiteContent();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Layout variant="dark">
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-white mb-4">Project not found</h1>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back to work
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout variant="dark">
      <div className="bg-black min-h-screen">
        {/* Hero Image */}
        <section className="pt-24 lg:pt-32">
          <div className="w-full">
            <div 
              className="w-full aspect-[16/9] overflow-hidden"
              style={{ backgroundColor: project.color }}
            >
              {project.heroImage || project.galleryImages[0] ? (
                <img
                  src={project.heroImage || project.galleryImages[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/30 text-6xl md:text-8xl font-bold">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Metadata Section */}
        <section className="container py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Title & Subtitle */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-[-0.02em] mb-4">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {project.year && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-2">
                      Year
                    </p>
                    <p className="text-base text-white">{project.year}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-2">
                    Role
                  </p>
                  <p className="text-base text-white">{project.role}</p>
                </div>
              </div>
              {project.link && (
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-2">
                    Code
                  </p>
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    {project.link.label}
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-500">↗</span>
                  </a>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-widest text-gray-400 border border-gray-700 px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="w-full h-px bg-gray-800" />
        </div>

        {/* Full Description */}
        <section className="container py-12 lg:py-16">
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
            {project.fullDescription}
          </p>
        </section>

        {/* Gallery */}
        <section className="container pb-20 lg:pb-32 space-y-8">
          {project.galleryImages.map((img, index) => (
            <div 
              key={index} 
              className="w-full overflow-hidden rounded-2xl"
            >
              <img
                src={img}
                alt={`${project.title} - Image ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </section>

        {/* Back Link */}
        <section className="container pb-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
            Back to work
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default ProjectDetail;

