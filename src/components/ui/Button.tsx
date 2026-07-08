import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const variantClasses = {
  primary: "bg-accent text-accent-foreground hover:brightness-110",
  secondary: "border border-border text-foreground hover:border-accent/40 hover:bg-surface",
  ghost: "text-muted hover:text-foreground",
} as const;

type Variant = keyof typeof variantClasses;

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  showArrow?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export function Button({
  variant = "primary",
  className,
  children,
  showArrow = false,
  href,
  ...rest
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm transition-colors duration-200",
    variantClasses[variant],
    className,
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowUpRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    const anchorRest = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "className" | "children" | "href"
    >;

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}