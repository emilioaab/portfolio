import type { HTMLAttributes, ReactNode } from "react";

type LtrProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

// Isolates inherently-LTR content (terminal syntax like "$ command",
// file paths) as a single bidi run so it doesn't get visually reordered
// on the Hebrew (RTL) site — e.g. "$ projects" rendering as "projects $"
// because the "$ " and the word after it are separate DOM nodes, and
// the browser's bidi algorithm orders separate same-direction runs
// according to the *surrounding* paragraph's direction. Positioning
// (which side it sits on) is still governed by the outer element —
// this only fixes the internal character order.
export function Ltr({ children, className, ...props }: LtrProps) {
  return (
    <span dir="ltr" className={className} {...props}>
      {children}
    </span>
  );
}
