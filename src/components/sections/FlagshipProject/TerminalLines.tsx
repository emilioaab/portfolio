import { cn } from "@/lib/utils";

type TerminalLinesProps = {
  lines: string[];
  className?: string;
};

export function TerminalLines({ lines, className }: TerminalLinesProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-4 font-mono text-sm", className)} aria-hidden="true">
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
  );
}
