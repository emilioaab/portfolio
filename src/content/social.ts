export type SocialLink = {
  id: string;
  href: string;
  icon: "mail" | "github" | "linkedin";
  // Visible label — kept as literal brand names/addresses regardless of
  // locale (GitHub/LinkedIn aren't translated, same convention as the
  // terminal syntax elsewhere on the site).
  label: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: "email",
    href: "mailto:emilabdumalikov@gmail.com",
    icon: "mail",
    label: "emilabdumalikov@gmail.com",
  },
  { id: "github", href: "https://github.com/emilioaab", icon: "github", label: "GitHub" },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/emilabdumalikov/",
    icon: "linkedin",
    label: "LinkedIn",
  },
];
