import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero/Hero";
import { FlagshipProject } from "@/components/sections/FlagshipProject/FlagshipProject";
import { OngoingProjects } from "@/components/sections/OngoingProjects/OngoingProjects";
import { About } from "@/components/sections/About/About";
import { TechStack } from "@/components/sections/TechStack/TechStack";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex flex-1 flex-col items-center">
      <Hero />
      <FlagshipProject />
      <OngoingProjects />
      <About />
      <TechStack />
      <div className="w-full max-w-2xl px-8 py-10 sm:px-10">
        <Reveal>
          <Card id="contact" hover>
            <Badge>Contact</Badge>
            <p className="mt-3 text-lg text-foreground">{t("Contact.title")}</p>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
