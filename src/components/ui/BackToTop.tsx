"use client";

import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useScrolled } from "@/lib/use-scrolled";

export function BackToTop() {
  const t = useTranslations("Nav");
  const visible = useScrolled(600);

  if (!visible) return null;

  return (
    <button
      type="button"
      // No explicit `behavior` — this inherits the page's CSS
      // scroll-behavior, which is itself gated by prefers-reduced-motion,
      // so this respects that preference without duplicating the check.
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={t("backToTop")}
      className="fixed bottom-20 end-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground backdrop-blur-md transition-colors hover:border-accent/40 hover:text-accent sm:bottom-6"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
