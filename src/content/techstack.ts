export type TechCategory = {
  id: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  { id: "languages", items: ["Python", "TypeScript", "C / C++", "x86 Assembly", "SQL"] },
  { id: "cloud", items: ["AWS (EC2, S3, SSM)", "Docker", "Linux", "CI/CD", "Git"] },
  { id: "security", items: ["Cryptography", "Network Security", "Secure Coding", "System Security"] },
  { id: "web", items: ["React", "Next.js", "Node.js", "FastAPI", "Tailwind CSS"] },
];
