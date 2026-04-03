"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

interface SubscribeButtonProps {
  plan: "starter" | "pro";
  planId: string;
}

export function PayPalSubscribeButton({ plan, planId }: SubscribeButtonProps) {
  const router = useRouter();
  const [error, setError] = useState("");

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) return null;

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        vault: true,
        intent: "subscription",
        currency: "EUR",
      }}
    >
      {error && (
        <p className="text-xs text-destructive mb-2 text-center">{error}</p>
      )}
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "subscribe" }}
        createSubscription={(_data, actions) =>
          actions.subscription.create({ plan_id: planId })
        }
        onApprove={async (data) => {
          setError("");
          const res = await fetch("/api/paypal/activate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subscriptionID: data.subscriptionID,
              plan,
            }),
          });
          if (res.ok) {
            router.push("/dashboard?subscribed=1");
          } else {
            setError("Fehler beim Aktivieren. Bitte support kontaktieren.");
          }
        }}
        onError={() => setError("PayPal Fehler. Bitte erneut versuchen.")}
      />
    </PayPalScriptProvider>
  );
}
