import { Link } from "@/i18n/navigation";
import {
  FileText, Zap, Shield, CheckCircle, Download, Star,
  ArrowUpRight, Sparkles,
} from "lucide-react";

/* ─── Content ─────────────────────────────────────────────────────────── */

const featureIcons = [FileText, Zap, Shield, CheckCircle, Star, Download];
const features = [
  { title: "Wirklich individuell",   desc: "Kein Copy-Paste. Jeder Brief wird auf deine Angaben und die spezifische Stelle zugeschnitten." },
  { title: "60 Sekunden",            desc: "Daten eingeben – und in unter einer Minute hast du deinen fertigen Brief. Kein Warten." },
  { title: "Kein Abo nötig",         desc: "Einmalig 7 € pro Brief. Kein Monatsabo, keine Falle, keine versteckten Kosten." },
  { title: "Professionelles Deutsch",desc: "Keine Rechtschreibfehler, keine Floskeln. Sauberer, überzeugender Bewerbungsstil." },
  { title: "Keine Anmeldung",        desc: "Direkt loslegen. Kein Account, keine E-Mail-Adresse nötig." },
  { title: "Sofort als PDF",          desc: "Nach der Zahlung direkt herunterladen und versenden – kein weiterer Schritt." },
];

const marqueeItems = [
  "Software Engineer", "Marketing Manager", "UX Designer", "Vertrieb",
  "HR Manager", "Buchhalter", "Projektmanager", "Ingenieur",
  "Pflegefachkraft", "Lehrer", "Jurist", "Controller",
];

const testimonials = [
  {
    quote: "Ich hatte keine Lust mehr auf Bewerbungsschreiben. In 2 Minuten hatte ich genau das, was ich brauchte.",
    author: "Tobias K.", role: "Eingeladen zum Vorstellungsgespräch",
  },
  {
    quote: "Als Studentin ohne viel Erfahrung hat mir die KI geholfen, meine Stärken überzeugend zu formulieren.",
    author: "Jana W.", role: "Praktikumsplatz bekommen",
  },
  {
    quote: "7 € für einen professionellen Brief – absolut fair. Ich nutze es jetzt für jede Bewerbung.",
    author: "Michael S.", role: "Jobwechsel erfolgreich",
  },
];

const faqs = [
  { q: "Wie gut ist das Ergebnis wirklich?",
    a: "Die KI erstellt individuelle Texte auf Basis deiner Angaben und der Stelle – kein generischer Standardtext. Die meisten Nutzer verwenden das Ergebnis direkt oder mit minimalen Anpassungen." },
  { q: "Muss ich mich registrieren?",
    a: "Nein. Kein Account, keine E-Mail. Du gibst deine Daten ein, der Brief wird generiert, du zahlst 7 € und lädst ihn sofort herunter." },
  { q: "Kann ich den Brief bearbeiten?",
    a: "Ja. Du kannst ihn nach dem Download in Word oder einem anderen Textverarbeitungsprogramm öffnen und beliebig anpassen." },
  { q: "Was passiert mit meinen Daten?",
    a: "Deine Angaben werden nur zur Generierung des Briefes verwendet und danach nicht weiterverwendet." },
  { q: "Für welche Stellen funktioniert das?",
    a: "Für praktisch jede Stelle – von der Ausbildung bis zur Führungsposition. Die KI passt sich deinen Angaben an." },
];

