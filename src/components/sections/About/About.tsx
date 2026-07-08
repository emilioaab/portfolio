import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { facets } from "@/content/about";
import { cn } from "@/lib/utils";

const featuredFacetId = "cybersecurity";

export function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow="about" title={t("heading")} description={t("intro")} />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-6">
          {facets.map((facet, index) => {
            const Icon = facet.icon;
            const isFeatured = facet.id === featuredFacetId;

            return (
              <Reveal
                key={facet.id}
                delay={index * 0.06}
                className={isFeatured ? "sm:col-span-3 sm:row-span-2" : "sm:col-span-3"}
              >
                <Card hover className="flex h-full flex-col gap-3">
                  <Icon
                    className="text-accent"
                    size={isFeatured ? 28 : 22}
                    aria-hidden="true"
                  />
                  <h3
                    className={cn(
                      "font-semibold text-foreground",
                      isFeatured ? "text-2xl" : "text-lg",
                    )}
                  >
                    {t(`facets.${facet.id}.title`)}
                  </h3>
                  <p className="text-muted">{t(`facets.${facet.id}.description`)}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
