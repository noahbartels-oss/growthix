"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";

interface PayPalOrderButtonProps {
  documentId: string;
  onSuccess: () => void;
  amount?: string;
}

export function PayPalOrderButton({
  documentId,
  onSuccess,
  amount = "6.99",
}: PayPalOrderButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  if (!clientId) {
    return (
      <div
        style={{
          padding: "0.875rem",
          borderRadius: "0.5rem",
          background: "rgba(0,0,0,0.05)",
          border: "1px solid #ddd",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#888", fontSize: "0.85rem" }}>
          Zahlung momentan nicht verfügbar. Bitte kontaktiere uns.
        </p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <p
          style={{
            color: "#dc2626",
            fontSize: "0.8rem",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
      <PayPalScriptProvider
        options={{
          clientId,
          currency: "EUR",
          intent: "capture",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", shape: "pill", color: "gold", height: 48 }}
          disabled={loading}
          createOrder={(_data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: { value: amount, currency_code: "EUR" },
                  description: "BewerbungsKI – Bewerbungsschreiben freischalten",
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            setLoading(true);
            try {
              await actions.order?.capture();

              const res = await fetch("/api/unlock", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ documentId, orderId: data.orderID }),
              });

              if (!res.ok) throw new Error("Freischalten fehlgeschlagen");
              onSuccess();
            } catch {
              setError("Freischalten fehlgeschlagen. Bitte kontaktiere den Support.");
            } finally {
              setLoading(false);
            }
          }}
          onError={() => setError("PayPal-Fehler. Bitte erneut versuchen.")}
        />
      </PayPalScriptProvider>
    </div>
  );
}
