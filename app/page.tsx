import { Chatbot } from "@/components/chatbot";
import { Header } from "@/components/header";
import { LiveLocalTime } from "@/components/live-local-time";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Introduction } from "@/components/sections/introduction";
import { Projects } from "@/components/sections/projects";
import { SocialGrid } from "@/components/sections/social-grid";
import { TechStack } from "@/components/sections/tech-stack";
import { getPublicPortfolioData } from "@/lib/portfolio-public";
import { PERSON, SEO, SITE_NAME, SITE_URL } from "@/lib/site-config";

export const revalidate = 3600;

export default async function Home() {
  const { techStack, experiences, projects } = await getPublicPortfolioData();
  const jsonLd = buildStructuredData(projects);

  return (
    <main className="relative min-h-screen overflow-hidden pb-16 sm:pb-[4.5rem]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <Chatbot />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-12%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(92,98,110,0.18),_transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(56,60,68,0.18),_transparent_68%)]" />
        <div className="absolute right-[-10%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(148,152,162,0.16),_transparent_72%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(52,56,63,0.16),_transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-[80rem] px-3 pt-16 sm:px-5 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-[70rem] overflow-hidden rounded-[1.25rem] border border-border/70 bg-card/70 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:rounded-[1.55rem]">
          <div className="flex items-center gap-3 border-b border-border/70 px-3 py-2 sm:gap-4 sm:px-5 sm:py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1">
              <div className="mx-auto flex h-8 max-w-[14rem] items-center justify-center rounded-full border border-border/60 bg-background/75 px-3 shadow-inner shadow-black/5 sm:max-w-sm sm:px-4">
              </div>
            </div>
          </div>

          <nav
            aria-label="Portfolio quick links"
            className="grid grid-cols-2 border-b border-border/70 md:grid-cols-4"
          >
            <a
              href="#home"
              className="space-y-1 border-b border-border/60 px-3 py-2.5 transition-colors duration-200 hover:bg-background/35 md:border-b-0 md:border-r md:px-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {"//portfolio"}
              </p>
              <p className="truncate text-[11px] font-medium sm:text-xs">rohitdebugbugs.in</p>
            </a>
            <a
              href="mailto:rohitshahi581@gmail.com"
              className="space-y-1 border-b border-l border-border/60 px-3 py-2.5 transition-colors duration-200 hover:bg-background/35 md:border-b-0 md:border-l-0 md:border-r md:px-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {"//contact"}
              </p>
              <p className="truncate text-[11px] font-medium sm:text-xs">rohitshahi581@gmail.com</p>
            </a>
            <a
              href="https://github.com/rohiit257"
              target="_blank"
              rel="noopener noreferrer"
              className="space-y-1 px-3 py-2.5 transition-colors duration-200 hover:bg-background/35 md:border-r md:px-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {"//github"}
              </p>
              <p className="truncate text-[11px] font-medium sm:text-xs">github.com/rohiit257</p>
            </a>
            <div className="space-y-1 border-l border-border/60 px-3 py-2.5 md:border-l-0 md:px-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {"//location"}
              </p>
              <p className="truncate text-[11px] font-medium sm:text-xs">
                India, IST <span className="text-muted-foreground">·</span>{" "}
                <LiveLocalTime />
              </p>
            </div>
          </nav>

          <div className="px-3 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-7">
            <Introduction />
            <TechStack technologies={techStack} />
            <Experience experiences={experiences} />
            <Projects projects={projects} />
            <SocialGrid />
            <Contact />
          </div>

          <footer className="border-t border-border/70 px-3 py-5 sm:px-5 lg:px-8">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
              Copyright {new Date().getFullYear()} Rohit Shahi. Crafted with care.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

function buildStructuredData(
  projects: Awaited<ReturnType<typeof getPublicPortfolioData>>["projects"]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON.name,
        alternateName: PERSON.handle,
        url: SITE_URL,
        image: PERSON.image,
        email: `mailto:${PERSON.email}`,
        jobTitle: PERSON.jobTitle,
        description: SEO.description,
        nationality: "Indian",
        knowsAbout: [
          "Full Stack Development",
          "Blockchain Engineering",
          "Solana",
          "AI Engineering",
          "Next.js",
          "React",
          "TypeScript",
          "Smart Contracts",
          "DeFi",
        ],
        sameAs: PERSON.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: "rohitdebugbugs",
        url: SITE_URL,
        description: SEO.shortDescription,
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "rohitdebugbugs",
        url: SITE_URL,
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: PERSON.sameAs,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects`,
        name: "Rohit Shahi software projects",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.title,
            description: project.description,
            dateCreated: project.year,
            codeRepository: project.links.github,
            url: project.links.demo || project.links.github,
            programmingLanguage: project.tech,
            creator: { "@id": `${SITE_URL}/#person` },
          },
        })),
      },
    ],
  };
}
