"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Building2, ArrowRight, Check, Star } from "lucide-react";

const perks = [
  "7 Tage kostenlos",
  "Keine Kreditkarte",
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

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "0.75rem",
    padding: "0.65rem 0.875rem 0.65rem 2.5rem",
    color: "#fff",
    fontSize: "0.875rem",
    outline: "none",
  } as React.CSSProperties;

  return (
    <div className="animate-fade-up rounded-2xl p-8" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* header */}
      <div className="text-center mb-6">
        <h1 className="font-syne text-2xl font-700 text-white">{t("registerTitle")}</h1>
        <p className="mt-1.5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Konto erstellen und erste KI-Antwort starten</p>
        {/* star rating */}
        <div className="flex items-center justify-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
          <span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.4)" }}>4,9 · 500+ Businesses</span>
        </div>
      </div>

      {/* perks */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {perks.map((p) => (
          <span key={p} className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            <Check className="h-3 w-3" style={{ color: "rgba(255,255,255,0.5)" }} />{p}
          </span>
        ))}
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(255,67,58,0.1)", border: "1px solid rgba(255,67,58,0.25)", color: "#ff453a" }}>
            {error}
          </div>
        )}

        {/* Business name */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white/70">{t("businessName")}</label>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Optional</span>
          </div>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input
              type="text"
              placeholder="Salon Schön"
              style={inputStyle}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/70">{t("email")}</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input
              type="email"
              placeholder="name@example.com"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/70">{t("password")}</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Mindestens 6 Zeichen</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-[#080810] transition-all hover:opacity-90 mt-2"
          style={{ background: "#ffffff" }}
        >
          {loading ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black/60 animate-spin" />
              Konto erstellen...
            </>
          ) : (
            <>
              {t("registerButton")}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-5 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        {t("hasAccount")}{" "}
        <Link href="/login" className="font-semibold text-white hover:opacity-80 transition-opacity">
          {t("loginButton")}
        </Link>
      </p>
    </div>
  );
}
