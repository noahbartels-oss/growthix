"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Plus, Phone, Smartphone } from "lucide-react";
import { Link } from "@/i18n/navigation";

type TabFilter = "upcoming" | "past" | "cancelled";

export default function AppointmentsPage() {
  const t = useTranslations("appointments");
  const [tab, setTab] = useState<TabFilter>("upcoming");

  const counts = { upcoming: 0, past: 0, cancelled: 0 };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            0 anstehende Termine
          </p>
        </div>
        <Button className="gap-2 shadow-md shadow-primary/20 font-medium" disabled>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">{t("newAppointment")}</span>
        </Button>
      </div>

      {/* tabs */}
      <div className="flex gap-1 bg-muted/50 rounded-xl p-1 w-fit">
        {(["upcoming", "past", "cancelled"] as TabFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setTab(f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === f
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(f)}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              tab === f ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            }`}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* empty state */}
      <div className="rounded-2xl border border-border/60 bg-card p-12 flex flex-col items-center text-center text-muted-foreground">
        <CalendarCheck className="h-12 w-12 mb-4 opacity-20" />
        <p className="text-sm font-medium mb-1">Noch keine Termine</p>
        <p className="text-xs opacity-60 max-w-xs leading-relaxed">
          Sobald die KI über WhatsApp oder Instagram einen Termin bucht, erscheint er hier automatisch.
        </p>
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-500/90 text-white text-sm font-medium px-4 py-2 transition-colors"
          >
            <Phone className="h-4 w-4" />
            WhatsApp verbinden
          </Link>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white text-sm font-medium px-4 py-2 transition-opacity"
          >
            <Smartphone className="h-4 w-4" />
            Instagram verbinden
          </Link>
        </div>
      </div>
    </div>
  );
}
