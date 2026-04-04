"use client";

import { Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  const resend = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      await supabase.auth.resend({ type: "signup", email: user.email });
    }
    setLoading(false);
    setResent(true);
  };

  return (
    <div
      className="animate-fade-up rounded-2xl p-8 text-center"
      style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* icon */}
      <div
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <Mail className="h-6 w-6 text-white/70" />
      </div>

      <h1 className="font-syne text-xl font-700 text-white mb-2">E-Mail bestätigen</h1>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
        Wir haben dir einen Bestätigungslink geschickt.
        <br />
        Bitte öffne deine E-Mail und klicke auf den Link.
      </p>

      <div
        className="mt-6 rounded-xl px-4 py-3 text-xs text-left"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
      >
        Nach der Bestätigung wirst du automatisch ins Dashboard weitergeleitet.
      </div>

      <button
        onClick={resend}
        disabled={loading || resent}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-all"
        style={{
          background: resent ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: resent ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)",
          cursor: resent ? "default" : "pointer",
        }}
      >
        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        {resent ? "E-Mail erneut gesendet" : "E-Mail erneut senden"}
      </button>
    </div>
  );
}
