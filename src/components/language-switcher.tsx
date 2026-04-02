"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "de" ? "en" : "de";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <Button variant="ghost" size="sm" onClick={switchLocale} className="gap-1.5">
      <Globe className="h-4 w-4" />
      {locale === "de" ? "EN" : "DE"}
    </Button>
  );
}
