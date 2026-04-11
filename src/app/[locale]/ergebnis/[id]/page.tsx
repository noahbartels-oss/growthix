"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FileText, Download, Lock, CheckCircle, Loader2 } from "lucide-react";
import { PayPalOrderButton } from "@/components/paypal/order-button";

interface DocData {
  id: string;
  inputData: Record<string, string>;
  preview: string | null;
  content: string | null;
  isPaid: boolean;
}

export default function ErgebnisPage() {
  const params = useParams();
  const id = params?.id as string;

  const [doc, setDoc] = useState<DocData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [justPaid, setJustPaid] = useState(false);

  async function fetchDoc() {
    const res = await fetch(`/api/documents/${id}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data as DocData;
  }

  useEffect(() => {
    if (!id) return;
    fetchDoc()
      .then(setDoc)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handlePaymentSuccess() {
    const data = await fetchDoc();
    setDoc(data);
    setJustPaid(true);
  }

  const isPaid = doc?.isPaid || justPaid;
  const displayText = isPaid ? doc?.content : doc?.preview;

  if (loading) {
    return (
      <div
        style={{
          background: "#080810",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Loader2
          style={{ width: "32px", height: "32px", color: "#a78bfa", animation: "spin 1s linear infinite" }}
        />
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>Brief wird geladen ...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "#080810",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p style={{ color: "#f87171" }}>Fehler: {error}</p>
        <Link href="/erstellen" style={{ color: "#a78bfa", fontSize: "0.9rem" }}>
          ← Neuen Brief erstellen
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .print-doc {
            background: #fff !important;
            color: #111 !important;
            font-family: 'Times New Roman', Georgia, serif !important;
            font-size: 11.5pt !important;
            line-height: 1.75 !important;
            padding: 2.5cm !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
        }
      `}</style>

      <div style={{ background: "#080810", minHeight: "100vh", color: "#fff" }}>

        {/* Navbar */}
        <header
          className="no-print"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "#fff" }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "7px",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText style={{ width: "13px", height: "13px", color: "#fff" }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>BewerbungsKI</span>
            </Link>

            {isPaid && (
              <button
                onClick={() => window.print()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.45rem 1.1rem",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "#fff",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <Download style={{ width: "13px", height: "13px" }} />
                Als PDF herunterladen
              </button>
            )}
          </div>
        </header>

        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

          {/* Success banner */}
          {justPaid && (
            <div
              className="no-print"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                padding: "0.875rem 1.25rem",
                borderRadius: "0.75rem",
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.22)",
                marginBottom: "1.5rem",
              }}
            >
              <CheckCircle style={{ width: "18px", height: "18px", color: "#4ade80", flexShrink: 0, marginTop: "1px" }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#4ade80" }}>
                  Zahlung erfolgreich – Brief freigeschaltet!
                </p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.42)", marginTop: "0.15rem" }}>
                  Drucke ihn als PDF oder kopiere den Text.
                </p>
              </div>
            </div>
          )}

          {/* Document card */}
          <div
            className="print-doc"
            style={{
              background: "#fff",
              color: "#1a1a1a",
              borderRadius: "0.75rem",
              padding: "clamp(1.75rem, 5vw, 3rem)",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              lineHeight: 1.8,
              fontSize: "0.95rem",
              position: "relative",
              overflow: "hidden",
              minHeight: "500px",
            }}
          >
            {/* Paywall overlay */}
            {!isPaid && (
              <div
                className="no-print"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "62%",
                  background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.98) 38%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "2rem 1.5rem 2.5rem",
                  zIndex: 10,
                }}
              >
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.75rem",
                    }}
                  >
                    <Lock style={{ width: "20px", height: "20px", color: "#7c3aed" }} />
                  </div>
                  <p
                    style={{
                      color: "#111",
                      fontWeight: 800,
                      fontSize: "1.15rem",
                      marginBottom: "0.35rem",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Brief freischalten
                  </p>
                  <p style={{ color: "#555", fontSize: "0.85rem", fontFamily: "sans-serif", lineHeight: 1.5 }}>
                    Einmalig <strong>7 €</strong> — sofort vollständig als PDF herunterladen
                  </p>
                </div>

                <div style={{ width: "100%", maxWidth: "300px" }}>
                  <PayPalOrderButton documentId={id} onSuccess={handlePaymentSuccess} />
                </div>

                <p
                  style={{
                    marginTop: "0.6rem",
                    fontSize: "0.7rem",
                    color: "#999",
                    fontFamily: "sans-serif",
                  }}
                >
                  Sicher über PayPal · Sofortiger Zugriff
                </p>
              </div>
            )}

            {/* Letter text */}
            <div style={{ whiteSpace: "pre-wrap" }}>
              {displayText}
              {!isPaid && <div style={{ height: "220px" }} />}
            </div>
          </div>

          {/* Below-card actions */}
          <div
            className="no-print"
            style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}
          >
            {isPaid ? (
              <>
                <button
                  onClick={() => window.print()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.5rem",
                    borderRadius: "0.75rem",
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  <Download style={{ width: "15px", height: "15px" }} />
                  Als PDF herunterladen
                </button>
                <Link href="/erstellen">
                  <button
                    style={{
                      padding: "0.7rem 1.5rem",
                      borderRadius: "0.75rem",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.65)",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Neuen Brief erstellen
                  </button>
                </Link>
              </>
            ) : (
              <Link href="/erstellen" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", textDecoration: "none" }}>
                ← Neuen Brief erstellen
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
