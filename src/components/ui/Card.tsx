import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6 transition-colors duration-200",
        hover && "hover:border-accent/40 hover:bg-accent/[0.03]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}