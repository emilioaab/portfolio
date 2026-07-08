"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/use-active-section";

const SECTIONS = [
  { id: "flagship-project", labelKey: "work" },
  { id: "projects", labelKey: "projects" },
  { id: "about", labelKey: "about" },
  { id: "tech-stack", labelKey: "stack" },
  { id: "contact", labelKey: "contact" },
] as const;

const SECTION_IDS = SECTIONS.map((section) => section.id);

export function Nav() {
  const t = useTranslations("Nav");
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav className="me-auto hidden items-center gap-5 font-mono text-sm sm:flex">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            "transition-colors",
            activeId === section.id ? "text-accent" : "text-muted hover:text-foreground",
          )}
        >
          {t(section.labelKey)}
        </a>
      ))}
    </nav>
  );
}
