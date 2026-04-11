"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FileText, Download, Lock, CheckCircle } from "lucide-react";
import { PayPalOrderButton } from "@/components/paypal/order-button";

interface DocData {
  id: string;
  inputData: Record<string, string>;
  preview: string | null;
  content: string | null;
  isPaid: boolean;
}

export default function ErgebnisPage() {
  const params              = useParams();
  const id                  = params?.id as string;
  const [doc, setDoc]       = useState<DocData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);
  const [justPaid, setJustPaid] = useState(false);

  async function fetchDoc() {
    const res  = await fetch(`/api/documents/${id}`);
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

  const isPaid      = doc?.isPaid || justPaid;
  const displayText = isPaid ? doc?.content : doc?.preview;

  /* ── Loading ── */
  if (loading) {
    return (
      <div
        style={{ background: "#080810", minHeight: "100vh", color: "#fff" }}
        className="flex items-center justify-center flex-col gap-5"
      >
        <div className="typing-indicator">
          <span /><span /><span />
        </div>
        <p className="font-jetbrains text-xs text-white/35 tracking-widest uppercase">
          Brief wird geladen …
        </p>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div
        style={{ background: "#080810", minHeight: "100vh", color: "#fff" }}
        className="flex items-center justify-center flex-col gap-4 p-8 text-center"
      >
        <p className="text-sm" style={{ color: "var(--destructive)" }}>Fehler: {error}</p>
        <Link href="/erstellen" className="text-sm" style={{ color: "var(--primary)" }}>
          ← Neuen Brief erstellen
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .print-doc {
            background: #fff !important;
            color: #111 !important;
            font-family: 'Georgia', 'Times New Roman', serif !important;
            font-size: 11.5pt !important;
            line-height: 1.8 !important;
            padding: 2.5cm !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div style={{ background: "#080810", minHeight: "100vh", color: "#fff" }}>

        {/* ── Navbar ── */}
        <header
          className="no-print sticky top-0 z-50 backdrop-blur-xl"
          style={{
            background: "rgba(8,8,16,0.92)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "0 1.5rem",
          }}
        >
          <div
            className="mx-auto flex h-14 max-w-4xl items-center justify-between"
          >
            <Link
              href="/"
              className="flex items-center gap-2"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(0,230,118,0.12)",
                  border: "1px solid rgba(0,230,118,0.25)",
                }}
              >
                <FileText className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
              </div>
              <span className="font-syne font-bold text-sm tracking-tight">BewerbungsKI</span>
            </Link>

            {isPaid && (
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "var(--primary)", color: "#080810" }}
              >
                <Download className="h-3.5 w-3.5" /> Als PDF herunterladen
              </button>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 pb-20">

          {/* ── Success banner ── */}
          {justPaid && (
            <div
              className="no-print flex items-start gap-3 mb-6 rounded-xl p-4"
              style={{
                background: "rgba(0,230,118,0.07)",
                border: "1px solid rgba(0,230,118,0.2)",
              }}
            >
              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
              <div>
                <p className="font-syne font-bold text-sm" style={{ color: "var(--primary)" }}>
                  Zahlung erfolgreich – Brief freigeschaltet!
                </p>
                <p className="font-jetbrains text-xs text-white/40 mt-0.5 tracking-wide">
                  Klicke oben auf „Als PDF herunterladen" oder drucke direkt.
                </p>
              </div>
            </div>
          )}

          {/* ── Document card ── */}
          <div
            className="print-doc relative overflow-hidden"
            style={{
              background: "#FAFAF8",  /* warm paper white */
              color: "#1a1a1a",
              borderRadius: "0.875rem",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              lineHeight: 1.82,
              fontSize: "0.95rem",
              minHeight: "520px",
            }}
          >
            {/* Document header accent */}
            <div
              className="no-print"
              style={{
                height: "3px",
                background: "linear-gradient(90deg, var(--primary) 0%, rgba(0,230,118,0.3) 100%)",
                borderRadius: "0.875rem 0.875rem 0 0",
              }}
            />

            {/* Letter content */}
            <div
              style={{
                padding: "clamp(1.75rem, 5vw, 3.5rem)",
                whiteSpace: "pre-wrap",
              }}
            >
              {displayText}
              {!isPaid && <div style={{ height: "240px" }} />}
            </div>

            {/* ── Paywall overlay ── */}
            {!isPaid && (
              <div
                className="no-print"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "64%",
                  /* Smooth fade from paper white */
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(250,250,248,0.97) 36%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "2rem 1.5rem 2.5rem",
                  zIndex: 10,
                }}
              >
                {/* Paywall card */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: "360px",
                    background: "#fff",
                    border: "1px solid #e8e5e0",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    textAlign: "center",
                    fontFamily: "'Manrope', system-ui, sans-serif",
                  }}
                >
                  {/* Lock icon */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.875rem",
                    }}
                  >
                    <Lock style={{ width: "18px", height: "18px", color: "#333" }} />
                  </div>

                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      color: "#111",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Brief freischalten
                  </p>
                  <p style={{ color: "#666", fontSize: "0.82rem", lineHeight: 1.55, marginBottom: "1.25rem" }}>
                    Einmalig <strong style={{ color: "#111" }}>7 €</strong> — vollständig als PDF herunterladen.
                    Kein Abo, keine weiteren Kosten.
                  </p>

                  <PayPalOrderButton documentId={id} onSuccess={handlePaymentSuccess} />

                  <p
                    style={{
                      marginTop: "0.6rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.67rem",
                      color: "#aaa",
                      letterSpacing: "0.05em",
                    }}
                  >
                    SICHER ÜBER PAYPAL · SOFORTIGER ZUGRIFF
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Post-document actions ── */}
          <div className="no-print mt-5 flex items-center justify-center gap-3 flex-wrap">
            {isPaid ? (
              <>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "var(--primary)", color: "#080810" }}
                >
                  <Download className="h-4 w-4" /> Als PDF herunterladen
                </button>
                <Link href="/erstellen">
                  <button
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/[0.08]"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    Neuen Brief erstellen
                  </button>
                </Link>
              </>
            ) : (
              <Link
                href="/erstellen"
                className="font-jetbrains text-[11px] tracking-wide uppercase"
                style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none" }}
              >
                ← Neuen Brief erstellen
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
