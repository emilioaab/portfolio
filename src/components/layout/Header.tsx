import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export function Header() {
  return (
    <header className="flex items-center justify-end gap-3 px-6 py-5 sm:px-10">
      <LocaleSwitcher />
    </header>
  );
}