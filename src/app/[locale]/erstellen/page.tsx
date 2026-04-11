"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  situation: string;
  experience: string;
  skills: string;
  extra: string;
  company: string;
  position: string;
  jobDesc: string;
  motivation: string;
}

const initial: FormData = {
  name: "",
  situation: "employed",
  experience: "1-2",
  skills: "",
  extra: "",
  company: "",
  position: "",
  jobDesc: "",
  motivation: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem 0.9rem",
  borderRadius: "0.6rem",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "rgba(255,255,255,0.68)",
  marginBottom: "0.4rem",
};

export default function ErstellenPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function set(field: keyof FormData) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function goToStep2() {
    if (!form.name.trim() || !form.skills.trim()) {
      setError("Bitte fülle Name und Fähigkeiten aus.");
      return;
    }
    setError(null);
    setStep(2);
  }

  async function handleGenerate() {
    if (!form.company.trim() || !form.position.trim()) {
      setError("Bitte gib Unternehmen und Stelle an.");
      return;
    }
    setLoading(true);
    setError(null);

    let sessionId = localStorage.getItem("bki_session");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("bki_session", sessionId);
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sessionId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Fehler beim Generieren");
      router.push(`/ergebnis/${data.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus, textarea:focus, select:focus {
          border-color: rgba(167,139,250,0.5) !important;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
        }
        option { background: #1a1a2e; color: #fff; }
      `}</style>

      <div style={{ background: "#080810", minHeight: "100vh", color: "#fff", padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "540px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.25rem" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "#fff" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileText style={{ width: "14px", height: "14px", color: "#fff" }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>BewerbungsKI</span>
            </Link>
            {/* Progress dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: s <= step ? "22px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: s <= step ? "#a78bfa" : "rgba(255,255,255,0.14)",
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.38)" }}>
                Schritt {step}/2
              </span>
            </div>
          </div>

          {/* ── Step 1: Personal info ── */}
          {step === 1 && (
            <div>
              <h1 style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "0.35rem" }}>
                Deine Angaben
              </h1>
              <p style={{ color: "rgba(255,255,255,0.42)", marginBottom: "2rem", fontSize: "0.9rem" }}>
                Damit die KI einen individuellen Brief schreiben kann.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <label style={labelStyle}>Vollständiger Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="z. B. Max Mustermann"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Aktuelle Situation *</label>
                  <select value={form.situation} onChange={set("situation")} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                    <option value="employed">Berufstätig (Jobwechsel)</option>
                    <option value="student">Student / Studentin</option>
                    <option value="apprentice">Auszubildende / r</option>
                    <option value="seeking">Arbeitssuchend</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Berufserfahrung</label>
                  <select value={form.experience} onChange={set("experience")} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                    <option value="none">Keine Erfahrung</option>
                    <option value="1-2">1–2 Jahre</option>
                    <option value="3-5">3–5 Jahre</option>
                    <option value="5plus">Mehr als 5 Jahre</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Relevante Fähigkeiten & Kenntnisse *</label>
                  <textarea
                    value={form.skills}
                    onChange={set("skills")}
                    placeholder="z. B. Python, Projektmanagement, Kundenkommunikation, Excel ..."
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Was macht dich besonders?{" "}
                    <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    value={form.extra}
                    onChange={set("extra")}
                    placeholder="z. B. Ich habe ein eigenes Projekt geleitet, spreche 3 Sprachen ..."
                    rows={2}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
              </div>

              {error && (
                <p style={{ marginTop: "0.75rem", color: "#f87171", fontSize: "0.82rem" }}>{error}</p>
              )}

              <button
                onClick={goToStep2}
                style={{
                  marginTop: "2rem",
                  width: "100%",
                  padding: "0.875rem",
                  borderRadius: "0.75rem",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                Weiter <ArrowRight style={{ width: "16px", height: "16px" }} />
              </button>
            </div>
          )}

          {/* ── Step 2: Job info ── */}
          {step === 2 && (
            <div>
              <h1 style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "0.35rem" }}>
                Die Stelle
              </h1>
              <p style={{ color: "rgba(255,255,255,0.42)", marginBottom: "2rem", fontSize: "0.9rem" }}>
                Je mehr du angibst, desto besser wird der Brief.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <label style={labelStyle}>Unternehmen *</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={set("company")}
                    placeholder="z. B. SAP SE"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Stelle / Position *</label>
                  <input
                    type="text"
                    value={form.position}
                    onChange={set("position")}
                    placeholder="z. B. Junior Software Engineer"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Stellenbeschreibung{" "}
                    <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 400 }}>(optional, aber empfohlen)</span>
                  </label>
                  <textarea
                    value={form.jobDesc}
                    onChange={set("jobDesc")}
                    placeholder="Füge hier die Anforderungen aus der Stellenanzeige ein ..."
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Warum willst du diese Stelle?{" "}
                    <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    value={form.motivation}
                    onChange={set("motivation")}
                    placeholder="z. B. Ich interessiere mich für nachhaltige Technologien ..."
                    rows={2}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
              </div>

              {error && (
                <p style={{ marginTop: "0.75rem", color: "#f87171", fontSize: "0.82rem" }}>{error}</p>
              )}

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
                <button
                  onClick={() => { setStep(1); setError(null); }}
                  style={{
                    padding: "0.875rem 1.25rem",
                    borderRadius: "0.75rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <ArrowLeft style={{ width: "16px", height: "16px" }} /> Zurück
                </button>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "0.875rem",
                    borderRadius: "0.75rem",
                    background: loading
                      ? "rgba(124,58,237,0.45)"
                      : "linear-gradient(135deg, #7c3aed, #a855f7)",
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2
                        style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }}
                      />
                      KI schreibt deinen Brief ...
                    </>
                  ) : (
                    "Brief jetzt erstellen ✨"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
