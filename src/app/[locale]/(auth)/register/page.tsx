"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Zap, Mail, Lock, Building2, ArrowRight, Check } from "lucide-react";

const perks = [
  "14 Tage kostenlos testen",
  "Keine Kreditkarte nötig",
  "Jederzeit kündbar",
];

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { business_name: businessName } },
    });
    if (error) { setError(error.message); setLoading(false); }
    else router.push("/dashboard");
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-[#F7F6FF] shadow-2xl shadow-black/40 p-8 animate-fade-up">
      {/* header */}
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
          <Zap className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="font-syne text-2xl font-700 text-[#0D0C18]">{t("registerTitle")}</h1>
        <p className="mt-1.5 text-sm text-[#6B6894]">{t("registerSubtitle")}</p>
      </div>

      {/* perks */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {perks.map((p) => (
          <span key={p} className="flex items-center gap-1.5 text-xs text-[#6B6894]">
            <Check className="h-3 w-3 text-primary" />{p}
          </span>
        ))}
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-destructive/8 border border-destructive/20 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#0D0C18]">{t("businessName")}</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6894]" />
            <Input
              type="text"
              placeholder="Salon Schön"
              className="pl-9 bg-white border-[#D4D2E8] text-[#0D0C18] placeholder:text-[#A8A6C0] focus-visible:ring-primary"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#0D0C18]">{t("email")}</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6894]" />
            <Input
              type="email"
              placeholder="name@example.com"
              className="pl-9 bg-white border-[#D4D2E8] text-[#0D0C18] placeholder:text-[#A8A6C0] focus-visible:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#0D0C18]">{t("password")}</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6894]" />
            <Input
              type="password"
              className="pl-9 bg-white border-[#D4D2E8] text-[#0D0C18] focus-visible:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <p className="text-xs text-[#6B6894]">Mindestens 6 Zeichen</p>
        </div>

        <Button
          type="submit"
          className="w-full h-11 font-semibold gap-2 bg-cta hover:bg-cta/90 text-white shadow-lg shadow-orange-600/20 mt-2"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Konto erstellen...
            </span>
          ) : (
            <>
              {t("registerButton")}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[#6B6894]">
        {t("hasAccount")}{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          {t("loginButton")}
        </Link>
      </p>
    </div>
  );
}
