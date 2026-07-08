import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { socialLinks } from "@/content/social";

const iconMap = {
  mail: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export function Contact() {
  const t = useTranslations("Contact");
  const emailLink = socialLinks.find((link) => link.id === "email")!;
  const otherLinks = socialLinks.filter((link) => link.id !== "email");

  return (
    <section id="contact" className="w-full px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <Reveal>
          <SectionHeading
            eyebrow="contact"
            title={t("heading")}
            description={t("intro")}
            className="items-center text-center"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Button href={emailLink.href} showArrow>
            {t("ctaPrimary")}
          </Button>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex items-center gap-3">
            {otherLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Button
                  key={link.id}
                  href={link.href}
                  variant="ghost"
                  aria-label={t(`links.${link.id}`)}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </Button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
