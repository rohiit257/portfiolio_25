"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string | number;
    title: string;
    description: string;
    link?: string;
    image?: string; // manual override, always tried first
    tags?: string[];
    year?: string;
  };
  index: number;
}

const getHost = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

// Site's own social preview image (og:image); errors out if the site has none
const ogPreview = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=false&embed=image.url`;

// Live screenshot of the page
const screenshot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(
    url
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`;

export function ProjectCard({ project }: ProjectCardProps) {
  const { link } = project;

  // Fallback chain: manual image, then og image, then screenshot, then placeholder
  const sources = [
    project.image,
    link && ogPreview(link),
    link && screenshot(link),
  ].filter(Boolean) as string[];

  const [attempt, setAttempt] = useState(0);
  const src = sources[attempt];

  const content = (
    <>
      <div className="aspect-[16/10] w-full overflow-hidden rounded-md border border-gray-200 bg-gray-100 transition-colors group-hover:border-black">
        {src ? (
          <img
            src={src}
            alt={project.title}
            loading="lazy"
            onError={() => setAttempt((a) => a + 1)}
            className="h-full w-full object-cover object-top grayscale-[20%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            {link ? getHost(link) : project.title}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <h3 className="truncate text-xs font-medium text-black uppercase tracking-wide">
          {project.title}
        </h3>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {link && (
        <p className="mt-0.5 truncate text-[11px] text-gray-400">{getHost(link)}</p>
      )}

      <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-1">
        {project.description}
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
    </>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block">
      {content}
    </a>
  ) : (
    <Link href={`/project/${project.id}`} className="group block">
      {content}
    </Link>
  );
}