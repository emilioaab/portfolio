export type SocialLink = {
  id: string;
  href: string;
  icon: "mail" | "github" | "linkedin";
};

export const socialLinks: SocialLink[] = [
  { id: "email", href: "mailto:you@example.com", icon: "mail" },
  { id: "github", href: "https://github.com/TODO", icon: "github" },
  { id: "linkedin", href: "https://linkedin.com/in/TODO", icon: "linkedin" },
];
