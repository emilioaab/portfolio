export type ProjectLink = {
  label: string;
  href: string;
};

export type FlagshipProject = {
  name: string;
  fullName: string;
  tags: string[];
  links: ProjectLink[];
  terminalLines: string[];
};

export const flagshipProject: FlagshipProject = {
  name: "C.I.R.A",
  fullName: "Cloud Incident Response Analyzer",
  tags: ["Cloud Forensics", "Security", "Python", "AWS"],
  links: [
    { label: "GitHub", href: "#" },
    { label: "Live Demo", href: "#" },
  ],
  terminalLines: [
    "$ cira scan --target s3://bucket",
    "[OK] collecting artifacts...",
    "[OK] analyzing timeline...",
    "[!!] 3 anomalies detected",
  ],
};

export type SecondaryProject = {
  id: string;
  status: "completed" | "in-progress";
  tags: string[];
  href?: string;
};

export const secondaryProjects: SecondaryProject[] = [
  {
    id: "lawFirm",
    status: "completed",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    href: "https://yrlegal-website.vercel.app",
  },
  { id: "musicSync", status: "in-progress", tags: ["Music Tech"] },
];
