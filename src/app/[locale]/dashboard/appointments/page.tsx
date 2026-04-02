"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarCheck, Plus, Phone, Smartphone, Clock, Calendar } from "lucide-react";

type TabFilter = "upcoming" | "past" | "cancelled";

interface Appointment {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "done" | "cancelled";
  channel: "whatsapp" | "instagram";
}

const mockAppointments: Appointment[] = [
  { id: "1", customer: "Anna Schmidt",   service: "Haarschnitt",     date: "2026-04-02", time: "14:00", status: "confirmed", channel: "whatsapp"  },
  { id: "2", customer: "Lisa Braun",     service: "Färben & Schnitt", date: "2026-04-02", time: "16:00", status: "confirmed", channel: "whatsapp"  },
  { id: "3", customer: "Marco Rossi",    service: "Bart-Trimm",       date: "2026-04-03", time: "10:00", status: "pending",   channel: "instagram" },
  { id: "4", customer: "Julia Fischer",  service: "Balayage",         date: "2026-04-03", time: "11:30", status: "confirmed", channel: "whatsapp"  },
  { id: "5", customer: "Tom Müller",     service: "Haarschnitt",      date: "2026-04-04", time: "09:00", status: "pending",   channel: "whatsapp"  },
  { id: "6", customer: "Sarah Klein",    service: "Styling",          date: "2026-03-31", time: "15:00", status: "done",      channel: "whatsapp"  },
  { id: "7", customer: "David Wagner",   service: "Haarschnitt",      date: "2026-03-30", time: "10:00", status: "done",      channel: "instagram" },
  { id: "8", customer: "Marie Hoffmann", service: "Färben",           date: "2026-03-29", time: "14:00", status: "cancelled", channel: "whatsapp"  },
];

const statusConfig = {
  confirmed: { label: "Bestätigt",  bg: "bg-success/10",      text: "text-success",          dot: "bg-success"          },
  pending:   { label: "Ausstehend", bg: "bg-warning/10",      text: "text-warning",          dot: "bg-warning"          },
  done:      { label: "Erledigt",   bg: "bg-muted",           text: "text-muted-foreground", dot: "bg-muted-foreground" },
  cancelled: { label: "Storniert",  bg: "bg-destructive/10",  text: "text-destructive",      dot: "bg-destructive"      },
};

const avatarGradients = [
  "from-violet-400 to-purple-500",
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-amber-500",
  "from-pink-400 to-rose-500",
  "from-indigo-400 to-blue-500",
  "from-green-400 to-emerald-500",
  "from-red-400 to-pink-500",
];

export default function AppointmentsPage() {
  const t = useTranslations("appointments");
  const [tab, setTab] = useState<TabFilter>("upcoming");

  const filtered = mockAppointments.filter((apt) => {
    if (tab === "upcoming")  return apt.status === "confirmed" || apt.status === "pending";
    if (tab === "past")      return apt.status === "done";
    if (tab === "cancelled") return apt.status === "cancelled";
    return true;
  });

  const counts = {
    upcoming:  mockAppointments.filter(a => a.status === "confirmed" || a.status === "pending").length,
    past:      mockAppointments.filter(a => a.status === "done").length,
    cancelled: mockAppointments.filter(a => a.status === "cancelled").length,
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {counts.upcoming} anstehende Termine
          </p>
        </div>
        <Button className="gap-2 shadow-md shadow-primary/20 font-medium">
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

      {/* list */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card flex flex-col items-center justify-center py-20 text-muted-foreground">
          <CalendarCheck className="h-12 w-12 mb-4 opacity-20" />
          <p className="text-sm font-medium">{t("noAppointments")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((apt, i) => {
            const s = statusConfig[apt.status];
            const grad = avatarGradients[i % avatarGradients.length];
            return (
              <div
                key={apt.id}
                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card px-5 py-4 card-hover animate-fade-up"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {/* avatar */}
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarFallback className={`bg-gradient-to-br ${grad} text-white font-bold text-sm`}>
                    {apt.customer[0]}
                  </AvatarFallback>
                </Avatar>

                {/* main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{apt.customer}</p>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{apt.service}</p>
                </div>

                {/* date & time */}
                <div className="hidden sm:flex items-center gap-4 text-sm shrink-0">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-xs">{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm">{apt.time}</span>
                  </div>
                </div>

                {/* channel badge */}
                <div className={`shrink-0 flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                  apt.channel === "whatsapp"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-pink-500/10 text-pink-600"
                }`}>
                  {apt.channel === "whatsapp"
                    ? <Phone className="h-3 w-3" />
                    : <Smartphone className="h-3 w-3" />
                  }
                  <span className="hidden sm:inline">{apt.channel === "whatsapp" ? "WhatsApp" : "Instagram"}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
