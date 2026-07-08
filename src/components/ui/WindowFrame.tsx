import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type WindowFrameProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  hover?: boolean;
  children: ReactNode;
};

export function WindowFrame({
  title,
  hover = false,
  children,
  className,
  ...props
}: WindowFrameProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border bg-black/30 transition-colors duration-200",
        hover && "hover:border-accent/40",
        className,
      )}
      {...props}
    >
      <div className="flex shrink-0 items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" aria-hidden="true" />
        {title && <span className="ms-2 font-mono text-xs text-muted">{title}</span>}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
