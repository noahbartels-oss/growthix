"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Building2, Brain, Radio, User } from "lucide-react";

export default function SettingsPage() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");

  const [businessName, setBusinessName] = useState("Salon Schön");
  const [businessType, setBusinessType] = useState("hair_salon");
  const [address, setAddress] = useState("Musterstraße 12, 10115 Berlin");
  const [phone, setPhone] = useState("+49 30 1234567");
  const [email, setEmail] = useState("info@salon-schoen.de");

  const [aiPrompt, setAiPrompt] = useState(
    t("ai.defaultPrompt")
  );
  const [services, setServices] = useState(
    "Haarschnitt - 35€\nFärben - 60€\nBalayage - 90€\nBart-Trimm - 15€\nStyling - 25€"
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5" />
            {t("business.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("business.name")}</label>
              <Input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("business.type")}</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                {(["hair_salon", "beauty_studio", "coaching", "other"] as const).map(
                  (type) => (
                    <option key={type} value={type}>
                      {t(`business.types.${type}`)}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("business.address")}</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("business.phone")}</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("business.email")}</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <Button>{tc("save")}</Button>
        </CardContent>
      </Card>

      {/* AI Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5" />
            {t("ai.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("ai.personality")}</label>
            <p className="text-xs text-muted-foreground">{t("ai.personalityHelp")}</p>
            <Textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("ai.services")}</label>
            <p className="text-xs text-muted-foreground">{t("ai.servicesHelp")}</p>
            <Textarea
              value={services}
              onChange={(e) => setServices(e.target.value)}
              rows={6}
            />
          </div>
          <Button>{tc("save")}</Button>
        </CardContent>
      </Card>

      {/* Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Radio className="h-5 w-5" />
            {t("channels.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <span className="text-green-600 font-bold text-sm">WA</span>
              </div>
              <div>
                <p className="font-medium">{t("channels.whatsapp")}</p>
                <p className="text-sm text-muted-foreground">+49 151 9999000</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">{t("channels.connected")}</Badge>
              <Button variant="outline" size="sm">
                {t("channels.disconnect")}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10">
                <span className="text-pink-600 font-bold text-sm">IG</span>
              </div>
              <div>
                <p className="font-medium">{t("channels.instagram")}</p>
                <p className="text-sm text-muted-foreground">{t("channels.notConnected")}</p>
              </div>
            </div>
            <Button size="sm">{t("channels.connect")}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5" />
            {t("account.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("account.plan")}</p>
              <p className="text-sm text-muted-foreground">Starter - 49/mo</p>
            </div>
            <Button variant="outline">{t("account.upgrade")}</Button>
          </div>
          <div className="border-t pt-4">
            <Button variant="destructive" size="sm">
              {t("account.deleteAccount")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
