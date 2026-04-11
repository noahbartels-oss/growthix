"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowRight, ArrowLeft } from "lucide-react";

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

/* ─── Shared input styles — minimal bottom-border aesthetic ── */
const baseInput: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 0,
  color: "#fff",
  fontSize: "0.95rem",
  padding: "0.55rem 0",
  outline: "none",
  fontFamily: "'Manrope', system-ui, sans-serif",
  transition: "border-color 0.2s",
};

const baseTextarea: React.CSSProperties = {
  ...baseInput,
  resize: "vertical",
  minHeight: "70px",
  borderBottom: "1px solid rgba(255,255,255,0.18)",
};

const baseLabel: React.CSSProperties = {
  display: "block",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.67rem",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.4)",
  marginBottom: "0.35rem",
};

export default function ErstellenPage() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState<FormData>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const router = useRouter();

  function set(field: keyof FormData) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function goNext() {
    if (!form.name.trim() || !form.skills.trim()) {
      setError("Bitte fülle Name und Fähigkeiten aus.");
      return;
    }
    setError(null);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function generate() {
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
      const res  = await fetch("/api/generate", {
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
        .bki-input:focus { border-bottom-color: var(--primary) !important; }
        .bki-input::placeholder { color: rgba(255,255,255,0.22); }
        .bki-input option { background: #13131f; color: #fff; }
        @keyframes bki-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div
        className="mesh-bg"
        style={{ background: "#080810", minHeight: "100vh", color: "#fff", padding: "2rem 1rem" }}
      >
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div className="flex items-center justify-between mb-10">
            <Link
              href="/"
              className="flex items-center gap-2 no-underline"
              style={{ color: "#fff", textDecoration: "none" }}
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

            {/* Progress indicator */}
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-jetbrains text-[10px] text-white/35 tracking-widest uppercase">
                Schritt {step} / 2
              </span>
              <div
                className="relative h-[2px] rounded-full overflow-hidden"
                style={{ width: "80px", background: "rgba(255,255,255,0.1)" }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: step === 1 ? "50%" : "100%",
                    background: "var(--primary)",
                    borderRadius: "1px",
                    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Glass card ── */}
          <div
            className="glass"
            style={{ borderRadius: "1.25rem", padding: "2.25rem 2rem" }}
          >

            {/* ─── STEP 1: Personal info ─── */}
            {step === 1 && (
              <div className="animate-fade-in">
                <p className="font-jetbrains text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--primary)" }}>
                  Schritt 01
                </p>
                <h1 className="font-syne font-black text-white text-2xl mb-1">Deine Angaben</h1>
                <p className="text-sm text-white/40 mb-8 font-manrope">
                  Damit die KI einen individuellen Brief schreiben kann.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

                  <div>
                    <label style={baseLabel}>Vollständiger Name *</label>
                    <input
                      className="bki-input"
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Max Mustermann"
                      style={baseInput}
                    />
                  </div>

                  <div>
                    <label style={baseLabel}>Aktuelle Situation *</label>
                    <select
                      className="bki-input"
                      value={form.situation}
                      onChange={set("situation")}
                      style={{ ...baseInput, cursor: "pointer", appearance: "none" }}
                    >
                      <option value="employed">Berufstätig (Jobwechsel)</option>
                      <option value="student">Student / Studentin</option>
                      <option value="apprentice">Auszubildende / r</option>
                      <option value="seeking">Arbeitssuchend</option>
                    </select>
                  </div>

                  <div>
                    <label style={baseLabel}>Berufserfahrung</label>
                    <select
                      className="bki-input"
                      value={form.experience}
                      onChange={set("experience")}
                      style={{ ...baseInput, cursor: "pointer", appearance: "none" }}
                    >
                      <option value="none">Keine Erfahrung</option>
                      <option value="1-2">1–2 Jahre</option>
                      <option value="3-5">3–5 Jahre</option>
                      <option value="5plus">Mehr als 5 Jahre</option>
                    </select>
                  </div>

                  <div>
                    <label style={baseLabel}>Fähigkeiten & Kenntnisse *</label>
                    <textarea
                      className="bki-input"
                      value={form.skills}
                      onChange={set("skills")}
                      placeholder="Python, Projektmanagement, Kundenkommunikation ..."
                      style={baseTextarea}
                    />
                  </div>

                  <div>
                    <label style={{ ...baseLabel }}>
                      Was macht dich besonders?{" "}
                      <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>
                        (optional)
                      </span>
                    </label>
                    <textarea
                      className="bki-input"
                      value={form.extra}
                      onChange={set("extra")}
                      placeholder="Eigenes Projekt geleitet, 3 Sprachen, ..."
                      style={{ ...baseTextarea, minHeight: "52px" }}
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-4 text-sm" style={{ color: "var(--destructive)" }}>{error}</p>
                )}

                <button
                  onClick={goNext}
                  className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--primary)", color: "#080810" }}
                >
                  Weiter zur Stelle <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ─── STEP 2: Job info ─── */}
            {step === 2 && !loading && (
              <div className="animate-fade-in">
                <p className="font-jetbrains text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--primary)" }}>
                  Schritt 02
                </p>
                <h1 className="font-syne font-black text-white text-2xl mb-1">Die Stelle</h1>
                <p className="text-sm text-white/40 mb-8 font-manrope">
                  Je mehr du angibst, desto besser wird der Brief.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

                  <div>
                    <label style={baseLabel}>Unternehmen *</label>
                    <input
                      className="bki-input"
                      type="text"
                      value={form.company}
                      onChange={set("company")}
                      placeholder="SAP SE"
                      style={baseInput}
                    />
                  </div>

                  <div>
                    <label style={baseLabel}>Stelle / Position *</label>
                    <input
                      className="bki-input"
                      type="text"
                      value={form.position}
                      onChange={set("position")}
                      placeholder="Junior Software Engineer"
                      style={baseInput}
                    />
                  </div>

                  <div>
                    <label style={baseLabel}>
                      Stellenbeschreibung{" "}
                      <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>
                        (empfohlen)
                      </span>
                    </label>
                    <textarea
                      className="bki-input"
                      value={form.jobDesc}
                      onChange={set("jobDesc")}
                      placeholder="Anforderungen aus der Stellenanzeige einfügen ..."
                      style={{ ...baseTextarea, minHeight: "110px" }}
                    />
                  </div>

                  <div>
                    <label style={baseLabel}>
                      Persönliche Motivation{" "}
                      <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>
                        (optional)
                      </span>
                    </label>
                    <textarea
                      className="bki-input"
                      value={form.motivation}
                      onChange={set("motivation")}
                      placeholder="Warum willst du genau diese Stelle?"
                      style={{ ...baseTextarea, minHeight: "52px" }}
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-4 text-sm" style={{ color: "var(--destructive)" }}>{error}</p>
                )}

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => { setStep(1); setError(null); window.scrollTo({ top: 0 }); }}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/[0.08]"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" /> Zurück
                  </button>
                  <button
                    onClick={generate}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: "var(--primary)", color: "#080810" }}
                  >
                    Brief erstellen ✨
                  </button>
                </div>
              </div>
            )}

            {/* ─── Loading state ─── */}
            {loading && (
              <div className="animate-fade-in flex flex-col items-center justify-center py-16 gap-6">
                {/* Typing indicator from design system */}
                <div className="typing-indicator">
                  <span /><span /><span />
                </div>
                <div className="text-center">
                  <p className="font-syne font-bold text-white text-lg mb-1">
                    KI schreibt deinen Brief ...
                  </p>
                  <p className="font-jetbrains text-xs text-white/35 tracking-wide">
                    GPT-4 · ca. 15–30 Sekunden
                  </p>
                </div>
                <div
                  className="w-full max-w-xs rounded-full overflow-hidden"
                  style={{ height: "2px", background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "var(--primary)",
                      borderRadius: "1px",
                      animation: "bki-progress 20s linear forwards",
                    }}
                  />
                </div>
                <style>{`
                  @keyframes bki-progress {
                    from { width: 0% }
                    to   { width: 90% }
                  }
                `}</style>
              </div>
            )}
          </div>

          {/* Bottom hint */}
          {!loading && (
            <p className="mt-5 text-center font-jetbrains text-[10px] text-white/22 tracking-wide uppercase">
              Kostenlos · Nur 7 € zum Download · Keine Anmeldung
            </p>
          )}
        </div>
      </div>
    </>
  );
}
