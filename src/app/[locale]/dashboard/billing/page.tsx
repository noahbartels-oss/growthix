import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import { Zap, CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";
import { PricingCards } from "@/components/paypal/pricing-cards";

const planFeatures = {
  starter: ["1 WhatsApp-Nummer", "500 AI-Antworten/Monat", "Terminbuchung", "Basis-Analytik", "E-Mail-Support"],
  pro: ["2 WhatsApp-Nummern", "Unbegrenzte AI-Antworten", "Instagram Integration", "Erweiterte Analytik", "Prioritäts-Support", "Eigenes AI-Training"],
};

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: business } = await supabase
    .from("businesses")
    .select("plan, subscription_status, subscription_id, trial_ends_at, subscription_starts_at")
    .eq("user_id", user.id)
    .single();

  const status = (business?.subscription_status ?? "trial") as "trial" | "active" | "cancelled" | "expired";
  const plan   = business?.plan ?? "trial";
  const trialEnds = business?.trial_ends_at ? new Date(business.trial_ends_at) : null;
  const daysLeft  = trialEnds ? Math.max(0, Math.ceil((trialEnds.getTime() - Date.now()) / 86400000)) : 0;

  const statusMap: Record<string, { icon: React.ElementType; color: string; label: string }> = {
    trial:     { icon: Clock,        color: "text-warning",     label: `Trial — noch ${daysLeft} Tage` },
    active:    { icon: CheckCircle,  color: "text-primary",     label: "Aktiv"      },
    cancelled: { icon: XCircle,      color: "text-destructive", label: "Gekündigt"  },
    expired:   { icon: XCircle,      color: "text-destructive", label: "Abgelaufen" },
  };
  const statusConfig = statusMap[status] ?? { icon: Clock, color: "text-warning", label: status };

  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-syne text-2xl font-700">Abonnement</h1>
        <p className="text-muted-foreground text-sm mt-1">Verwalte deinen Plan und deine Zahlungen</p>
      </div>

      {/* Current plan status */}
      <div className="rounded-xl border border-border/60 bg-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-syne font-700 capitalize">
                {plan === "trial" ? "Trial" : `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`}
              </p>
              <p className="text-sm text-muted-foreground">
                {plan === "starter" ? "49€/Monat" : plan === "pro" ? "79€/Monat" : "Kostenlos"}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-medium ${statusConfig.color}`}>
            <StatusIcon className="h-4 w-4" />
            {statusConfig.label}
          </div>
        </div>

        {status === "trial" && daysLeft <= 3 && (
          <div className="mt-4 rounded-lg bg-warning/10 border border-warning/20 px-4 py-3 text-sm text-warning">
            <Zap className="inline h-3.5 w-3.5 mr-1" />
            Dein Trial endet in {daysLeft} {daysLeft === 1 ? "Tag" : "Tagen"}. Wähle jetzt einen Plan um weiterzumachen.
          </div>
        )}

        {status === "cancelled" && (
          <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
            Dein Abo wurde gekündigt. Wähle einen neuen Plan um wieder loszulegen.
          </div>
        )}

        {business?.subscription_id && (
          <p className="mt-4 font-jetbrains text-xs text-muted-foreground">
            Subscription ID: {business.subscription_id}
          </p>
        )}
      </div>

      {/* Show pricing cards if not active */}
      {status !== "active" && (
        <div>
          <h2 className="font-syne text-lg font-700 mb-6">Plan wählen</h2>
          <PricingCards
            starterFeatures={planFeatures.starter}
            proFeatures={planFeatures.pro}
            ctaText="Starter wählen"
            starterName="Starter"
            starterDesc="Perfekt für den Einstieg"
            proName="Pro"
            proDesc="Für wachsende Businesses"
            proBadge="Beliebt"
          />
        </div>
      )}

      {/* PayPal manage link for active subs */}
      {status === "active" && (
        <div className="rounded-xl border border-border/60 bg-card p-6">
          <h3 className="font-syne font-700 mb-2">Abo verwalten</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Kündigung oder Änderungen direkt über dein PayPal-Konto.
          </p>
          <a
            href="https://www.paypal.com/myaccount/autopay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
          >
            PayPal Autopay öffnen →
          </a>
        </div>
      )}
    </div>
  );
}
