import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Typewriter } from "@/components/ui/Typewriter";
import { Ltr } from "@/components/ui/Ltr";
import { HeroBackground } from "./HeroBackground";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { TerminalPrompt } from "./TerminalPrompt";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative flex w-full min-h-[85dvh] flex-col items-center justify-center overflow-hidden px-6 py-20 sm:px-10"
    >
      <HeroBackground />
      <HeroCanvas />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
          <Reveal>
            <p className="font-mono text-sm text-accent">
              <Ltr>
                <span aria-hidden="true">$ </span>
                {t("eyebrow")}
              </Ltr>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="mt-6 text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl"
              aria-label={`${t("greeting")} ${t("nameIntro")} ${t("name")}`}
            >
              <span aria-hidden="true">
                <Typewriter
                  segments={[`${t("greeting")} `, `${t("nameIntro")} ${t("name")}`]}
                  startDelay={500}
                />
                <span className="animate-blink ms-2 inline-block h-[0.85em] w-[0.5em] translate-y-[0.05em] bg-accent align-middle" />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-balance text-muted sm:text-lg">{t("tagline")}</p>
          </Reveal>

          <Reveal delay={0.3} className="flex w-full flex-col items-center lg:items-start">
            <TerminalPrompt />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="shrink-0">
          <HeroPortrait />
        </Reveal>
      </div>
    </section>
  );
}
