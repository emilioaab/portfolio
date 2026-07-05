import Link from "next/link";
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
    <div className="flex flex-1 flex-col items-center gap-10 bg-zinc-50 px-8 py-20 font-sans dark:bg-black">
      <nav className="flex gap-4 text-sm font-medium">
        <Link href="/en" className="underline underline-offset-4">
          EN
        </Link>
        <Link href="/he" className="underline underline-offset-4">
          HE
        </Link>
      </nav>

      <main className="flex w-full max-w-2xl flex-col gap-6">
        {sections.map((section) => (
          <section
            key={section}
            className="rounded-lg border border-black/10 p-6 dark:border-white/10"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {section}
            </p>
            <p className="mt-2 text-lg text-black dark:text-zinc-50">
              {t(`${section}.title`)}
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}
