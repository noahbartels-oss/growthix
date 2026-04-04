"use client";

import { PayPalSubscribeButton } from "./subscribe-button";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="grid gap-5 md:grid-cols-2 items-start max-w-2xl mx-auto">

      {/* Starter */}
      <div className="rounded-2xl border border-white/8 bg-white/4 p-7 flex flex-col hover:border-white/15 transition-colors">
        <div>
          <h3 className="font-syne text-lg font-700 text-white">{starterName}</h3>
          <p className="mt-1 text-sm text-white/50">{starterDesc}</p>
          <div className="flex items-end gap-1 my-6">
            <span className="font-syne text-5xl font-800 text-white">49€</span>
            <span className="text-white/40 pb-1.5 text-sm">/Monat</span>
          </div>
        </div>
        <ul className="space-y-2.5 mb-8 flex-1">
          {starterFeatures.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/60">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8">
                <Check className="h-2.5 w-2.5 text-white/60" />
              </div>
              {f}
            </li>
          ))}
        </ul>
        {hasPayPal ? (
          <PayPalSubscribeButton plan="starter" planId={starterPlanId} />
        ) : (
          <Link href="/register">
            <Button variant="outline" className="w-full h-11 rounded-xl font-medium border-white/15 text-white hover:bg-white/8 hover:border-white/25">
              {ctaText}
            </Button>
          </Link>
        )}
      </div>

      {/* Pro — featured */}
      <div className="relative rounded-2xl border border-violet-500/40 bg-white/5 p-7 flex flex-col shadow-xl shadow-violet-900/20 hover:border-violet-500/60 transition-colors">
        {/* featured badge */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-1 text-xs font-semibold text-white shadow-lg">
            {proBadge}
          </span>
        </div>
        <div>
          <h3 className="font-syne text-lg font-700 text-white">{proName}</h3>
          <p className="mt-1 text-sm text-white/50">{proDesc}</p>
          <div className="flex items-end gap-1 my-6">
            <span className="font-syne text-5xl font-800 text-white">79€</span>
            <span className="text-white/40 pb-1.5 text-sm">/Monat</span>
          </div>
        </div>
        <ul className="space-y-2.5 mb-8 flex-1">
          {proFeatures.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/70">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/15">
                <Check className="h-2.5 w-2.5 text-violet-300" />
              </div>
              {f}
            </li>
          ))}
        </ul>
        {hasPayPal ? (
          <PayPalSubscribeButton plan="pro" planId={proPlanId} />
        ) : (
          <Link href="/register">
            <Button className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-500/90 hover:to-purple-600/90 text-white shadow-lg shadow-violet-900/30">
              7 Tage kostenlos starten
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
