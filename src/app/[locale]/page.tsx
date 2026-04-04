import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PricingCards } from "@/components/paypal/pricing-cards";
import {
  MessageSquare, CalendarCheck, Clock, BarChart3, Brain,
  Layers, ArrowRight, Star, TrendingUp, Users, Shield, ArrowUpRight,
} from "lucide-react";

const featureIcons = [MessageSquare, CalendarCheck, Clock, BarChart3, Brain, Layers];
const featureKeys = ["autoReply", "booking", "available", "analytics", "personalized", "multichannel"] as const;

const marqueeItems = [
  "Friseursalon", "Kosmetikstudio", "Coaching", "Restaurant",
  "Physiotherapie", "Yoga Studio", "Nagelstudio", "Tattoo Studio",
  "Personal Training", "Zahnarztpraxis", "Massage", "Hundesalon",
];

const faqs = [
  { q: "Wie schnell kann ich loslegen?", a: "In unter 5 Minuten. WhatsApp verbinden, dein Business beschreiben — die KI antwortet sofort auf alle Nachrichten." },
  { q: "Funktioniert das wirklich automatisch, ohne dass ich selbst eingreife?", a: "Ja. Die KI antwortet eigenständig auf jede Nachricht, 24/7. Du kannst jede Antwort vorher freigeben oder sie vollautomatisch laufen lassen." },
  { q: "Was kostet mich eine falsche KI-Antwort — kann das meiner Marke schaden?", a: "Die KI antwortet nur auf Basis deiner eigenen Texte. Du hast immer die Kontrolle: Antworten prüfen, anpassen oder manuell übernehmen." },
  { q: "Was passiert nach den 7 kostenlosen Tagen?", a: "Du entscheidest, ob du weitermachst. Keine automatische Verlängerung, keine versteckten Kosten. Starter ab 49€/Monat." },
  { q: "Funktioniert das auch mit Instagram, nicht nur WhatsApp?", a: "Ja — beide Kanäle sind dabei. WhatsApp und Instagram Direct Messages, alles in einem Dashboard. Pro-Plan schaltet beide Kanäle frei." },
];

