import { cn } from "@/lib/utils";

type TerminalWindowProps = {
  lines: string[];
  className?: string;
};

export function TerminalWindow({ lines, className }: TerminalWindowProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-lg border border-border bg-black/30", className)}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
      </div>
      <div className="flex flex-col gap-1.5 p-4 font-mono text-sm">
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
