import { Link } from "@/i18n/navigation";
import {
  FileText, Zap, Download, CheckCircle, Star,
  Clock, Shield, Sparkles, ArrowRight,
} from "lucide-react";

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Deine Daten eingeben",
    desc: "Name, Zielstelle und deine Fähigkeiten – in 2 Minuten ausgefüllt, kein Aufwand.",
  },
  {
    num: "02",
    icon: Zap,
    title: "KI generiert deinen Brief",
    desc: "Unsere KI schreibt in unter 60 Sekunden einen professionellen, individuellen Brief.",
  },
  {
    num: "03",
    icon: Download,
    title: "Freischalten & senden",
    desc: "Für nur 7 € den vollen Brief herunterladen und sofort abschicken.",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Wirklich individuell",
    desc: "Kein generisches Copy-Paste. Der Brief wird auf deine Angaben und die spezifische Stelle zugeschnitten.",
  },
  {
    icon: Clock,
    title: "60 Sekunden",
    desc: "Daten eingeben, warten – und schon hast du deinen fertigen Brief. Kein langes Warten.",
  },
  {
    icon: Shield,
    title: "Kein Abo nötig",
    desc: "Einmal zahlen, einmal nutzen. 7 € pro Brief. Kein Monatsabo, keine versteckten Kosten.",
  },
  {
    icon: CheckCircle,
    title: "Professionelles Deutsch",
    desc: "Keine Rechtschreibfehler, professionelle Formulierungen, überzeugender Aufbau.",
  },
];

const testimonials = [
  {
    text: "Ich hatte keine Lust mehr auf Bewerbungsschreiben. In 2 Minuten hatte ich genau das, was ich brauchte.",
    name: "Tobias K.",
    role: "Eingeladen zum Vorstellungsgespräch",
  },
  {
    text: "Als Studentin ohne viel Erfahrung hat mir die KI geholfen, meine Stärken überzeugend zu formulieren.",
    name: "Jana W.",
    role: "Praktikumsplatz bekommen",
  },
  {
    text: "Ich schreibe Bewerbungen jetzt in 5 Minuten. 7 € für einen professionellen Brief – absolut fair.",
    name: "Michael S.",
    role: "Jobwechsel erfolgreich",
  },
];

const faqs = [
  {
    q: "Wie gut ist das Ergebnis wirklich?",
    a: "Die KI erstellt individuelle Texte, die auf deine Angaben und die spezifische Stelle zugeschnitten sind – kein generischer Standardtext. Die meisten Nutzer verwenden das Ergebnis direkt oder mit minimalen Anpassungen.",
  },
  {
    q: "Muss ich mich registrieren?",
    a: "Nein. Kein Account, keine E-Mail-Adresse. Du gibst deine Daten ein, der Brief wird generiert, du zahlst 7 € und lädst ihn sofort herunter.",
  },
  {
    q: "Kann ich den Brief bearbeiten?",
    a: "Ja. Du kannst ihn nach dem Download in Word oder einem anderen Textverarbeitungsprogramm öffnen und beliebig anpassen.",
  },
  {
    q: "Was passiert mit meinen Daten?",
    a: "Deine Angaben werden nur zur Generierung des Briefes verwendet. Wir verkaufen keine Daten.",
  },
  {
    q: "Für welche Stellen funktioniert das?",
    a: "Für praktisch jede Stelle – von der Ausbildung bis zur Führungsposition, Bürojob bis Handwerk. Die KI passt sich deinen Angaben an.",
  },
];

