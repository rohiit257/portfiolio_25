import { projects, type Project } from "./projects";

export interface SiteContent {
  name: string;
  location: string;
  hero: string;
  workIntro: string;
  gridIntro: string;
  bio: string;
  experience: { company: string; role: string; period: string }[];
  education: { school: string; degree: string; period: string }[];
  interests: { title: string; note: string }[];
  stack: string[];
  contact: { email: string; location: string; openTo: string; linkedin: string; github: string; x: string; headline: string; description: string; footerHeadline: string };
  projects: Project[];
}

export const defaultContent: SiteContent = {
  name: "Rohit Shahi",
  location: "Mumbai, India",
  hero: "I am a software engineer based in Mumbai, India. I build agentic AI systems, real-time web platforms and full-stack products that solve real problems.",
  workIntro: "Selected work — real-time platforms, AI systems and products built end to end.",
  gridIntro: "Selected work. Agentic AI systems, real-time platforms and full-stack products.",
  bio: "I'm a final-year Computer Engineering student who already ships production AI and full-stack systems, from agentic LLM workflows and RAG pipelines to real-time platforms serving live traffic. I care about clean architecture, observable pipelines and interfaces that make complex technology feel simple.",
  experience: [
    { company: "EIIL", role: "Forward Deployed Engineer (AI)", period: "Sept 2026 — Present" },
    { company: "Nexa Agency", role: "Founder & Engineer", period: "Feb 2026 — Present" },
    { company: "Wings9, UAE", role: "AI Engineer", period: "Jan 2026 — Sept 2026" },
  ],
  education: [{ school: "VESIT, Mumbai", degree: "B.Tech in Computer Engineering", period: "2022 — 2026" }],
  interests: [
    { title: "Agentic AI", note: "Agents, tool use and RAG systems that actually ship." },
    { title: "LLM Internals", note: "Attention, inference and building transformers from scratch." },
    { title: "Real-time Systems", note: "Live data, streaming pipelines and observability." },
    { title: "Product Design", note: "Minimal interfaces that make complex things feel simple." },
  ],
  stack: ["C", "C++", "JavaScript", "TypeScript", "Python", "Rust", "Next.js", "Express", "NestJS", "Django", "PyTorch", "Docker", "LangChain", "LangGraph", "Solidity", "AWS", "Redis", "Kafka", "Jenkins"],
  contact: { email: "rohitshahi581@gmail.com", location: "Mumbai, India", openTo: "AI Engineering, Full-stack Roles", linkedin: "https://linkedin.com/in/rohit-shahi-152661253", github: "https://github.com/rohiit257", x: "https://x.com/rohitdebugbugs", headline: "Let's build something.", description: "I'm open to AI engineering and full-stack opportunities, and always up for collaborating on agentic AI, real-time platforms or anything worth building.", footerHeadline: "Let's connect." },
  projects,
};
