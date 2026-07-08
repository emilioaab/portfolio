import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AboutFileList } from "./AboutFileList";

export function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow="about" title={t("heading")} description={t("intro")} />
        </Reveal>

        <Reveal delay={0.1}>
          <AboutFileList />
        </Reveal>
      </div>
    </section>
  );
}
