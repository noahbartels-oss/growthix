"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  MessageCircle,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

const stats = [
  { key: "totalConversations", icon: MessageSquare, value: "248", change: "+12%" },
  { key: "activeConversations", icon: MessageCircle, value: "18", change: "+3" },
  { key: "appointmentsBooked", icon: CalendarCheck, value: "64", change: "+8%" },
  { key: "responseRate", icon: TrendingUp, value: "98%", change: "+2%" },
] as const;

const recentConversations = [
  { name: "Anna Schmidt", message: "Ich möchte einen Termin buchen", channel: "WhatsApp", time: "vor 5 Min." },
  { name: "Max Weber", message: "Was kostet ein Haarschnitt?", channel: "Instagram", time: "vor 12 Min." },
  { name: "Julia Fischer", message: "Danke für den tollen Service!", channel: "WhatsApp", time: "vor 30 Min." },
  { name: "Tom Müller", message: "Haben Sie morgen noch Termine frei?", channel: "WhatsApp", time: "vor 1 Std." },
];

const upcomingAppointments = [
  { customer: "Anna Schmidt", service: "Haarschnitt", date: "Heute", time: "14:00" },
  { customer: "Lisa Braun", service: "Färben", date: "Heute", time: "16:00" },
  { customer: "Marco Rossi", service: "Bart-Trimm", date: "Morgen", time: "10:00" },
];

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{t("welcome")} 👋</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.key}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t(`stats.${stat.key}`)}
                  </p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="mt-2 text-xs text-success font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Conversations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("recentConversations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentConversations.map((conv) => (
                <div
                  key={conv.name}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">
                    {conv.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conv.message}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${
                      conv.channel === "WhatsApp"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-pink-500/10 text-pink-600"
                    }`}
                  >
                    {conv.channel}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("upcomingAppointments")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((apt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0">
                    {apt.customer[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{apt.customer}</p>
                    <p className="text-xs text-muted-foreground">{apt.service}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium">{apt.time}</p>
                    <p className="text-xs text-muted-foreground">{apt.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
