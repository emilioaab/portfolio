import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { secondaryProjects } from "@/content/projects";

export function OngoingProjects() {
  const t = useTranslations("OngoingProjects");

  return (
    <section id="projects" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow="projects" title={t("heading")} description={t("intro")} />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {secondaryProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <Card hover className="flex h-full flex-col gap-3">
                <Badge dot={project.status === "in-progress"}>
                  {project.status === "in-progress" ? t("statusInProgress") : t("statusCompleted")}
                </Badge>
                <h3 className="text-xl font-semibold text-foreground">
                  {t(`${project.id}.name`)}
                </h3>
                <p className="text-muted">{t(`${project.id}.description`)}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                  {project.href && (
                    <Button href={project.href} variant="ghost" showArrow className="ms-auto px-0">
                      {t("visitSite")}
                    </Button>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}

          <Reveal delay={secondaryProjects.length * 0.08}>
            <Card className="flex h-full flex-col items-start justify-center gap-2 border-dashed text-muted">
              <p className="font-mono text-sm">
                {t("comingSoon")}
                <span className="animate-blink ms-1 inline-block h-4 w-2 translate-y-0.5 bg-accent" />
              </p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
