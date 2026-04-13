"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "pl", label: "Polski" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
  { code: "it", label: "Italiano" },
  { code: "ro", label: "Română" },
  { code: "sr", label: "Srpski" },
  { code: "uk", label: "Українська" },
];

export function LanguageSwitcher() {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function switchLocale(code: string) {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/"));
    setOpen(false);
  }

  const current = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.35rem",
          padding: "0.35rem 0.65rem", borderRadius: "999px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", fontWeight: 500,
          cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
      >
        <Globe style={{ width: "13px", height: "13px" }} />
        {current.code.toUpperCase()}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "#13131f", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "0.625rem", minWidth: "130px", zIndex: 100,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "0.5rem 0.875rem", fontSize: "0.82rem",
                color: lang.code === locale ? "var(--primary)" : "rgba(255,255,255,0.7)",
                background: lang.code === locale ? "rgba(0,230,118,0.07)" : "transparent",
                border: "none", cursor: "pointer", fontFamily: "inherit",
                fontWeight: lang.code === locale ? 600 : 400,
                transition: "background 0.1s",
              }}
              onMouseEnter={e => { if (lang.code !== locale) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { if (lang.code !== locale) e.currentTarget.style.background = "transparent"; }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
