export type FlagshipProject = {
  name: string;
  fullName: string;
  tags: string[];
};

export const flagshipProject: FlagshipProject = {
  name: "C.I.R.A",
  fullName: "Cloud Incident Response Analyzer",
  tags: ["Cloud Forensics", "Security", "Python", "AWS", "PostgreSQL"],
};

export type SecondaryProject = {
  id: string;
  fileName: string;
  status: "completed" | "in-progress";
  tags: string[];
  href?: string;
};

export const secondaryProjects: SecondaryProject[] = [
  {
    id: "lawFirm",
    fileName: "law-firm.tsx",
    status: "completed",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    href: "https://yrlegal-website.vercel.app",
  },
  {
    id: "musicSync",
    fileName: "music-sync.tsx",
    status: "in-progress",
    tags: ["Music Tech"],
  },
];
