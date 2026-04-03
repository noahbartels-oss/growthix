import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { subscriptionID, plan } = await req.json();

  if (!subscriptionID || !plan) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Verify subscription with PayPal
  const verified = await verifyPayPalSubscription(subscriptionID);
  if (!verified) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("businesses")
    .update({
      plan,
      subscription_id: subscriptionID,
      subscription_status: "active",
      subscription_starts_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function verifyPayPalSubscription(subscriptionID: string): Promise<boolean> {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_CLIENT_SECRET;
    if (!clientId || !secret) return false;

    const base = process.env.PAYPAL_MODE === "live"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

    // Get access token
    const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const { access_token } = await tokenRes.json();

    // Check subscription status
    const subRes = await fetch(`${base}/v1/billing/subscriptions/${subscriptionID}`, {
      headers: { "Authorization": `Bearer ${access_token}` },
    });
    const sub = await subRes.json();

    return sub.status === "ACTIVE";
  } catch {
    return false;
  }
}
