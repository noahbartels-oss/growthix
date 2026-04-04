"use client";

import { PayPalSubscribeButton } from "./subscribe-button";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";

interface PricingCardsProps {
  starterFeatures: string[];
  proFeatures: string[];
  ctaText: string;
  starterName: string;
  starterDesc: string;
  proName: string;
  proDesc: string;
  proBadge: string;
}

export function PricingCards({
  starterFeatures, proFeatures, ctaText,
  starterName, starterDesc, proName, proDesc, proBadge,
}: PricingCardsProps) {
  const starterPlanId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_STARTER ?? "";
  const proPlanId    = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID_PRO ?? "";
  const hasPayPal = Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && starterPlanId && proPlanId);

  const cardBase: React.CSSProperties = {
    background: "#13131f",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "1rem",
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column",
  };

  const btnBase: React.CSSProperties = {
    width: "100%",
    padding: "0.65rem",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.15s",
    marginTop: "auto",
  };

  return (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", maxWidth: "760px", margin: "0 auto" }}>

      {/* Starter */}
      <div style={cardBase}>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.25rem" }}>{starterName}</p>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: "1.25rem" }}>{starterDesc}</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2.5rem", color: "#fff", lineHeight: 1 }}>49€</span>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", paddingBottom: "0.35rem" }}>/Monat</span>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
          {starterFeatures.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                <Check style={{ width: 8, height: 8, color: "rgba(255,255,255,0.5)" }} />
              </span>
              {f}
            </li>
          ))}
        </ul>
        {hasPayPal ? (
          <PayPalSubscribeButton plan="starter" planId={starterPlanId} />
        ) : (
          <Link href="/register" style={{ display: "block" }}>
            <button style={{ ...btnBase, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}>
              {ctaText}
            </button>
          </Link>
        )}
      </div>

      {/* Pro — featured, matches reference "Premium" highlight */}
      <div style={{ ...cardBase, border: "1px solid rgba(139,92,246,0.45)", background: "#16142a", position: "relative" }}>
        <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #7c3aed, #9333ea)", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 14px", borderRadius: "999px", whiteSpace: "nowrap" }}>
          {proBadge}
        </div>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.25rem" }}>{proName}</p>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: "1.25rem" }}>{proDesc}</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2.5rem", color: "#fff", lineHeight: 1 }}>79€</span>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", paddingBottom: "0.35rem" }}>/Monat</span>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
          {proFeatures.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "1px solid rgba(139,92,246,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px", background: "rgba(139,92,246,0.12)" }}>
                <Check style={{ width: 8, height: 8, color: "#a78bfa" }} />
              </span>
              {f}
            </li>
          ))}
        </ul>
        {hasPayPal ? (
          <PayPalSubscribeButton plan="pro" planId={proPlanId} />
        ) : (
          <Link href="/register" style={{ display: "block" }}>
            <button style={{ ...btnBase, background: "linear-gradient(135deg, #7c3aed, #9333ea)", color: "#fff", border: "none" }}>
              7 Tage kostenlos starten
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
