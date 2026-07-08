import { cn } from "@/lib/utils";

type TerminalLinesProps = {
  lines: string[];
  className?: string;
};

export function TerminalLines({ lines, className }: TerminalLinesProps) {
  return (
    // Outer element keeps className (border-s/border-e) resolving relative
    // to the *page's* direction — the grid it sits in already mirrors under
    // RTL, so which physical side needs the divider still depends on that,
    // not on this component's own text direction. Only the inner wrapper
    // forces ltr, so the terminal output itself always reads/aligns like
    // the English version regardless of locale.
    <div className={cn(className)} aria-hidden="true">
      <div dir="ltr" className="flex flex-col gap-1.5 p-4 font-mono text-sm">
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              line.startsWith("[!!]")
                ? "text-accent"
                : line.startsWith("$")
                  ? "text-foreground"
                  : "text-muted"
            }
          >
            {line}
          </p>
        ))}
        <p className="text-foreground">
          <span>$ </span>
          <span className="animate-blink inline-block h-4 w-2 translate-y-0.5 bg-accent" />
        </p>
      </div>
    </div>
  );
}
