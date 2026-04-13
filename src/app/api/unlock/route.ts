import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const UUID_RE    = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ORDERID_RE = /^[A-Z0-9]{17}$/; // PayPal order IDs are 17 uppercase alphanumeric chars

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const documentId = typeof body.documentId === "string" ? body.documentId.trim() : "";
    const orderId    = typeof body.orderId    === "string" ? body.orderId.trim()    : "";

    if (!documentId || !orderId) {
      return NextResponse.json({ error: "Fehlende Parameter" }, { status: 400 });
    }
    if (!UUID_RE.test(documentId)) {
      return NextResponse.json({ error: "Ungültige Dokument-ID" }, { status: 400 });
    }
    if (!ORDERID_RE.test(orderId)) {
      return NextResponse.json({ error: "Ungültige Order-ID" }, { status: 400 });
    }

    /* ── Verify with PayPal ── */
    const base =
      process.env.PAYPAL_MODE === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const ppRes = await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!ppRes.ok) {
      return NextResponse.json({ error: "PayPal-Verifizierung fehlgeschlagen" }, { status: 400 });
    }

    const order = await ppRes.json();
    if (order.status !== "COMPLETED") {
      return NextResponse.json({ error: "Zahlung nicht abgeschlossen" }, { status: 400 });
    }

    /* ── Check order not already used ── */
    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from("documents")
      .select("id")
      .eq("paypal_order_id", orderId)
      .single();

    if (existing) {
      return NextResponse.json({ error: "Order bereits verwendet" }, { status: 409 });
    }

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
