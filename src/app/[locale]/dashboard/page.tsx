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
} from "lucide-react";

const stats = [
  { key: "totalConversations",   icon: MessageSquare,  value: "248", change: "+12%", gradient: "from-violet-500 to-purple-600"  },
  { key: "activeConversations",  icon: MessageCircle,  value: "18",  change: "+3",   gradient: "from-blue-500 to-cyan-600"      },
  { key: "appointmentsBooked",   icon: CalendarCheck,  value: "64",  change: "+8%",  gradient: "from-emerald-500 to-teal-600"   },
  { key: "responseRate",         icon: TrendingUp,     value: "98%", change: "+2%",  gradient: "from-orange-500 to-amber-600"   },
] as const;

const recentConversations = [
  { name: "Anna Schmidt",  message: "Ich möchte einen Termin buchen",      channel: "WhatsApp", time: "vor 5 Min.",  unread: true  },
  { name: "Max Weber",     message: "Was kostet ein Haarschnitt?",          channel: "Instagram",time: "vor 12 Min.", unread: true  },
  { name: "Julia Fischer", message: "Danke für den tollen Service!",        channel: "WhatsApp", time: "vor 30 Min.", unread: false },
  { name: "Tom Müller",    message: "Haben Sie morgen noch Termine frei?",  channel: "WhatsApp", time: "vor 1 Std.", unread: false },
];

const upcomingAppointments = [
  { customer: "Anna Schmidt", service: "Haarschnitt",  date: "Heute",   time: "14:00", status: "confirmed" },
  { customer: "Lisa Braun",   service: "Färben",        date: "Heute",   time: "16:00", status: "confirmed" },
  { customer: "Marco Rossi",  service: "Bart-Trimm",    date: "Morgen",  time: "10:00", status: "pending"   },
];

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
            className="relative rounded-2xl bg-card border border-border/60 p-5 overflow-hidden card-hover"
          >
            {/* gradient top bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient}`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {t(`stats.${stat.key}`)}
                </p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-success">{stat.change} diese Woche</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Activity Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-violet-500/5 to-transparent border border-primary/20 p-4 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">KI ist aktiv</p>
          <p className="text-xs text-muted-foreground">
            Heute wurden <span className="font-semibold text-foreground">47 Nachrichten</span> automatisch beantwortet · <span className="font-semibold text-foreground">8 Termine</span> gebucht
          </p>
        </div>
        <div className="shrink-0 h-2 w-2 rounded-full bg-success animate-pulse" />
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
          <div className="divide-y divide-border/40">
            {recentConversations.map((conv) => (
              <div
                key={conv.name}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 text-primary text-sm font-bold">
                  {conv.name[0]}
                  {conv.unread && (
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm truncate ${conv.unread ? "font-semibold" : "font-medium"}`}>
                      {conv.name}
                    </p>
                    <span className="text-[11px] text-muted-foreground shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.message}</p>
                </div>
                <span
                  className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    conv.channel === "WhatsApp"
                      ? "bg-green-500/10 text-green-600"
                      : "bg-pink-500/10 text-pink-600"
                  }`}
                >
                  {conv.channel === "WhatsApp" ? "WA" : "IG"}
                </span>
              </div>
            ))}
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
          <div className="divide-y divide-border/40">
            {upcomingAppointments.map((apt) => (
              <div
                key={apt.customer}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 text-emerald-600 text-sm font-bold">
                  {apt.customer[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{apt.customer}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{apt.service}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">{apt.time}</p>
                  <p className="text-[11px] text-muted-foreground">{apt.date}</p>
                </div>
                <span
                  className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    apt.status === "confirmed"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {apt.status === "confirmed" ? "✓ OK" : "Ausstehend"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