/* ─── Component ────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#080810", overflowX: "hidden", maxWidth: "100vw" }}>

      {/* ── Navbar ── */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-xl"
        style={{ background: "rgba(8,8,16,0.88)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" style={{ minWidth: 0 }}>
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "rgba(0,230,118,0.12)", border: "1px solid rgba(0,230,118,0.25)" }}
            >
              <FileText className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
            </div>
            <span className="font-syne text-[15px] font-bold tracking-tight text-white">
              BewerbungsKI
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {[
              { href: "#wie-es-funktioniert", label: "So funktionierts" },
              { href: "#preis",                label: "Preis" },
              { href: "#faq",                  label: "FAQ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/50 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Link href="/erstellen">
            <button
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "var(--primary)", color: "#080810" }}
            >
              Jetzt testen →
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
          {/* Mint glow — distinctive vs purple AI clichés */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle 580px at 28% 55%, rgba(0,230,118,0.14) 0%, transparent 65%)," +
                "radial-gradient(circle 420px at 72% 38%, rgba(0,180,90,0.09) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 30%, rgba(8,8,16,0.94) 100%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(8,8,16,1))" }}
          />

          <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-24" style={{ boxSizing: "border-box" }}>

            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 mb-8">
              <span className="label-tag">
                <Sparkles className="h-3 w-3" />
                KI-generiert · 60 Sekunden · Nur 6,99 €
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up delay-100 font-syne font-black tracking-tight"
              style={{
                fontSize: "clamp(2.4rem, 7.5vw, 5.5rem)",
                lineHeight: 1.15,
                textAlign: "center",
                width: "100%",
                display: "block",
              }}
            >
              <span style={{ display: "block", textAlign: "center", color: "#fff" }}>Bewerbungs</span>
              <span style={{ display: "block", textAlign: "center" }} className="gradient-text">schreiben.</span>
            </h1>

            {/* Subtitle — "in 60 Sekunden" lives here now */}
            <p className="animate-fade-up delay-200 mt-7 text-base text-white/55 leading-relaxed max-w-xl mx-auto">
              KI schreibt deinen{" "}
              <strong className="text-white/85">individuellen</strong> Bewerbungsbrief{" "}
              <strong className="text-white/85">in 60 Sekunden</strong> –
              professionell formuliert, auf die Stelle zugeschnitten.
              Kein Abo, kein Aufwand.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 mt-8 flex items-center justify-center gap-3 flex-wrap">
              <Link href="/erstellen">
                <button
                  className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-[1.03] active:scale-95"
                  style={{ background: "var(--primary)", color: "#080810" }}
                >
                  Kostenlos erstellen →
                </button>
              </Link>
              <a href="#wie-es-funktioniert">
                <button
                  className="px-6 py-2.5 rounded-full text-sm font-medium text-white/80 transition-all hover:text-white"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  So funktionierts
                </button>
              </a>
            </div>

            {/* Trust signals */}
            <p className="animate-fade-up delay-400 mt-4 font-jetbrains text-xs text-white/30 flex flex-wrap gap-x-5 gap-y-1 justify-center">
              <span>Kostenlos testen</span>
              <span>·</span>
              <span>Nur 6,99 € zum Download</span>
              <span>·</span>
              <span>Keine Anmeldung</span>
            </p>

            {/* Pull quote */}
            <p className="animate-fade-up delay-500 mt-16 text-lg text-white/40 italic font-syne">
              &ldquo;In 2 Minuten mein bestes Bewerbungsschreiben aller Zeiten.&rdquo;
            </p>
          </div>
        </section>

        {/* ── Marquee — job categories ── */}
        <div
          className="py-4 overflow-hidden"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,230,118,0.02)",
          }}
        >
          <div className="flex gap-0">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-marquee flex shrink-0 gap-10 pr-10">
                {marqueeItems.map((item) => (
                  <span
                    key={item}
                    className="font-jetbrains text-xs whitespace-nowrap tracking-widest uppercase"
                    style={{ color: "var(--primary)", opacity: 0.28 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── How it works ── */}
        <section
          id="wie-es-funktioniert"
          className="relative py-24 mesh-bg"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-4xl font-black text-white sm:text-5xl">
                In 3 Schritten fertig
              </h2>
              <p className="mt-3 text-white/48 max-w-md mx-auto">
                Kein Aufwand – einfach Daten eingeben und der Brief ist fertig
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { num: "01", title: "Daten eingeben",    desc: "Name, Zielstelle und deine Skills – 2 Minuten, kein technisches Wissen nötig." },
                { num: "02", title: "KI generiert Brief", desc: "GPT-4 schreibt in unter 60 Sekunden einen professionellen, individuellen Brief." },
                { num: "03", title: "Herunterladen",      desc: "7 € einmalig – sofort als PDF herunterladen und direkt versenden." },
              ].map((s) => (
                <div
                  key={s.num}
                  className="relative rounded-2xl p-6 overflow-hidden card-hover"
                  style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* Big background number */}
                  <div className="section-num absolute -top-4 -left-2 select-none">
                    {s.num}
                  </div>
                  <div className="relative">
                    <span
                      className="font-jetbrains text-[10px] tracking-widest uppercase"
                      style={{ color: "var(--primary)", opacity: 0.7 }}
                    >
                      Schritt {s.num}
                    </span>
                    <h3 className="font-syne font-bold text-white text-lg mt-2 mb-2">{s.title}</h3>
                    <p className="text-sm text-white/48 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          id="features"
          className="relative py-24"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-4xl font-black text-white sm:text-5xl">
                Warum BewerbungsKI?
              </h2>
              <p className="mt-3 text-white/48 max-w-lg mx-auto">
                Nicht irgendein Generator – sondern einer, der wirklich überzeugt.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl p-6 group card-hover"
                    style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: "rgba(0,230,118,0.08)",
                        border: "1px solid rgba(0,230,118,0.18)",
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="font-syne font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-white/48 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section
          id="preis"
          className="py-24 relative overflow-hidden"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,230,118,0.07) 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-md px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-4xl font-black text-white sm:text-5xl">
                Einfacher Preis
              </h2>
              <p className="mt-3 text-white/48">Kein Abo. Kein Schnickschnack. Einfach fair.</p>
            </div>
            <div
              className="rounded-2xl p-8 relative"
              style={{
                background: "#13131f",
                border: "1px solid rgba(0,230,118,0.32)",
              }}
            >
              {/* Featured badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="label-tag">Meistgenutzt</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-2">
                  <span className="font-syne font-black text-5xl text-white leading-none">6,99 €</span>
                  <span className="text-white/40 text-sm pb-2">einmalig · pro Brief · kein Abo</span>
                </div>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 mb-8">
                {[
                  "Vollständiges Bewerbungsschreiben",
                  "Individuell auf deine Stelle zugeschnitten",
                  "Sofort als PDF herunterladen",
                  "Kein Account erforderlich",
                  "Beliebig anpassbar",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/65">
                    <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/erstellen" className="block">
                <button
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--primary)", color: "#080810" }}
                >
                  Jetzt kostenlos erstellen →
                </button>
              </Link>
              <p className="mt-3 text-center font-jetbrains text-xs text-white/28">
                Erst ausprobieren — dann entscheiden
              </p>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section
          id="testimonials"
          className="py-24"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-4xl font-black text-white sm:text-5xl">
                Das sagen unsere Nutzer
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <div
                  key={item.author}
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* Decorative quote mark */}
                  <div
                    className="absolute -top-4 -right-2 font-syne text-9xl font-black leading-none select-none"
                    style={{ color: "rgba(0,230,118,0.05)" }}
                  >
                    &ldquo;
                  </div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-white/55 mb-5 relative">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div
                    className="flex items-center gap-3 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold shrink-0 font-syne"
                      style={{
                        background: "rgba(0,230,118,0.1)",
                        color: "rgba(0,230,118,0.9)",
                        border: "1px solid rgba(0,230,118,0.2)",
                      }}
                    >
                      {item.author[0]}
                    </div>
                    <div>
                      <p className="font-syne font-bold text-white text-sm">{item.author}</p>
                      <p className="font-jetbrains text-[10px] text-white/38 tracking-wide">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          id="faq"
          className="py-24"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-syne text-4xl font-black text-white sm:text-5xl">FAQs</h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl overflow-hidden"
                  style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer text-white text-sm font-medium list-none hover:bg-white/[0.02] transition-colors">
                    <span className="font-syne font-semibold">{faq.q}</span>
                    <span
                      className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-white/50 group-open:rotate-45 transition-transform duration-200"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </summary>
                  <div
                    className="px-5 pb-4 text-sm text-white/45 leading-relaxed"
                    style={{
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
        <section className="py-28 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,230,118,0.09) 0%, rgba(0,180,90,0.05) 55%, transparent 80%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2
              className="font-syne font-black text-white tracking-tight"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              Dein nächster Job
              <br />
              beginnt hier.
            </h2>
            <p className="mt-5 text-base text-white/45 max-w-md mx-auto">
              Erstelle jetzt kostenlos deinen Bewerbungsbrief.
              Nur 6,99 €, wenn er dir gefällt.
            </p>
            <div className="mt-8">
              <Link href="/erstellen">
                <button
                  className="px-8 py-3 rounded-full text-sm font-semibold text-[#080810] transition-all hover:scale-[1.03] shadow-2xl"
                  style={{ background: "var(--primary)" }}
                >
                  Kostenlos erstellen →
                </button>
              </Link>
            </div>
            <p className="mt-4 font-jetbrains text-xs text-white/28">
              Keine Anmeldung · Kostenlos testen · Nur 6,99 € zum Download
            </p>
          </div>
        </section>
      </main>

      {/* ── Sticky mobile CTA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 py-3 flex items-center gap-3"
        style={{
          background: "rgba(8,8,16,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex-1 min-w-0">
          <p className="font-syne font-bold text-sm text-white leading-tight">
            Bewerbungsschreiben erstellen
          </p>
          <p className="font-jetbrains text-[10px] text-white/38">
            Kostenlos testen · nur 6,99 € zum Download
          </p>
        </div>
        <Link href="/erstellen">
          <button
            className="px-5 py-2 rounded-full text-sm font-semibold text-[#080810] shrink-0"
            style={{ background: "var(--primary)" }}
          >
            Starten →
          </button>
        </Link>
      </div>

      {/* ── Footer ── */}
      <footer
        className="py-12"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(0,230,118,0.12)",
                  border: "1px solid rgba(0,230,118,0.2)",
                }}
              >
                <FileText className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
              </div>
              <span className="font-syne font-bold text-white">BewerbungsKI</span>
            </div>
            {/* Legal links */}
            <div className="flex items-center gap-6">
              {["Datenschutz", "Impressum", "AGB"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-white/35 hover:text-white/65 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div
            className="mt-8 pt-8 text-center font-jetbrains text-sm text-white/22"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            &copy; {new Date().getFullYear()} BewerbungsKI · Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
