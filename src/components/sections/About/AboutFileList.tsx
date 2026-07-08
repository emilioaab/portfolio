"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { facets } from "@/content/about";
import { Ltr } from "@/components/ui/Ltr";

export function AboutFileList() {
  const t = useTranslations("About");
  const [openId, setOpenId] = useState<string | null>(facets[0]?.id ?? null);

  return (
    <div className="mt-10 border-t border-border">
      <p className="border-b border-border py-3 font-mono text-xs text-muted">
        <Ltr>
          <span aria-hidden="true">$ </span>
          ls -la ~/about
        </Ltr>
      </p>

      {facets.map((facet) => {
        const isOpen = openId === facet.id;

        return (
          <div key={facet.id} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : facet.id)}
              aria-expanded={isOpen}
              className="flex w-full py-4 text-start font-mono text-sm transition-colors hover:text-accent"
            >
              <span dir="ltr" className="flex items-center gap-3">
                <ChevronRight
                  size={14}
                  className={cn(
                    "shrink-0 text-accent transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                  aria-hidden="true"
                />
                <span className="text-muted">drwxr-xr-x</span>
                <span className="text-foreground">{facet.slug}/</span>
              </span>
            </button>

            {isOpen && (
              <div className="ms-[3.25rem] max-w-2xl pb-5 pe-4">
                <p className="font-semibold text-foreground">{t(`facets.${facet.id}.title`)}</p>
                <p className="mt-1 text-sm text-muted">
                  {t(`facets.${facet.id}.description`)}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
