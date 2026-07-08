import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-[85dvh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center sm:px-10"
    >
      <HeroBackground />

      <Reveal>
        <p className="font-mono text-sm text-accent">
          <span aria-hidden="true">$ </span>
          {t("eyebrow")}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-6 text-4xl font-semibold text-foreground sm:text-6xl">
          {t("name")}
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-6 max-w-xl text-balance text-muted sm:text-lg">{t("tagline")}</p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#flagship-project" showArrow>
            {t("ctaPrimary")}
          </Button>
          <Button href="#contact" variant="secondary">
            {t("ctaSecondary")}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
