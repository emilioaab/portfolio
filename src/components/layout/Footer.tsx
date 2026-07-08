import { useTranslations } from "next-intl";
import { socialLinks } from "@/content/social";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border px-6 py-6 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-muted">{t("line", { year })}</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {socialLinks.map((link) => {
            const isExternal = link.icon !== "mail";
            return (
              <a
                key={link.id}
                href={link.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-mono text-xs text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
