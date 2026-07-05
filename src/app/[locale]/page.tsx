import { useTranslations } from "next-intl";

const sections = [
  "Hero",
  "FlagshipProject",
  "OngoingProjects",
  "About",
  "TechStack",
  "Contact",
] as const;

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-8 py-10 sm:px-10">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        {sections.map((section) => (
          <section key={section} className="rounded-lg border border-border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">
              {section}
            </p>
            <p className="mt-2 text-lg text-foreground">{t(`${section}.title`)}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