export default function LandingPage() {
  return (
    <div style={{ background: "#080810", minHeight: "100vh", color: "#fff" }}>

      {/* ── Navbar ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(20px)",
          background: "rgba(8,8,16,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText style={{ width: "14px", height: "14px", color: "#fff" }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em" }}>
              BewerbungsKI
            </span>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <a
              href="#wie-es-funktioniert"
              style={{
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                padding: "0.4rem 0.75rem",
              }}
            >
              So funktionierts
            </a>
            <a
              href="#preis"
              style={{
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                padding: "0.4rem 0.75rem",
              }}
            >
              Preis
            </a>
            <Link href="/erstellen">
              <button
                style={{
                  marginLeft: "0.5rem",
                  padding: "0.45rem 1.1rem",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontSize: "0.83rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Jetzt testen →
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section
          style={{
            padding: "5rem 1.5rem 4rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              width: "600px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "740px", margin: "0 auto", position: "relative" }}>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.3)",
                marginBottom: "1.75rem",
              }}
            >
              <Sparkles style={{ width: "12px", height: "12px", color: "#a78bfa" }} />
              <span style={{ fontSize: "0.78rem", color: "#c4b5fd", fontWeight: 500 }}>
                KI-generiert · Individuell · Sofort fertig
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.75rem, 8vw, 5.25rem)",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                marginBottom: "1.25rem",
              }}
            >
              Bewerbungsschreiben
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                in 60 Sekunden.
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.52)",
                lineHeight: 1.68,
                maxWidth: "500px",
                margin: "0 auto 2.25rem",
              }}
            >
              KI schreibt deinen{" "}
              <strong style={{ color: "rgba(255,255,255,0.82)" }}>individuellen</strong>{" "}
              Bewerbungsbrief – professionell formuliert, auf die Stelle zugeschnitten.
              Kein Abo, kein Aufwand.
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <Link href="/erstellen">
                <button
                  style={{
                    padding: "0.9rem 2.5rem",
                    borderRadius: "999px",
                    background: "#ffffff",
                    color: "#080810",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "none",
                    boxShadow: "0 0 50px rgba(167,139,250,0.3)",
                  }}
                >
                  Kostenlos erstellen →
                </button>
              </Link>
              <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.25)" }}>
                Kostenlos testen · Nur 7 € zum Download · Keine Anmeldung
              </p>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section
          id="wie-es-funktioniert"
          style={{ padding: "4.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                }}
              >
                So einfach gehts
              </h2>
              <p style={{ color: "rgba(255,255,255,0.42)", marginTop: "0.5rem" }}>
                In 3 Schritten zum fertigen Bewerbungsschreiben
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              {steps.map((s) => (
                <div
                  key={s.num}
                  style={{
                    background: "#13131f",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: "2.5rem",
                      color: "rgba(255,255,255,0.05)",
                      lineHeight: 1,
                      marginBottom: "1rem",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(124,58,237,0.14)",
                      border: "1px solid rgba(124,58,237,0.24)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <s.icon style={{ width: "16px", height: "16px", color: "#a78bfa" }} />
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.43)", lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          style={{ padding: "4rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.75rem" }}>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                }}
              >
                Warum BewerbungsKI?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.42)", marginTop: "0.5rem" }}>
                Nicht irgendein Generator – sondern einer, der wirklich überzeugt.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "1rem",
              }}
            >
              {features.map((f) => (
                <div
                  key={f.title}
                  style={{
                    background: "#13131f",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "1rem",
                    padding: "1.25rem",
                  }}
                >
                  <f.icon
                    style={{ width: "20px", height: "20px", color: "#a78bfa", marginBottom: "0.75rem" }}
                  />
                  <h3 style={{ fontWeight: 700, marginBottom: "0.35rem", fontSize: "0.92rem" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "0.81rem", color: "rgba(255,255,255,0.43)", lineHeight: 1.65 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section
          id="preis"
          style={{ padding: "4.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div style={{ maxWidth: "440px", margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                marginBottom: "0.5rem",
              }}
            >
              Einfacher Preis
            </h2>
            <p style={{ color: "rgba(255,255,255,0.42)", marginBottom: "2rem" }}>
              Kein Abo. Kein Schnickschnack. Einfach fair.
            </p>
            <div
              style={{
                background: "#13131f",
                border: "1px solid rgba(124,58,237,0.45)",
                borderRadius: "1.25rem",
                padding: "2rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "#fff",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "4px 18px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                }}
              >
                Meistgenutzt
              </div>
              <div
                style={{
                  fontSize: "3.75rem",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
              >
                7 €
              </div>
              <div
                style={{
                  fontSize: "0.83rem",
                  color: "rgba(255,255,255,0.38)",
                  marginBottom: "1.75rem",
                }}
              >
                einmalig · pro Bewerbungsschreiben
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 1.75rem 0",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                }}
              >
                {[
                  "Vollständiges Bewerbungsschreiben",
                  "Individuell auf deine Stelle zugeschnitten",
                  "Sofort als PDF herunterladen",
                  "Kein Account erforderlich",
                  "Beliebig anpassbar",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    <CheckCircle
                      style={{ width: "15px", height: "15px", color: "#a78bfa", flexShrink: 0 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/erstellen" style={{ display: "block" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "0.75rem",
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Jetzt kostenlos erstellen →
                </button>
              </Link>
              <p style={{ marginTop: "0.75rem", fontSize: "0.73rem", color: "rgba(255,255,255,0.28)" }}>
                Erst ausprobieren, dann entscheiden
              </p>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section
          style={{ padding: "4rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                marginBottom: "2.5rem",
              }}
            >
              Das sagen unsere Nutzer
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  style={{
                    background: "#13131f",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        style={{ width: "13px", height: "13px", fill: "#facc15", color: "#facc15" }}
                      />
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.58)",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: "0.75rem",
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.33)", marginTop: "0.1rem" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          style={{ padding: "4rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div style={{ maxWidth: "660px", margin: "0 auto" }}>
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                marginBottom: "2.5rem",
              }}
            >
              Häufige Fragen
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    background: "#13131f",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "0.875rem",
                    overflow: "hidden",
                  }}
                >
                  <summary
                    style={{
                      padding: "1rem 1.25rem",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span>{faq.q}</span>
                    <ArrowRight
                      style={{
                        width: "14px",
                        height: "14px",
                        color: "rgba(255,255,255,0.35)",
                        flexShrink: 0,
                      }}
                    />
                  </summary>
                  <div
                    style={{
                      padding: "0 1.25rem 1rem",
                      fontSize: "0.84rem",
                      color: "rgba(255,255,255,0.48)",
                      lineHeight: 1.72,
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      paddingTop: "0.875rem",
                    }}
                  >
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section
          style={{
            padding: "5rem 1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <h2
              style={{
                fontSize: "clamp(2rem, 6vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.035em",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              Dein nächster Job
              <br />
              beginnt hier.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.43)",
                marginBottom: "2rem",
                lineHeight: 1.68,
                position: "relative",
              }}
            >
              Erstelle jetzt kostenlos deinen Bewerbungsbrief. Nur 7 €, wenn er dir gefällt.
            </p>
            <Link href="/erstellen">
              <button
                style={{
                  padding: "0.9rem 2.75rem",
                  borderRadius: "999px",
                  background: "#fff",
                  color: "#080810",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  position: "relative",
                }}
              >
                Kostenlos erstellen →
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText style={{ width: "11px", height: "11px", color: "#fff" }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>BewerbungsKI</span>
        </div>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.22)" }}>
          &copy; {new Date().getFullYear()} BewerbungsKI &middot;{" "}
          <a href="#" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none" }}>
            Datenschutz
          </a>{" "}
          &middot;{" "}
          <a href="#" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none" }}>
            Impressum
          </a>
        </p>
      </footer>
    </div>
  );
}
