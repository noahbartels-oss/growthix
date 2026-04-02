"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarCheck, Plus } from "lucide-react";

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
  { id: "1", customer: "Anna Schmidt", service: "Haarschnitt", date: "2026-04-02", time: "14:00", status: "confirmed", channel: "whatsapp" },
  { id: "2", customer: "Lisa Braun", service: "Färben & Schnitt", date: "2026-04-02", time: "16:00", status: "confirmed", channel: "whatsapp" },
  { id: "3", customer: "Marco Rossi", service: "Bart-Trimm", date: "2026-04-03", time: "10:00", status: "pending", channel: "instagram" },
  { id: "4", customer: "Julia Fischer", service: "Balayage", date: "2026-04-03", time: "11:30", status: "confirmed", channel: "whatsapp" },
  { id: "5", customer: "Tom Müller", service: "Haarschnitt", date: "2026-04-04", time: "09:00", status: "pending", channel: "whatsapp" },
  { id: "6", customer: "Sarah Klein", service: "Styling", date: "2026-03-31", time: "15:00", status: "done", channel: "whatsapp" },
  { id: "7", customer: "David Wagner", service: "Haarschnitt", date: "2026-03-30", time: "10:00", status: "done", channel: "instagram" },
  { id: "8", customer: "Marie Hoffmann", service: "Färben", date: "2026-03-29", time: "14:00", status: "cancelled", channel: "whatsapp" },
];

export default function AppointmentsPage() {
  const t = useTranslations("appointments");
  const [tab, setTab] = useState<TabFilter>("upcoming");

  const filtered = mockAppointments.filter((apt) => {
    if (tab === "upcoming") return apt.status === "confirmed" || apt.status === "pending";
    if (tab === "past") return apt.status === "done";
    if (tab === "cancelled") return apt.status === "cancelled";
    return true;
  });

  const statusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "secondary";
      case "done":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("newAppointment")}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        {(["upcoming", "past", "cancelled"] as TabFilter[]).map((f) => (
          <Button
            key={f}
            variant={tab === f ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab(f)}
          >
            {t(f)}
          </Button>
        ))}
      </div>

      {/* Appointment list */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <CalendarCheck className="h-12 w-12 mb-4 opacity-50" />
            <p>{t("noAppointments")}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filtered.map((apt) => (
            <Card key={apt.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {apt.customer[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{apt.customer}</p>
                    <Badge
                      variant={statusColor(apt.status) as "default" | "secondary" | "destructive" | "outline" | "success"}
                    >
                      {t(apt.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {apt.service}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-medium">{apt.time}</p>
                  <p className="text-sm text-muted-foreground">{apt.date}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`shrink-0 ${
                    apt.channel === "whatsapp"
                      ? "text-green-600 border-green-200"
                      : "text-pink-600 border-pink-200"
                  }`}
                >
                  {apt.channel === "whatsapp" ? "WhatsApp" : "Instagram"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
