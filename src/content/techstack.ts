export type TechCategory = {
  id: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  { id: "languages", items: ["Python", "[TODO]", "[TODO]"] },
  { id: "cloud", items: ["AWS", "[TODO]"] },
  { id: "security", items: ["[TODO]", "[TODO]"] },
  { id: "web", items: ["TypeScript", "Next.js", "Tailwind CSS"] },
];
