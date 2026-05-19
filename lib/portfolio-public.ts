import {
  getExperiences,
  getFeaturedTechStack,
  getProjects,
  type ExperienceRow,
  type FeaturedTechItem,
  type ProjectRow,
} from "@/lib/portfolio-queries";
import { SEED_EXPERIENCES, SEED_PROJECTS } from "@/lib/seed-data";
import { urlsFromPreset, presetForName } from "@/lib/tech-icons";

export type PublicExperience = {
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  type: string;
  description: string;
  tags: string[];
};

export type PublicProject = {
  title: string;
  description: string;
  tech: string[];
  year: string;
  featured?: boolean;
  links: { github: string; demo?: string };
};

export type PublicTech = {
  name: string;
  iconLight: string;
  iconDark: string;
};

const FALLBACK_STACK: PublicTech[] = [
  "Next.js",
  "Express.js",
  "TypeScript",
  "C++",
  "Rust",
  "Solana",
  "Ethereum",
  "Solidity",
].map((name) => {
  const p = presetForName(name)!;
  const urls = urlsFromPreset(p);
  return { name, iconLight: urls.iconLight, iconDark: urls.iconDark };
});

function mapExperience(rows: ExperienceRow[]): PublicExperience[] {
  return rows.map((r) => ({
    title: r.title,
    company: r.company,
    companyUrl: r.company_url,
    period: r.period,
    type: r.type,
    description: r.description,
    tags: r.tags,
  }));
}

function mapProjects(rows: ProjectRow[]): PublicProject[] {
  return rows.map((r) => ({
    title: r.title,
    description: r.description,
    tech: r.tech,
    year: r.year,
    featured: r.featured,
    links: {
      github: r.github_url,
      ...(r.demo_url ? { demo: r.demo_url } : {}),
    },
  }));
}

function mapTech(rows: FeaturedTechItem[]): PublicTech[] {
  return rows.map((r) => ({
    name: r.name,
    iconLight: r.iconLight,
    iconDark: r.iconDark,
  }));
}

const FALLBACK_EXPERIENCES: PublicExperience[] = SEED_EXPERIENCES.map((e) => ({
  title: e.title,
  company: e.company,
  companyUrl: e.companyUrl,
  period: e.period,
  type: e.type,
  description: e.description,
  tags: e.tags,
}));

const FALLBACK_PROJECTS: PublicProject[] = SEED_PROJECTS.map((p) => ({
  title: p.title,
  description: p.description,
  tech: p.tech,
  year: p.year,
  featured: p.featured,
  links: {
    github: p.githubUrl,
    ...(p.demoUrl ? { demo: p.demoUrl } : {}),
  },
}));

export async function getPublicPortfolioData(): Promise<{
  techStack: PublicTech[];
  experiences: PublicExperience[];
  projects: PublicProject[];
  fromDatabase: boolean;
}> {
  try {
    const [techStack, experiences, projects] = await Promise.all([
      getFeaturedTechStack(),
      getExperiences(),
      getProjects(),
    ]);
    const hasData =
      techStack.length > 0 || experiences.length > 0 || projects.length > 0;
    if (!hasData) {
      return {
        techStack: FALLBACK_STACK,
        experiences: FALLBACK_EXPERIENCES,
        projects: FALLBACK_PROJECTS,
        fromDatabase: false,
      };
    }
    return {
      techStack: techStack.length ? mapTech(techStack) : FALLBACK_STACK,
      experiences: experiences.length
        ? mapExperience(experiences)
        : FALLBACK_EXPERIENCES,
      projects: projects.length ? mapProjects(projects) : FALLBACK_PROJECTS,
      fromDatabase: true,
    };
  } catch {
    return {
      techStack: FALLBACK_STACK,
      experiences: FALLBACK_EXPERIENCES,
      projects: FALLBACK_PROJECTS,
      fromDatabase: false,
    };
  }
}
