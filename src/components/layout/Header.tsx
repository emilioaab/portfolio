"use client";

import { cn } from "@/lib/utils";
import { useScrolled } from "@/lib/use-scrolled";
import { Nav } from "@/components/layout/Nav";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export function Header() {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-end gap-3 px-6 py-5 transition-colors duration-200 sm:px-10",
        scrolled && "border-b border-border bg-background/80 backdrop-blur-md",
      )}
    >
      <Nav />
      <LocaleSwitcher />
    </header>
  );
}
