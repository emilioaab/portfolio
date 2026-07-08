import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero/Hero";
import { FlagshipProject } from "@/components/sections/FlagshipProject/FlagshipProject";
import { OngoingProjects } from "@/components/sections/OngoingProjects/OngoingProjects";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const placeholderSections = ["About", "TechStack", "Contact"] as const;

const sectionIds: Record<(typeof placeholderSections)[number], string> = {
  About: "about",
  TechStack: "tech-stack",
  Contact: "contact",
};

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex flex-1 flex-col items-center">
      <Hero />
      <FlagshipProject />
      <OngoingProjects />
      <div className="flex w-full max-w-2xl flex-col gap-6 px-8 py-10 sm:px-10">
        {placeholderSections.map((section, index) => (
          <Reveal key={section} delay={index * 0.05}>
            <Card id={sectionIds[section]} hover>
              <Badge>{section}</Badge>
              <p className="mt-3 text-lg text-foreground">{t(`${section}.title`)}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
