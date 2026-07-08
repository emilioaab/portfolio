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

// Nav's links are `hidden sm:flex` (no room for five text links on a
// phone width), so mobile had no section navigation at all — this is
// the mobile-only equivalent, a fixed bottom bar instead of a top row.
export function MobileNav() {
  const t = useTranslations("Nav");
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-border bg-background/90 py-2.5 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            "px-2 py-1 font-mono text-[11px] transition-colors",
            activeId === section.id ? "text-accent" : "text-muted",
          )}
        >
          {t(section.labelKey)}
        </a>
      ))}
    </nav>
  );
}
