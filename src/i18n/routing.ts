import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "he"],
  defaultLocale: "en",
});

export const rtlLocales: ReadonlyArray<(typeof routing.locales)[number]> = ["he"];

export type Locale = (typeof routing.locales)[number];
