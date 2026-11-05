export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year?: string;
  role: string;
  tags: string[];
  color: string;
  heroImage?: string;
  fullDescription: string;
  galleryImages: string[];
  link?: { label: string; href: string };
}

export const projects: Project[] = [
  {
    id: "versus",
    title: "Versus",
    subtitle: "Real-time, scalable debate & voting platform.",
    description: "Real-time Full-stack Platform",
    role: "Design & Development",
    tags: ["REAL-TIME", "FULL-STACK"],
    color: "hsl(220, 60%, 50%)",
    fullDescription:
      "Versus is a real-time voting and debate platform built for live engagement. Live sync, threaded comments and instant updates are powered by WebSockets, so every vote and reply lands in front of every participant the moment it happens. Redis and BullMQ handle high-volume background tasks and enforce API rate limiting under load, while a responsive UI with real-time analytics keeps the experience fast and interactive.",
    galleryImages: [],
  },
  {
    id: "metabazaar",
    title: "MetaBazaar",
    subtitle: "Decentralized NFT marketplace with on-chain royalties.",
    description: "Web3 & AI Marketplace",
    role: "Design & Development",
    tags: ["WEB3", "AI"],
    color: "hsl(270, 60%, 55%)",
    fullDescription:
      "MetaBazaar is a decentralized NFT marketplace supporting minting, trading and royalties through Ethereum smart contracts written in Solidity and deployed with Hardhat. AI tools power personalized NFT generation, and IPFS provides decentralized asset storage. An admin dashboard adds analytics and social interaction features, giving creators and collectors a complete on-chain ecosystem.",
    galleryImages: [],
  },
  {
    id: "agentic-ml-pipeline",
    title: "Agentic ML Pipeline",
    subtitle: "Autonomous AI workflow system that heals itself.",
    description: "AI Infrastructure",
    role: "Architecture & Development",
    tags: ["AI", "MLOPS"],
    color: "hsl(160, 50%, 45%)",
    fullDescription:
      "An agentic ML pipeline that automates data processing, training and deployment end to end. Multi-agent workflows handle adaptive decision-making and task execution, with self-healing retry mechanisms that recover from failure on their own. CI/CD and MLflow provide model versioning, monitoring and scalable deployment, while parallel and distributed processing keeps pipeline performance high.",
    galleryImages: [],
  },
];
