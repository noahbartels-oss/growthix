import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PricingCards } from "@/components/paypal/pricing-cards";
import {
  MessageSquare, CalendarCheck, Clock, BarChart3, Brain,
  Layers, ArrowRight, Star,
  TrendingUp, Users, Shield,
} from "lucide-react";

const featureIcons = [MessageSquare, CalendarCheck, Clock, BarChart3, Brain, Layers];
const featureKeys = ["autoReply", "booking", "available", "analytics", "personalized", "multichannel"] as const;

const marqueeItems = [
  "Friseursalon", "Kosmetikstudio", "Coaching", "Restaurant",
  "Physiotherapie", "Yoga Studio", "Nagelstudio", "Tattoo Studio",
  "Personal Training", "Zahnarztpraxis", "Massage", "Hundesalon",
];

export default function LandingPage() {
  const t  = useTranslations("landing");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 border border-white/15">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="font-syne text-base font-700 tracking-tight text-white">{tc("appName")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features"     className="text-white/60 hover:text-white transition-colors">{t("footer.features")}</a>
            <a href="#pricing"      className="text-white/60 hover:text-white transition-colors">{t("footer.pricing")}</a>
            <a href="#testimonials" className="text-white/60 hover:text-white transition-colors">Kunden</a>
            <a href="#faq"          className="text-white/60 hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                {tc("login")}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="rounded-full bg-white hover:bg-white/90 text-[#07070E] font-semibold px-5 shadow-lg">
                {tc("register")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* vivid orbs */}
          <div className="absolute inset-0 hero-glow" />
          {/* subtle grid */}
          <div className="absolute inset-0 mesh-bg opacity-20" />
          {/* dark vignette at edges */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(7,7,14,0.85) 100%)" }} />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-20">
            {/* social proof pill */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 mb-8 backdrop-blur-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-white/80 font-medium">4,9 · 500+ Businesses vertrauen ReplyFlow</span>
            </div>

            <h1 className="animate-fade-up delay-100 font-syne font-800 tracking-tight leading-[1.0] text-white"
                style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}>
              Dein 24/7 Mitarbeiter für
              <br />
              <span className="gradient-text">WhatsApp &amp; Instagram.</span>
            </h1>

            <p className="animate-fade-up delay-200 mt-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Antwortet automatisch auf WhatsApp &amp; Instagram und bucht Termine direkt in deinen Kalender. Durchschnittlich <strong className="text-white/90">3,2× mehr Buchungen</strong> ab Tag 1.
            </p>

            {/* pill CTAs */}
            <div className="animate-fade-up delay-300 mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button size="lg" className="rounded-full h-12 px-8 text-base font-semibold bg-white hover:bg-white/92 text-[#07070E] shadow-xl hover:-translate-y-0.5 transition-all">
                  7 Tage kostenlos testen
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="rounded-full h-12 px-7 text-base border-white/25 text-white bg-white/5 hover:bg-white/12 hover:border-white/40 backdrop-blur-sm">
                  Jetzt ausprobieren
                </Button>
              </Link>
            </div>

            {/* micro trust signals */}
            <p className="animate-fade-up delay-400 mt-4 text-sm text-white/40 flex flex-wrap gap-x-5 gap-y-1 justify-center">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />Keine Kreditkarte</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />Setup in 1 Minute</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />Jederzeit kündbar</span>
            </p>

            {/* stat pills */}
            <div className="animate-fade-up delay-500 mt-12 flex flex-wrap gap-3 justify-center">
              {[
                { icon: TrendingUp, value: "∅ +1.200€", label: "mehr Umsatz/Monat" },
                { icon: Clock,      value: "∅ 2s",       label: "Reaktionszeit"     },
                { icon: Users,      value: "500+",        label: "Businesses"         },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3">
                  <s.icon className="h-4 w-4 text-white/50 shrink-0" />
                  <div>
                    <div className="font-syne text-xl font-800 leading-none tracking-tight text-white">{s.value}</div>
                    <div className="text-xs text-white/50 mt-0.5 leading-none">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="border-y border-white/6 bg-white/3 py-4 overflow-hidden">
          <div className="flex gap-0">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-marquee flex shrink-0 gap-10 pr-10">
                {marqueeItems.map((item) => (
                  <span key={item} className="font-jetbrains text-xs text-white/30 whitespace-nowrap tracking-widest uppercase">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── PROBLEM ── */}
        <section id="problem" className="relative py-24 overflow-hidden">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-3xl font-800 sm:text-4xl lg:text-5xl text-white">
                Jede unbeantwortete Nachricht ist
                <span className="gradient-text-cta"> bares Geld.</span>
              </h2>
              <p className="mt-4 text-white/50 max-w-xl mx-auto">
                74% der Kunden buchen beim Konkurrenten, wenn du nicht binnen 5 Minuten antwortest.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { num: "01", title: "Nachrichten stapeln sich",   desc: "Täglich Dutzende Anfragen auf WhatsApp & Instagram — du kommst kaum hinterher und verlierst potenzielle Kunden.", loss: "⌀ 8 verpasste Buchungen/Woche" },
                { num: "02", title: "Zu langsame Reaktion",        desc: "Wer nicht binnen Minuten antwortet, verliert. Kunden haben keine Geduld — sie schreiben einfach dem Nächsten.",  loss: "74% wechseln nach 5 Min" },
                { num: "03", title: "Manuelles Buchen kostet Zeit", desc: "Hin und her schreiben, Termine koordinieren — das kostet dich Stunden pro Woche, die du im Business brauchst.",  loss: "∅ 4 Std/Woche verschwendet" },
              ].map((p) => (
                <div key={p.num} className="rounded-2xl border border-white/8 bg-white/4 p-6 hover:border-white/15 hover:bg-white/6 transition-all duration-200">
                  <div className="font-jetbrains text-xs text-white/25 mb-4">{p.num}</div>
                  <h3 className="font-syne font-700 text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{p.desc}</p>
                  <div className="inline-block text-xs font-jetbrains text-orange-400/80 border border-orange-500/20 bg-orange-500/6 px-3 py-1 rounded-full">
                    {p.loss}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="relative py-24 overflow-hidden border-y border-white/6">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-3xl font-800 sm:text-4xl text-white">In 3 Schritten zu mehr Buchungen</h2>
              <p className="mt-3 text-white/50">Einrichtung in unter 5 Minuten</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { step: "1", title: "Business verbinden", desc: "WhatsApp & Instagram in unter 5 Minuten verbinden. Kein technisches Wissen nötig." },
                { step: "2", title: "KI einrichten",      desc: "Erkläre der KI dein Business, deine Dienstleistungen und Öffnungszeiten — fertig." },
                { step: "3", title: "Termine fließen",    desc: "Kunden schreiben, KI antwortet sofort und bucht Termine automatisch in deinen Kalender." },
              ].map((s, i) => (
                <div key={s.step} className="relative text-center">
                  {i < 2 && <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px border-t border-dashed border-white/10" />}
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/6 font-syne text-2xl font-800 text-white mb-5">{s.step}</div>
                  <h3 className="font-syne font-700 text-white text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="relative py-24 overflow-hidden">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-3xl font-800 sm:text-4xl lg:text-5xl text-white">{t("features.title")}</h2>
              <p className="mt-3 text-white/50 max-w-xl mx-auto">{t("features.subtitle")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[i];
                return (
                  <div key={key} className="group rounded-2xl border border-white/8 bg-white/4 p-6 hover:border-white/15 hover:bg-white/6 transition-all duration-200">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8">
                      <Icon className="h-5 w-5 text-white/70" />
                    </div>
                    <h3 className="font-syne font-700 text-white mb-2">{t(`features.${key}.title`)}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{t(`features.${key}.description`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="relative py-24 border-y border-white/6 overflow-hidden">
          {/* subtle purple glow behind pricing */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-3xl font-800 sm:text-4xl lg:text-5xl text-white">{t("pricing.title")}</h2>
              <p className="mt-3 text-white/50">{t("pricing.subtitle")}</p>
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
        <section id="testimonials" className="relative py-24 overflow-hidden">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-3xl font-800 sm:text-4xl text-white">{t("testimonials.title")}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {(t.raw("testimonials.items") as Array<{ quote: string; author: string; role: string }>).map((item, i) => (
                <div key={item.author} className="rounded-2xl border border-white/8 bg-white/4 p-6 relative overflow-hidden hover:border-white/15 transition-all duration-200">
                  <div className="absolute -top-3 -right-1 font-syne text-8xl font-800 text-white/4 leading-none select-none">&ldquo;</div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-white/60 mb-5">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold shrink-0 font-syne"
                      style={{ background: `hsl(${(i * 60 + 200) % 360}, 55%, 30%)`, color: `hsl(${(i * 60 + 200) % 360}, 80%, 88%)` }}
                    >
                      {item.author[0]}
                    </div>
                    <div>
                      <p className="font-syne font-700 text-white text-sm">{item.author}</p>
                      <p className="font-jetbrains text-[10px] text-white/40 tracking-wide">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="relative py-24 border-y border-white/6 overflow-hidden">
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="font-syne text-3xl font-800 sm:text-4xl lg:text-5xl text-white">FAQs</h2>
              <p className="mt-3 text-white/50">Schnelle Antworten auf häufige Fragen.</p>
            </div>
            <div className="space-y-2">
              {[
                {
                  q: "Funktioniert das wirklich automatisch — ohne dass ich selbst eingreife?",
                  a: "Ja. Die KI antwortet eigenständig auf jede Nachricht, 24/7. Du kannst optional jede Antwort vorher freigeben, aber die meisten Kunden lassen sie vollautomatisch laufen.",
                },
                {
                  q: "Was kostet mich eine falsche KI-Antwort — kann das meiner Marke schaden?",
                  a: "Die KI antwortet nur auf Basis deiner eigenen Texte und Informationen. Du hast immer die Kontrolle: Antworten prüfen, anpassen oder manuell übernehmen — jederzeit.",
                },
                {
                  q: "Ich bin kein Technik-Profi. Schaffe ich das Setup alleine?",
                  a: "Ja. Die Einrichtung dauert unter 5 Minuten: WhatsApp-Nummer verbinden, dein Business beschreiben, fertig. Kein Code, kein technisches Wissen nötig.",
                },
                {
                  q: "Was passiert nach den 7 kostenlosen Tagen?",
                  a: "Du entscheidest, ob du weitermachst. Keine automatische Verlängerung ohne deine Zustimmung, keine versteckten Kosten. Starter ab 49€/Monat.",
                },
                {
                  q: "Funktioniert das auch mit Instagram, nicht nur WhatsApp?",
                  a: "Ja — beide Kanäle sind von Anfang an dabei. WhatsApp, Instagram Direct Messages, alles in einem Dashboard. Pro-Plan schaltet beide Kanäle frei.",
                },
              ].map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-white/8 bg-white/4 overflow-hidden hover:border-white/15 transition-colors">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-syne font-700 text-white text-sm list-none">
                    {faq.q}
                    <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/6 text-white/60 group-open:rotate-45 transition-transform duration-200 text-base font-normal">
                      ↗
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/6 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-28 relative overflow-hidden">
          {/* strong center orb */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(37,99,235,0.18) 0%, rgba(139,92,246,0.12) 50%, transparent 80%)" }} />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-syne font-800 tracking-tight text-white" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
              {t("cta.title")}
            </h2>
            <p className="mt-5 text-lg text-white/50 max-w-xl mx-auto">{t("cta.subtitle")}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="rounded-full h-13 px-10 text-base font-semibold gap-2 bg-white hover:bg-white/92 text-[#07070E] shadow-2xl hover:-translate-y-0.5 transition-all">
                  {t("cta.button")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/30">Keine Kreditkarte · 7 Tage gratis · danach ab 49€/Monat</p>
          </div>
        </section>
      </main>

      {/* ── Sticky mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-white/8 bg-[#07070E]/95 backdrop-blur-xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-syne font-700 text-sm text-white leading-tight">7 Tage kostenlos</p>
          <p className="font-jetbrains text-[10px] text-white/40">Keine Kreditkarte · sofort live</p>
        </div>
        <Link href="/register">
          <Button size="sm" className="rounded-full bg-white hover:bg-white/90 text-[#07070E] font-semibold px-5 shrink-0">
            Starten <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-white/6 py-14 bg-white/2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <span className="font-syne font-700 text-white">{tc("appName")}</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">KI-Automatisierung für lokale Businesses.</p>
            </div>
            {[
              { title: t("footer.product"), links: [t("footer.features"), t("footer.pricing")] },
              { title: t("footer.company"), links: [t("footer.about"), t("footer.blog")] },
              { title: t("footer.legal"),   links: [t("footer.privacy"), t("footer.terms"), t("footer.imprint")] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-syne font-700 mb-3 text-sm text-white/80">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-white/40 hover:text-white/80 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
            <p>&copy; {new Date().getFullYear()} {tc("appName")}. {t("footer.copyright")}</p>
            <div className="flex items-center gap-1">
              <span>Powered by</span>
              <Brain className="h-3.5 w-3.5 text-white/40 mx-1" />
              <span>AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
