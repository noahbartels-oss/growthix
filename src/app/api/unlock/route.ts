import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const { documentId, orderId } = await req.json();

    if (!documentId || !orderId) {
      return NextResponse.json({ error: "Fehlende Parameter" }, { status: 400 });
    }

    // Verify PayPal order is COMPLETED
    const base =
      process.env.PAYPAL_MODE === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const ppRes = await fetch(`${base}/v2/checkout/orders/${orderId}`, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!ppRes.ok) {
      return NextResponse.json({ error: "PayPal-Verifizierung fehlgeschlagen" }, { status: 400 });
    }

    const order = await ppRes.json();
    if (order.status !== "COMPLETED") {
      return NextResponse.json({ error: "Zahlung nicht abgeschlossen" }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from("documents")
      .update({ is_paid: true, paypal_order_id: orderId })
      .eq("id", documentId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "Fehler beim Freischalten" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unlock error:", err);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
