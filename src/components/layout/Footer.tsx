import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border px-6 py-8 text-center sm:px-10">
      <p className="font-mono text-xs text-muted">{t("line", { year })}</p>
    </footer>
  );
}
