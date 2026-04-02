"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2, Brain, Radio, User, Check, Phone,
  Smartphone, ExternalLink, Zap, Crown,
} from "lucide-react";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border/50 bg-muted/20">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium mb-1.5">{children}</label>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground mt-1.5">{children}</p>;
}

export default function SettingsPage() {
  const t  = useTranslations("settings");
  const tc = useTranslations("common");

  const [businessName, setBusinessName] = useState("Salon Schön");
  const [businessType, setBusinessType] = useState("hair_salon");
  const [address,      setAddress]      = useState("Musterstraße 12, 10115 Berlin");
  const [phone,        setPhone]        = useState("+49 30 1234567");
  const [email,        setEmail]        = useState("info@salon-schoen.de");
  const [saved,        setSaved]        = useState(false);

  const [aiPrompt, setAiPrompt] = useState(
    "Du bist ein freundlicher Assistent für ein lokales Business.\nZiel: Termine vereinbaren, kurz und klar antworten.\nWenn möglich, schlage konkrete Zeiten vor."
  );
  const [services, setServices] = useState(
    "Haarschnitt - 35€\nFärben - 60€\nBalayage - 90€\nBart-Trimm - 15€\nStyling - 25€"
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Verwalte dein Business und die KI-Konfiguration</p>
      </div>

      {/* ── Business Profile ── */}
      <Section icon={Building2} title={t("business.title")}>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>{t("business.name")}</Label>
              <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            </div>
            <div>
              <Label>{t("business.type")}</Label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {(["hair_salon", "beauty_studio", "coaching", "other"] as const).map((type) => (
                  <option key={type} value={type}>{t(`business.types.${type}`)}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label>{t("business.address")}</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>{t("business.phone")}</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <Label>{t("business.email")}</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2 shadow-md shadow-primary/20">
            {saved ? <><Check className="h-4 w-4" /> Gespeichert!</> : tc("save")}
          </Button>
        </div>
      </Section>

      {/* ── AI Config ── */}
      <Section icon={Brain} title={t("ai.title")}>
        <div className="space-y-4">
          <div>
            <Label>{t("ai.personality")}</Label>
            <Textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={4}
              className="text-sm resize-none"
            />
            <Hint>{t("ai.personalityHelp")}</Hint>
          </div>
          <div>
            <Label>{t("ai.services")}</Label>
            <Textarea
              value={services}
              onChange={(e) => setServices(e.target.value)}
              rows={6}
              className="text-sm font-mono resize-none"
            />
            <Hint>{t("ai.servicesHelp")}</Hint>
          </div>
          <Button onClick={handleSave} className="gap-2 shadow-md shadow-primary/20">
            {saved ? <><Check className="h-4 w-4" /> Gespeichert!</> : tc("save")}
          </Button>
        </div>
      </Section>

      {/* ── Channels ── */}
      <Section icon={Radio} title={t("channels.title")}>
        <div className="space-y-3">
          {/* WhatsApp */}
          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 shrink-0">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">WhatsApp</p>
                <p className="text-xs text-muted-foreground">+49 151 9999000</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                {t("channels.connected")}
              </span>
              <Button variant="outline" size="sm" className="text-xs h-8">
                {t("channels.disconnect")}
              </Button>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/10 p-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 shrink-0">
                <Smartphone className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Instagram</p>
                <p className="text-xs text-muted-foreground">{t("channels.notConnected")}</p>
              </div>
            </div>
            <Button size="sm" className="gap-1.5 text-xs h-8 shrink-0 shadow-md shadow-primary/20">
              <ExternalLink className="h-3 w-3" />
              {t("channels.connect")}
            </Button>
          </div>
        </div>
      </Section>

      {/* ── Account ── */}
      <Section icon={User} title={t("account.title")}>
        <div className="space-y-4">
          {/* current plan */}
          <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/10 to-violet-500/5 border border-primary/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{t("account.plan")}: <span className="text-primary">Starter</span></p>
                <p className="text-xs text-muted-foreground">49 €/Monat · 500 AI-Antworten</p>
              </div>
            </div>
            <Button size="sm" className="gap-1.5 text-xs h-8 shrink-0 shadow-md shadow-primary/20">
              <Crown className="h-3 w-3" />
              {t("account.upgrade")}
            </Button>
          </div>

          <div className="border-t border-border/50 pt-4">
            <p className="text-xs text-muted-foreground mb-3">
              Konto löschen entfernt alle deine Daten dauerhaft.
            </p>
            <Button variant="destructive" size="sm" className="text-xs">
              {t("account.deleteAccount")}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
