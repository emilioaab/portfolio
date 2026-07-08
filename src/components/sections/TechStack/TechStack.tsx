import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { techStack } from "@/content/techstack";

export function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <section id="tech-stack" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow="tech-stack" title={t("heading")} description={t("intro")} />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {techStack.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06}>
              <Card>
                <p className="font-mono text-xs uppercase tracking-wide text-accent">
                  {t(`categories.${category.id}`)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <Badge key={`${item}-${itemIndex}`}>{item}</Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
