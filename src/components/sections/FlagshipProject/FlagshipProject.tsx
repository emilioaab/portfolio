import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { flagshipProject } from "@/content/projects";
import { ProjectVideo } from "@/components/ui/ProjectVideo";

export function FlagshipProject() {
  const t = useTranslations("FlagshipProject");

  return (
    <section id="flagship-project" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="flagship-project"
            title={t("heading")}
            description={t("intro")}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <WindowFrame title="cira.sh" className="mt-10">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {flagshipProject.name}
                  </h3>
                  <p className="font-mono text-xs text-muted">{flagshipProject.fullName}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {flagshipProject.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <p className="text-muted">{t("description")}</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {flagshipProject.links.map((link) => (
                    <Button key={link.label} href={link.href} variant="secondary" showArrow>
                      {link.label}
                    </Button>
                  ))}
                </div>
              </div>

              <ProjectVideo
                mp4Src="/videos/cira-demo.mp4"
                webmSrc="/videos/cira-demo.webm"
                poster="/videos/cira-demo-poster.jpg"
                className="aspect-[1280/582] md:border-s md:border-border"
              />
            </div>
          </WindowFrame>
        </Reveal>
      </div>
    </section>
  );
}
