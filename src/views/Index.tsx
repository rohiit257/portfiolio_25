"use client";

import { Layout } from "@/components/layout/Layout";
import { ProjectGrid } from "@/components/ProjectGrid";
import { StackMarquee } from "@/components/StackMarquee";
import { useSiteContent } from "@/lib/content";

const experience = [
  { company: "EIIL", role: "Forward Deployed Engineer (AI)", period: "Sept 2026 — Present" },
  { company: "Nexa Agency", role: "Founder & Engineer", period: "Feb 2026 — Present" },
  { company: "Wings9, UAE", role: "AI Engineer", period: "Jan 2026 — Sept 2026" },
];

const education = [
  { school: "VESIT, Mumbai", degree: "B.Tech in Computer Engineering", period: "2022 — 2026" },
];

const words = ["software", "AI", "Blockchain"];

// Placeholder interests: edit these to your own
const interests = [
  { title: "Agentic AI", note: "Agents, tool use and RAG systems that actually ship." },
  { title: "LLM Internals", note: "Attention, inference and building transformers from scratch." },
  { title: "Real-time Systems", note: "Live data, streaming pipelines and observability." },
  { title: "Product Design", note: "Minimal interfaces that make complex things feel simple." },
];

const Index = () => {
  const { hero, bio, experience, education, interests } = useSiteContent();
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
          <div className="container">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-black leading-[1.1] tracking-[-0.02em] max-w-6xl">
              <span className="sr-only">Rohit Shahi — </span>
              {hero}
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-24 md:pb-32 bg-white">
          <div className="container">
            <div className="w-full h-px bg-gray-300 mb-16" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
              {/* Left Column - Lists */}
              <div className="lg:col-span-4 space-y-14">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-6">Work</h2>
                  <div className="space-y-5">
                    {experience.map((item) => (
                      <div key={item.company}>
                        <p className="text-sm font-medium text-black uppercase tracking-wide">{item.company}</p>
                        <p className="text-sm text-gray-500">{item.role}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.period}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-6">Education</h2>
                  <div className="space-y-5">
                    {education.map((item) => (
                      <div key={item.school}>
                        <p className="text-sm font-medium text-black uppercase tracking-wide">{item.school}</p>
                        <p className="text-sm text-gray-500">{item.degree}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Bio */}
              <div className="lg:col-span-8 space-y-16">
                <p className="max-w-2xl text-lg md:text-xl text-black leading-relaxed">
                  {bio}
                </p>

                {/* Interests */}
                <div>
                  <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-6">Interests</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                    {interests.map((item) => (
                      <div key={item.title} className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-medium text-black uppercase tracking-wide">{item.title}</p>
                        <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="bg-white border-t border-gray-200">
          <div className="container pt-16 md:pt-24">
            <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-10">Projects</h2>
          </div>
          <ProjectGrid embedded />
        </section>

        {/* Stack Section */}
        <section className="py-20 md:py-24 bg-white border-t border-gray-200">
          <div className="container">
            <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-12">Stack</h2>
          </div>
          <StackMarquee />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
