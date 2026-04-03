import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const eventType: string = body.event_type;
  const subscriptionID: string = body.resource?.id ?? body.resource?.billing_agreement_id;

  if (!subscriptionID) return NextResponse.json({ ok: true });

  const supabase = await createClient();

  switch (eventType) {
    case "BILLING.SUBSCRIPTION.ACTIVATED":
      await supabase
        .from("businesses")
        .update({ subscription_status: "active", updated_at: new Date().toISOString() })
        .eq("subscription_id", subscriptionID);
      break;

    case "BILLING.SUBSCRIPTION.CANCELLED":
    case "BILLING.SUBSCRIPTION.EXPIRED":
      await supabase
        .from("businesses")
        .update({
          subscription_status: eventType.includes("CANCEL") ? "cancelled" : "expired",
          plan: "trial",
          updated_at: new Date().toISOString(),
        })
        .eq("subscription_id", subscriptionID);
      break;

    case "PAYMENT.SALE.DENIED":
    case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
      // Could send email here — for now just log
      console.warn("PayPal payment failed for subscription:", subscriptionID);
      break;
  }

  return NextResponse.json({ ok: true });
}
