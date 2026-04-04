"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2, Brain, Radio, User, Check, Phone, Smartphone,
  Crown, Copy, ExternalLink, X, Loader2, AlertCircle,
} from "lucide-react";

/* ── tiny reusable wrappers ── */
function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
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

/* ── types ── */
interface Channel { id: string; type: "whatsapp" | "instagram"; external_id: string; status: string; }

/* ── Modal: connect WhatsApp ── */
function WhatsAppModal({ onClose, onConnected }: { onClose: () => void; onConnected: (ch: Channel) => void }) {
  const [phone, setPhone] = useState("");
  const [step, setStep]   = useState<"form" | "webhook">("form");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const webhookUrl = typeof window !== "undefined" ? `${window.location.origin}/api/webhooks/twilio` : "";

  const save = async () => {
    if (!phone.trim()) { setErr("Bitte gib deine WhatsApp-Nummer ein."); return; }
    setSaving(true);
    setErr("");
    const res = await fetch("/api/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "whatsapp", external_id: phone.trim() }),
    });
    const data = await res.json();
    if (!res.ok) { setErr(data.error ?? "Fehler"); setSaving(false); return; }
    onConnected(data);
    setStep("webhook");
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-md rounded-2xl bg-card border border-border/60 p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>

        {step === "form" ? (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                <Phone className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-syne font-700 text-base">WhatsApp verbinden</h3>
                <p className="text-xs text-muted-foreground">Via Twilio WhatsApp Business</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Deine WhatsApp-Nummer</Label>
                <Input
                  placeholder="+49 151 12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Hint>Die Nummer, über die deine Kunden dir schreiben (mit Ländervorwahl)</Hint>
              </div>

              {err && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {err}
                </div>
              )}

              {/* Requirements */}
              <div className="rounded-xl bg-muted/30 border border-border/40 p-4 space-y-2">
                <p className="text-xs font-medium text-foreground">Voraussetzungen:</p>
                {[
                  "Twilio-Konto (kostenlos starten auf twilio.com)",
                  "WhatsApp Sandbox oder eigene WhatsApp Business-Nummer",
                  "Webhook-URL in Twilio eingetragen (nächster Schritt)",
                ].map((req) => (
                  <div key={req} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                    {req}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={onClose} variant="outline" className="flex-1">Abbrechen</Button>
                <Button onClick={save} disabled={saving} className="flex-1 gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Speichern & weiter
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-syne font-700 text-base">Nummer gespeichert!</h3>
                <p className="text-xs text-muted-foreground">Jetzt Twilio konfigurieren</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Trage jetzt diese Webhook-URL in deinem Twilio-Dashboard ein unter:<br />
                <span className="text-foreground font-medium">Messaging → Sandbox settings → When a message comes in</span>
              </p>

              <div className="flex items-center gap-2 bg-muted/30 border border-border/50 rounded-xl px-4 py-3">
                <code className="text-xs text-primary flex-1 break-all">{webhookUrl}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(webhookUrl)}
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <a
                href="https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Twilio Sandbox öffnen
                </Button>
              </a>

              <Button onClick={onClose} className="w-full">Fertig</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Modal: connect Instagram ── */
function InstagramModal({ onClose, onConnected }: { onClose: () => void; onConnected: (ch: Channel) => void }) {
  const [handle, setHandle]  = useState("");
  const [token, setToken]    = useState("");
  const [step, setStep]      = useState<"form" | "done">("form");
  const [saving, setSaving]  = useState(false);
  const [err, setErr]        = useState("");

  const save = async () => {
    if (!handle.trim()) { setErr("Bitte gib deinen Instagram-Handle ein."); return; }
    setSaving(true);
    setErr("");
    const res = await fetch("/api/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "instagram", external_id: handle.trim().replace(/^@/, ""), access_token: token.trim() || undefined }),
    });
    const data = await res.json();
    if (!res.ok) { setErr(data.error ?? "Fehler"); setSaving(false); return; }
    onConnected(data);
    setStep("done");
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-md rounded-2xl bg-card border border-border/60 p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>

        {step === "form" ? (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(219,39,119,0.1)" }}>
                <Smartphone className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-syne font-700 text-base">Instagram verbinden</h3>
                <p className="text-xs text-muted-foreground">Via Meta Instagram Graph API</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Instagram Business Handle</Label>
                <Input
                  placeholder="@dein_business"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
                <Hint>Dein Instagram Business- oder Creator-Account</Hint>
              </div>

              <div>
                <Label>
                  Access Token{" "}
                  <span className="text-muted-foreground font-normal">(optional, für automatisches Antworten)</span>
                </Label>
                <Input
                  type="password"
                  placeholder="EAAxxxx..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
                <Hint>
                  Bekommst du im{" "}
                  <a
                    href="https://developers.facebook.com/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Meta Developer Portal
                  </a>
                  {" "}unter deiner App → Instagram → Access Token
                </Hint>
              </div>

              {/* Requirements */}
              <div className="rounded-xl bg-muted/30 border border-border/40 p-4 space-y-2">
                <p className="text-xs font-medium text-foreground">Voraussetzungen:</p>
                {[
                  "Instagram Business- oder Creator-Account",
                  "Facebook-Seite, die mit Instagram verknüpft ist",
                  "Meta Developer App mit instagram_manage_messages-Berechtigung",
                ].map((req) => (
                  <div key={req} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                    {req}
                  </div>
                ))}
              </div>

              {err && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {err}
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={onClose} variant="outline" className="flex-1">Abbrechen</Button>
                <Button onClick={save} disabled={saving} className="flex-1 gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Verbinden
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(219,39,119,0.1)" }}>
                <Check className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-syne font-700 text-base">Instagram verbunden!</h3>
                <p className="text-xs text-muted-foreground">@{handle.replace(/^@/, "")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Dein Instagram-Account ist gespeichert. Sobald dein Access Token aktiv ist, beantwortet die KI automatisch alle eingehenden Nachrichten.
            </p>
            <Button onClick={onClose} className="w-full">Fertig</Button>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Settings Page ── */
export default function SettingsPage() {
  const t  = useTranslations("settings");
  const tc = useTranslations("common");

  // business form state — all empty by default
  const [name,         setName]         = useState("");
  const [type,         setType]         = useState("other");
  const [address,      setAddress]      = useState("");
  const [phone,        setPhone]        = useState("");
  const [email,        setEmail]        = useState("");
  const [aiPrompt,     setAiPrompt]     = useState("");
  const [services,     setServices]     = useState("");
  const [plan,         setPlan]         = useState("trial");

  const [loadingData,  setLoadingData]  = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [saved,        setSaved]        = useState(false);
  const [saveError,    setSaveError]    = useState("");

  const [channels,     setChannels]     = useState<Channel[]>([]);
  const [showWA,       setShowWA]       = useState(false);
  const [showIG,       setShowIG]       = useState(false);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  // Load settings + channels
  useEffect(() => {
    (async () => {
      const [settingsRes, channelsRes] = await Promise.all([
        fetch("/api/settings"),
        fetch("/api/channels"),
      ]);
      if (settingsRes.ok) {
        const d = await settingsRes.json();
        if (d.name)      setName(d.name);
        if (d.type)      setType(d.type);
        if (d.address)   setAddress(d.address ?? "");
        if (d.phone)     setPhone(d.phone ?? "");
        if (d.email)     setEmail(d.email ?? "");
        if (d.ai_prompt) setAiPrompt(d.ai_prompt ?? "");
        if (d.services)  setServices(d.services ?? "");
        if (d.subscription_status) setPlan(d.subscription_status);
      }
      if (channelsRes.ok) {
        const ch = await channelsRes.json();
        setChannels(ch);
      }
      setLoadingData(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, address, phone, email, ai_prompt: aiPrompt, services }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      const d = await res.json();
      setSaveError(d.error ?? "Fehler beim Speichern");
    }
  };

  const disconnect = async (id: string) => {
    setDisconnecting(id);
    await fetch(`/api/channels/${id}`, { method: "DELETE" });
    setChannels((prev) => prev.filter((c) => c.id !== id));
    setDisconnecting(null);
  };

  const waChannel = channels.find((c) => c.type === "whatsapp");
  const igChannel = channels.find((c) => c.type === "instagram");

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
              <Input
                placeholder="Salon Schön"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label>{t("business.type")}</Label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {(["hair_salon", "beauty_studio", "coaching", "other"] as const).map((tp) => (
                  <option key={tp} value={tp}>{t(`business.types.${tp}`)}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label>{t("business.address")}</Label>
            <Input
              placeholder="Musterstraße 1, 10115 Berlin"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>{t("business.phone")}</Label>
              <Input
                placeholder="+49 30 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label>{t("business.email")}</Label>
              <Input
                type="email"
                placeholder="info@example.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {saveError && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {saveError}
            </div>
          )}

          <Button onClick={handleSave} disabled={saving} className="gap-2 shadow-md shadow-primary/20">
            {saving   ? <><Loader2 className="h-4 w-4 animate-spin" /> Speichern...</>
           : saved    ? <><Check className="h-4 w-4" /> Gespeichert!</>
           : tc("save")}
          </Button>
        </div>
      </Section>

      {/* ── AI Config ── */}
      <Section icon={Brain} title={t("ai.title")}>
        <div className="space-y-4">
          <div>
            <Label>{t("ai.personality")}</Label>
            <Textarea
              placeholder="Du bist ein freundlicher Assistent für mein Business. Dein Ziel ist es, Termine zu vereinbaren und kurz und klar zu antworten."
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
              placeholder={"Haarschnitt - 35€\nFärben - 60€\nBalayage - 90€"}
              value={services}
              onChange={(e) => setServices(e.target.value)}
              rows={6}
              className="text-sm font-mono resize-none"
            />
            <Hint>{t("ai.servicesHelp")}</Hint>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2 shadow-md shadow-primary/20">
            {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Speichern...</>
           : saved  ? <><Check className="h-4 w-4" /> Gespeichert!</>
           : tc("save")}
          </Button>
        </div>
      </Section>

      {/* ── Channels ── */}
      <Section icon={Radio} title={t("channels.title")}>
        <div className="space-y-3">

          {/* WhatsApp */}
          <div className={`flex items-center justify-between rounded-xl border p-4 gap-3 ${waChannel ? "border-green-500/30 bg-green-500/5" : "border-dashed border-border bg-muted/10"}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 shrink-0">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">WhatsApp</p>
                {waChannel
                  ? <p className="text-xs text-muted-foreground">{waChannel.external_id}</p>
                  : <p className="text-xs text-muted-foreground">{t("channels.notConnected")}</p>
                }
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {waChannel ? (
                <>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    {t("channels.connected")}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    disabled={disconnecting === waChannel.id}
                    onClick={() => disconnect(waChannel.id)}
                  >
                    {disconnecting === waChannel.id ? <Loader2 className="h-3 w-3 animate-spin" /> : t("channels.disconnect")}
                  </Button>
                </>
              ) : (
                <Button size="sm" className="gap-1.5 text-xs h-8 shrink-0 bg-green-600 hover:bg-green-600/90 text-white shadow-md" onClick={() => setShowWA(true)}>
                  <Phone className="h-3 w-3" />
                  {t("channels.connect")}
                </Button>
              )}
            </div>
          </div>

          {/* Instagram */}
          <div className={`flex items-center justify-between rounded-xl border p-4 gap-3 ${igChannel ? "border-pink-500/30 bg-pink-500/5" : "border-dashed border-border bg-muted/10"}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 shrink-0">
                <Smartphone className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Instagram</p>
                {igChannel
                  ? <p className="text-xs text-muted-foreground">@{igChannel.external_id}</p>
                  : <p className="text-xs text-muted-foreground">{t("channels.notConnected")}</p>
                }
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {igChannel ? (
                <>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    {t("channels.connected")}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    disabled={disconnecting === igChannel.id}
                    onClick={() => disconnect(igChannel.id)}
                  >
                    {disconnecting === igChannel.id ? <Loader2 className="h-3 w-3 animate-spin" /> : t("channels.disconnect")}
                  </Button>
                </>
              ) : (
                <Button size="sm" className="gap-1.5 text-xs h-8 shrink-0 shadow-md shadow-primary/20" onClick={() => setShowIG(true)}>
                  <Smartphone className="h-3 w-3" />
                  {t("channels.connect")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Account / Plan ── */}
      <Section icon={User} title={t("account.title")}>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/10 to-violet-500/5 border border-primary/20 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Crown className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm capitalize">
                  {t("account.plan")}: <span className="text-primary">{plan}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {plan === "trial" ? "7-Tage-Test · danach ab 49€/Monat" : plan === "starter" ? "49€/Monat · Starter" : "79€/Monat · Pro"}
                </p>
              </div>
            </div>
            {plan !== "pro" && (
              <Link href="/dashboard/billing">
                <Button size="sm" className="gap-1.5 text-xs h-8 shrink-0 shadow-md shadow-primary/20">
                  <Crown className="h-3 w-3" />
                  {t("account.upgrade")}
                </Button>
              </Link>
            )}
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

      {/* Modals */}
      {showWA && (
        <WhatsAppModal
          onClose={() => setShowWA(false)}
          onConnected={(ch) => {
            setChannels((prev) => [...prev.filter((c) => c.type !== "whatsapp"), ch]);
            setShowWA(false);
          }}
        />
      )}
      {showIG && (
        <InstagramModal
          onClose={() => setShowIG(false)}
          onConnected={(ch) => {
            setChannels((prev) => [...prev.filter((c) => c.type !== "instagram"), ch]);
            setShowIG(false);
          }}
        />
      )}
    </div>
  );
}
