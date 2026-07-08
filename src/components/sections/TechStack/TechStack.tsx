import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { techStack } from "@/content/techstack";

export function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <section id="tech-stack" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow="tech-stack" title={t("heading")} description={t("intro")} />
        </Reveal>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {techStack.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06}>
              <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                <p className="w-40 shrink-0 font-mono text-xs uppercase tracking-wide text-accent">
                  {t(`categories.${category.id}`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <Badge key={`${item}-${itemIndex}`}>{item}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
