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
    <div className="grid gap-8 md:grid-cols-2 items-start">
      {/* Starter */}
      <div className="rounded-xl border border-border/60 bg-card p-8 card-hover">
        <h3 className="font-syne text-xl font-700">{starterName}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{starterDesc}</p>
        <div className="flex items-end gap-1 my-6">
          <span className="font-syne text-5xl font-800">49€</span>
          <span className="text-muted-foreground pb-1">/Monat</span>
        </div>
        <ul className="space-y-3 mb-8">
          {starterFeatures.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-3 w-3 text-primary" />
              </div>
              {f}
            </li>
          ))}
        </ul>
        {hasPayPal ? (
          <PayPalSubscribeButton plan="starter" planId={starterPlanId} />
        ) : (
          <Link href="/register">
            <Button variant="outline" className="w-full h-11 font-medium border-border/60 hover:border-primary/40">
              {ctaText}
            </Button>
          </Link>
        )}
      </div>

      {/* Pro */}
      <div className="relative p-[1.5px] rounded-xl bg-gradient-to-br from-primary/80 via-primary to-primary/60 shadow-xl shadow-primary/15 card-hover">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="font-jetbrains inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-1 text-[10px] font-500 text-primary-foreground tracking-wider uppercase shadow-md">
            {proBadge}
          </span>
        </div>
        <div className="rounded-xl bg-card p-8">
          <h3 className="font-syne text-xl font-700">{proName}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{proDesc}</p>
          <div className="flex items-end gap-1 my-6">
            <span className="font-syne text-5xl font-800">79€</span>
            <span className="text-muted-foreground pb-1">/Monat</span>
          </div>
          <ul className="space-y-3 mb-8">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                {f}
              </li>
            ))}
          </ul>
          {hasPayPal ? (
            <PayPalSubscribeButton plan="pro" planId={proPlanId} />
          ) : (
            <Link href="/register">
              <Button className="w-full h-11 font-semibold bg-cta hover:bg-cta/90 text-white shadow-md shadow-orange-600/20">
                7 Tage kostenlos starten
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
