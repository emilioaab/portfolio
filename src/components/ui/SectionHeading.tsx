import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Ltr } from "@/components/ui/Ltr";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow && (
        <p className="font-mono text-sm text-accent">
          <Ltr>
            <span aria-hidden="true">$ </span>
            {eyebrow}
          </Ltr>
        </p>
      )}
      <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
      {description && <p className="max-w-2xl text-muted">{description}</p>}
    </div>
  );
}