"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Search, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Channel = "all" | "whatsapp";

export default function ConversationsPage() {
  const t = useTranslations("conversations");
  const [filter, setFilter] = useState<Channel>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-4 -m-4 sm:-m-6 p-0">

      {/* ── Conversation list ─────────────────────────── */}
      <div className="flex flex-col bg-card border-r border-border/50 w-full md:w-72 lg:w-80 shrink-0">
        {/* header */}
        <div className="px-4 pt-5 pb-3 border-b border-border/50 space-y-3">
          <h2 className="text-base font-semibold">{t("title")}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="pl-8 h-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* filter tabs */}
          <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
            {(["all", "whatsapp"] as Channel[]).map((ch) => (
              <button
                key={ch}
                onClick={() => setFilter(ch)}
                className={`flex-1 text-xs py-1 rounded-md font-medium transition-all ${
                  filter === ch
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(ch)}
              </button>
            ))}
          </div>
        </div>

        {/* empty state */}
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground px-6 text-center">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-5 w-5 opacity-40" />
          </div>
          <p className="text-sm font-medium">Noch keine Gespräche</p>
          <p className="text-xs mt-1 opacity-60 leading-relaxed">
            Verbinde WhatsApp um Nachrichten zu empfangen.
          </p>
          <div className="flex flex-col gap-2 mt-5 w-full">
            <Link
              href="/dashboard/settings"
              className="flex items-center justify-center gap-2 rounded-lg bg-green-500 hover:bg-green-500/90 text-white text-xs font-medium px-3 py-2 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              WhatsApp verbinden
            </Link>
          </div>
        </div>
      </div>

      {/* ── Placeholder chat area ────────────────────── */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20 text-muted-foreground text-center px-8">
        <div>
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Search className="h-7 w-7 opacity-30" />
          </div>
          <p className="text-sm font-medium">Gespräch auswählen</p>
          <p className="text-xs mt-1 opacity-60">Sobald Nachrichten eingehen, erscheinen sie hier</p>
        </div>
      </div>
    </div>
  );
}
