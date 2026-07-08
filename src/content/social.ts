export type SocialLink = {
  id: string;
  href: string;
  icon: "mail" | "github" | "linkedin";
};

export const socialLinks: SocialLink[] = [
  { id: "email", href: "mailto:emilabdumalikov@gmail.com", icon: "mail" },
  { id: "github", href: "https://github.com/emilioaab", icon: "github" },
  { id: "linkedin", href: "https://www.linkedin.com/in/emilabdumalikov/", icon: "linkedin" },
];
