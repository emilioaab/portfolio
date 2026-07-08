import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Typewriter } from "@/components/ui/Typewriter";
import { Ltr } from "@/components/ui/Ltr";
import { HeroBackground } from "./HeroBackground";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { TerminalPrompt } from "./TerminalPrompt";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative flex w-full min-h-[85dvh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center sm:px-10"
    >
      <HeroBackground />
      <HeroCanvas />

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
          className="mt-6 text-4xl font-semibold text-foreground sm:text-6xl lg:text-7xl"
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
        <p className="mt-6 max-w-xl text-balance text-muted sm:text-lg lg:max-w-2xl lg:text-xl">
          {t("tagline")}
        </p>
      </Reveal>

      <Reveal delay={0.3} className="flex w-full flex-col items-center">
        <TerminalPrompt />
      </Reveal>
    </section>
  );
}
