"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  MessageSquare,
  MessageCircle,
  CalendarCheck,
  TrendingUp,
  ArrowRight,
  Brain,
  Clock,
  Smartphone,
  Phone,
} from "lucide-react";

const stats = [
  { key: "totalConversations",   icon: MessageSquare,  value: "0",   gradient: "from-violet-500 to-purple-600"  },
  { key: "activeConversations",  icon: MessageCircle,  value: "0",   gradient: "from-blue-500 to-cyan-600"      },
  { key: "appointmentsBooked",   icon: CalendarCheck,  value: "0",   gradient: "from-emerald-500 to-teal-600"   },
  { key: "responseRate",         icon: TrendingUp,     value: "—",   gradient: "from-orange-500 to-amber-600"   },
] as const;

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("welcome")} 👋</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Hier ist ein Überblick deines Businesses heute.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border/60 rounded-xl px-3 py-2">
          <Clock className="h-4 w-4" />
          {new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="relative rounded-2xl bg-card border border-border/60 p-5 overflow-hidden"
          >
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient}`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {t(`stats.${stat.key}`)}
                </p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">Noch keine Daten</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg opacity-40`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connect channels banner */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Verbinde deinen ersten Kanal</p>
            <p className="text-sm text-muted-foreground mt-1">
              Schließe WhatsApp oder Instagram an — danach beantwortet die KI automatisch alle Nachrichten und bucht Termine für dich.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
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
      </div>

      {/* Two columns */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Recent Conversations */}
        <div className="rounded-2xl bg-card border border-border/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
            <h2 className="font-semibold text-sm">{t("recentConversations")}</h2>
            <Link
              href="/dashboard/conversations"
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Alle <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mb-3 opacity-20" />
            <p className="text-sm">Noch keine Gespräche</p>
            <p className="text-xs mt-1 opacity-60">Verbinde einen Kanal um loszulegen</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="rounded-2xl bg-card border border-border/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
            <h2 className="font-semibold text-sm">{t("upcomingAppointments")}</h2>
            <Link
              href="/dashboard/appointments"
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Alle <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <CalendarCheck className="h-8 w-8 mb-3 opacity-20" />
            <p className="text-sm">Noch keine Termine</p>
            <p className="text-xs mt-1 opacity-60">Termine werden automatisch per KI gebucht</p>
          </div>
        </div>
      </div>
    </div>
  );
}
