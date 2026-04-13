import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en", "tr", "pl", "ru", "ar", "it", "ro", "sr", "uk"],
  defaultLocale: "de",
});

export type Locale = (typeof routing.locales)[number];
