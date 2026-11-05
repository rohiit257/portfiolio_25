"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string | number;
    title: string;
    description: string;
    subtitle?: string;
    heroImage?: string;
    image?: string;
    galleryImages?: string[];
    color?: string;
    tags?: string[];
    year?: string;
    link?: string | { label: string; href: string };
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Resolve Cloudinary or uploaded image: heroImage > image > first galleryImage
  const rawImage =
    project.heroImage ||
    project.image ||
    (project.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages[0]
      : undefined);

  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(rawImage) && !imageError;

  return (
          <Link href={`/project/${project.id}`} className="group block">
            {/* Thumbnail Container */}
            <div className="aspect-[16/10] w-full overflow-hidden rounded-md border border-gray-200 bg-gray-100 transition-colors group-hover:border-black relative">
              {showImage ? (
                <img
                  src={rawImage}
                  alt={project.title}
                  loading="lazy"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover object-top grayscale-[15%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
              ) : (
          /* Editorial styled fallback when no Cloudinary photo is uploaded yet */
                  <div
                    className="flex h-full w-full flex-col justify-between p-5 text-white transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{
                      backgroundColor: project.color || "#111111",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-white/70 font-mono">
                        {project.tags?.[0] || "PROJECT"}
                      </span>
                      <span className="text-xs text-white/40 font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-4xl lg:text-5xl font-bold text-white/20 select-none tracking-tight">
                        {project.title.charAt(0)}
                      </span>
                      <span className="text-xs text-white/80 font-medium tracking-wide">
                        View Project →
                      </span>
                    </div>
                  </div>
        )}
                </div>

      {/* Meta info */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <h3 className="truncate text-xs font-medium text-black uppercase tracking-wide">
                  {project.title}
                </h3>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-1">
                {project.subtitle || project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full border border-gray-200 text-[11px] text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
            );
}
