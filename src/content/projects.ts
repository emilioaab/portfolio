export type ProjectLink = {
  label: string;
  href: string;
};

export type FlagshipProject = {
  name: string;
  tags: string[];
  links: ProjectLink[];
  terminalLines: string[];
};

export const flagshipProject: FlagshipProject = {
  name: "C.I.R.A",
  tags: ["Cloud Forensics", "Security"],
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

export type OngoingProject = {
  id: string;
  tags: string[];
};

export const ongoingProjects: OngoingProject[] = [
  { id: "musicSync", tags: ["Music Tech"] },
];