export default function LandingPage() {
  const t  = useTranslations("landing");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden" style={{ background: "#080810" }}>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl" style={{ background: "rgba(8,8,16,0.88)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="font-syne text-[15px] font-700 tracking-tight text-white">{tc("appName")}</span>
          </div>
          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {["features", "pricing", "testimonials", "faq"].map((id) => (
              <a key={id} href={`#${id}`} className="text-white/50 hover:text-white transition-colors capitalize">
                {id === "faq" ? "FAQ" : id === "testimonials" ? "Kunden" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
          {/* Auth buttons */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/login">
              <button className="px-4 py-1.5 text-sm text-white/65 hover:text-white transition-colors rounded-full" style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}>
                {tc("login")}
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-1.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)" }}>
                {tc("register")}
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
          {/* orbs */}
          <div className="absolute inset-0 hero-glow" />
          {/* dark vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 30%, rgba(8,8,16,0.92) 100%)" }} />
          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to bottom, transparent, rgba(8,8,16,1))" }} />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center py-24">
            {/* trust badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
              <span className="text-xs text-white/70 ml-0.5">4,9 · 500+ zufriedene Businesses</span>
            </div>

            {/* headline — exact reference sizing */}
            <h1 className="animate-fade-up delay-100 font-syne font-800 text-white leading-[1.0] tracking-tight" style={{ fontSize: "clamp(3rem, 9vw, 6rem)" }}>
              Dein 24/7 Mitarbeiter für
              <br />
              <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                WhatsApp &amp; Instagram.
              </span>
            </h1>

            {/* subtitle */}
            <p className="animate-fade-up delay-200 mt-6 text-base text-white/55 leading-relaxed max-w-xl mx-auto">
              Antwortet automatisch auf WhatsApp &amp; Instagram und bucht Termine direkt in deinen Kalender.
              Durchschnittlich <strong className="text-white/85">3,2× mehr Buchungen</strong> ab Tag 1.
            </p>

            {/* CTAs — exact reference pill style */}
            <div className="animate-fade-up delay-300 mt-8 flex items-center justify-center gap-3">
              <Link href="/register">
                <button className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#080810] transition-all hover:scale-[1.03]" style={{ background: "#ffffff" }}>
                  7 Tage kostenlos testen
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-2.5 rounded-full text-sm font-medium text-white/80 transition-all hover:text-white hover:border-white/40" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.18)" }}>
                  Demo ansehen
                </button>
              </Link>
            </div>

            {/* trust micro */}
            <p className="animate-fade-up delay-400 mt-4 text-xs text-white/35 flex flex-wrap gap-x-5 gap-y-1 justify-center">
              <span>Keine Kreditkarte</span>
              <span>·</span>
              <span>Setup in 1 Minute</span>
              <span>·</span>
              <span>Jederzeit kündbar</span>
            </p>

            {/* testimonial quote — like reference "Paving the way..." */}
            <p className="animate-fade-up delay-500 mt-16 text-lg text-white/50 italic">
              &ldquo;ReplyFlow hat unsere Buchungsrate in der ersten Woche verdoppelt.&rdquo;
            </p>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="py-4 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex gap-0">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-marquee flex shrink-0 gap-10 pr-10">
                {marqueeItems.map((item) => (
                  <span key={item} className="font-jetbrains text-xs text-white/25 whitespace-nowrap tracking-widest uppercase">{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section id="features" className="relative py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-4xl font-800 text-white sm:text-5xl">{t("features.title")}</h2>
              <p className="mt-3 text-white/48 max-w-lg mx-auto">{t("features.subtitle")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[i];
                return (
                  <div key={key} className="rounded-2xl p-6 group hover:scale-[1.01] transition-transform" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Icon className="h-5 w-5 text-white/70" />
                    </div>
                    <h3 className="font-syne font-700 text-white mb-2">{t(`features.${key}.title`)}</h3>
                    <p className="text-sm text-white/48 leading-relaxed mb-4">{t(`features.${key}.description`)}</p>
                    <button className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors">
                      Mehr erfahren <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-4xl font-800 text-white sm:text-5xl">In 3 Schritten live</h2>
              <p className="mt-3 text-white/48">Einrichtung in unter 5 Minuten — kein technisches Wissen nötig</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { step: "01", title: "Business verbinden", desc: "WhatsApp & Instagram in unter 5 Minuten verbinden." },
                { step: "02", title: "KI einrichten",      desc: "Erkläre der KI dein Business, Dienstleistungen und Öffnungszeiten." },
                { step: "03", title: "Termine fließen",    desc: "KI antwortet sofort und bucht Termine automatisch in deinen Kalender." },
              ].map((s, i) => (
                <div key={s.step} className="relative rounded-2xl p-6" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="font-syne text-5xl font-800 mb-4 leading-none" style={{ color: "rgba(255,255,255,0.06)" }}>{s.step}</div>
                  <h3 className="font-syne font-700 text-white text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-white/48 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-4xl font-800 text-white sm:text-5xl">{t("pricing.title")}</h2>
              <p className="mt-3 text-white/48">{t("pricing.subtitle")}</p>
            </div>
            <PricingCards
              starterFeatures={t.raw("pricing.starter.features") as string[]}
              proFeatures={t.raw("pricing.pro.features") as string[]}
              ctaText={t("pricing.cta")}
              starterName={t("pricing.starter.name")}
              starterDesc={t("pricing.starter.description")}
              proName={t("pricing.pro.name")}
              proDesc={t("pricing.pro.description")}
              proBadge={t("pricing.pro.badge")}
            />
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-4xl font-800 text-white sm:text-5xl">{t("testimonials.title")}</h2>
              <p className="mt-3 text-white/48">Was unsere Kunden sagen.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {(t.raw("testimonials.items") as Array<{ quote: string; author: string; role: string }>).map((item, i) => (
                <div key={item.author} className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="absolute -top-4 -right-2 font-syne text-9xl font-800 leading-none select-none" style={{ color: "rgba(255,255,255,0.03)" }}>&ldquo;</div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm leading-relaxed text-white/55 mb-5 relative">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold shrink-0 font-syne"
                         style={{ background: `hsl(${(i*80+200)%360},50%,28%)`, color: `hsl(${(i*80+200)%360},80%,85%)` }}>
                      {item.author[0]}
                    </div>
                    <div>
                      <p className="font-syne font-700 text-white text-sm">{item.author}</p>
                      <p className="font-jetbrains text-[10px] text-white/38 tracking-wide">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-syne text-4xl font-800 text-white sm:text-5xl">FAQs</h2>
              <p className="mt-3 text-white/48">Schnelle Antworten auf häufige Fragen zu ReplyFlow AI.</p>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-2xl overflow-hidden" style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer text-white text-sm font-medium list-none hover:bg-white/[0.02] transition-colors">
                    <span className="font-syne font-600">{faq.q}</span>
                    <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-white/50 group-open:rotate-45 transition-transform duration-200 text-base" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-white/45 leading-relaxed" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.875rem" }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(29,78,216,0.18) 0%, rgba(219,39,119,0.10) 55%, transparent 80%)" }} />
          <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2 className="font-syne font-800 text-white tracking-tight" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
              {t("cta.title")}
            </h2>
            <p className="mt-5 text-base text-white/45 max-w-md mx-auto">{t("cta.subtitle")}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <button className="px-8 py-3 rounded-full text-sm font-semibold text-[#080810] transition-all hover:scale-[1.03] shadow-2xl" style={{ background: "#ffffff" }}>
                  {t("cta.button")} →
                </button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/28">Keine Kreditkarte · 7 Tage gratis · danach ab 49€/Monat</p>
          </div>
        </section>
      </main>

      {/* ── Sticky mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 py-3 flex items-center gap-3" style={{ background: "rgba(8,8,16,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex-1 min-w-0">
          <p className="font-syne font-700 text-sm text-white leading-tight">7 Tage kostenlos</p>
          <p className="font-jetbrains text-[10px] text-white/38">Keine Kreditkarte · sofort live</p>
        </div>
        <Link href="/register">
          <button className="px-5 py-2 rounded-full text-sm font-semibold text-[#080810] shrink-0" style={{ background: "#ffffff" }}>
            Starten →
          </button>
        </Link>
      </div>

      {/* ── Footer ── */}
      <footer className="py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)" }}>
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <span className="font-syne font-700 text-white">{tc("appName")}</span>
              </div>
              <p className="text-sm text-white/35 leading-relaxed">KI-Automatisierung für lokale Businesses.</p>
            </div>
            {[
              { title: t("footer.product"), links: [t("footer.features"), t("footer.pricing")] },
              { title: t("footer.company"), links: [t("footer.about"), t("footer.blog")] },
              { title: t("footer.legal"),   links: [t("footer.privacy"), t("footer.terms"), t("footer.imprint")] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-syne font-700 mb-3 text-sm text-white/65">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-white/35 hover:text-white/65 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/25" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p>&copy; {new Date().getFullYear()} {tc("appName")}. {t("footer.copyright")}</p>
            <div className="flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5 text-white/35" />
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
