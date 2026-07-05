"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border p-1 text-sm">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          aria-current={l === locale ? "true" : undefined}
          className={
            l === locale
              ? "rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground"
              : "rounded-full px-2.5 py-1 text-muted transition-colors hover:text-foreground"
          }
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
