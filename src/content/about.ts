import { Shield, Cpu, Code2, Music2, Dumbbell, type LucideIcon } from "lucide-react";

export type Facet = {
  id: string;
  icon: LucideIcon;
};

export const facets: Facet[] = [
  { id: "cybersecurity", icon: Shield },
  { id: "lowLevel", icon: Cpu },
  { id: "fullStack", icon: Code2 },
  { id: "music", icon: Music2 },
  { id: "fitness", icon: Dumbbell },
];
