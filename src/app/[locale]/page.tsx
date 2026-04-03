import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PricingCards } from "@/components/paypal/pricing-cards";
import {
  MessageSquare, CalendarCheck, Clock, BarChart3, Brain,
  Layers, Check, Zap, ArrowRight, Star,
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

      {/* ── Navbar — frontend-design: translucent, editorial ── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <span className="font-syne text-lg font-700 tracking-tight">{tc("appName")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#problem"      className="text-muted-foreground hover:text-foreground transition-colors">Problem</a>
            <a href="#features"     className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.features")}</a>
            <a href="#pricing"      className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.pricing")}</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Kunden</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm">{tc("login")}</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-cta hover:bg-cta/90 text-white shadow-md shadow-orange-600/20">
                {tc("register")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── 1. HERO — centered layout, colorful orbs ── */}
        <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-8 pb-20">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 mesh-bg opacity-30" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            {/* star rating */}
            <div className="animate-fade-up flex items-center justify-center gap-2.5 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <span className="font-jetbrains text-sm text-foreground font-500">4,9</span>
              <span className="text-sm text-muted-foreground">· 500+ Businesses vertrauen ReplyFlow</span>
            </div>

            <h1 className="animate-fade-up delay-100 font-syne text-5xl font-800 tracking-tight leading-[1.05] sm:text-6xl lg:text-[5rem]">
              Dein 24/7 Mitarbeiter für
              <br />
              <span className="gradient-text">WhatsApp &amp; Instagram.</span>
            </h1>

            <p className="animate-fade-up delay-200 mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Antwortet automatisch auf WhatsApp &amp; Instagram und bucht Termine direkt in deinen Kalender. Durchschnittlich <strong className="text-foreground">3,2× mehr Buchungen</strong> ab Tag 1.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2 h-12 px-8 text-base font-semibold bg-white hover:bg-white/90 text-[#07070E] shadow-lg hover:-translate-y-0.5 transition-all">
                  7 Tage kostenlos testen
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-12 px-7 text-base border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Jetzt ausprobieren
                </Button>
              </Link>
            </div>

            {/* trust signals */}
            <p className="animate-fade-up delay-400 mt-4 text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 justify-center">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary" />Keine Kreditkarte</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary" />Setup in 1 Minute</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary" />Jederzeit kündbar</span>
            </p>

            {/* stat pills */}
            <div className="animate-fade-up delay-500 mt-10 flex flex-wrap gap-4 justify-center">
              {[
                { icon: TrendingUp, value: "∅ +1.200€", label: "mehr Umsatz/Monat" },
                { icon: Clock,      value: "∅ 2s",       label: "Reaktionszeit"     },
                { icon: Users,      value: "500+",        label: "Businesses"         },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3">
                  <s.icon className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <div className="font-syne text-2xl font-800 leading-none tracking-tight text-foreground">{s.value}</div>
                    <div className="font-manrope text-xs font-500 text-muted-foreground mt-1 leading-none">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE — marketing-psychology: social proof, FOMO ── */}
        <div className="border-y border-border/50 bg-card/40 py-4 overflow-hidden">
          <div className="flex gap-0">
            {/* duplicate for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-marquee flex shrink-0 gap-8 pr-8">
                {marqueeItems.map((item) => (
                  <span key={item} className="font-jetbrains text-xs text-muted-foreground whitespace-nowrap tracking-wider uppercase">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── 01. PROBLEM — marketing-psychology: loss aversion, copywriting: specific numbers ── */}
        <section id="problem" className="relative py-24 overflow-hidden">
          <div className="absolute top-0 left-4 section-num select-none">01</div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <div className="label-tag mb-5">Das Problem</div>
              {/* copywriting: loss aversion headline */}
              <h2 className="font-syne text-3xl font-700 sm:text-4xl lg:text-5xl max-w-2xl">
                Jede unbeantwortete Nachricht ist
                <span className="gradient-text-cta"> bares Geld.</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl">
                74% der Kunden buchen beim Konkurrenten, wenn du nicht binnen 5 Minuten antwortest. Wie viele Buchungen verlierst du gerade?
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { num: "01", title: "Nachrichten stapeln sich",   desc: "Täglich Dutzende Anfragen auf WhatsApp & Instagram — du kommst kaum hinterher und verlierst potenzielle Kunden.", loss: "⌀ 8 verpasste Buchungen/Woche" },
                { num: "02", title: "Zu langsame Reaktion",        desc: "Wer nicht binnen Minuten antwortet, verliert. Kunden haben keine Geduld — sie schreiben einfach dem Nächsten.", loss: "74% wechseln nach 5 Min" },
                { num: "03", title: "Manuelles Buchen kostet Zeit", desc: "Hin und her schreiben, Termine koordinieren — das kostet dich Stunden pro Woche, die du im Business brauchst.", loss: "∅ 4 Std/Woche verschwendet" },
              ].map((p) => (
                <div key={p.num} className="rounded-xl border border-border/60 bg-card p-6 card-hover group">
                  <div className="font-jetbrains text-xs text-primary/50 mb-4">{p.num} /</div>
                  <h3 className="font-syne font-700 text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                  <div className="label-tag text-[10px]" style={{ color: "var(--cta)", borderColor: "rgba(255,87,34,0.25)", background: "rgba(255,87,34,0.06)" }}>
                    {p.loss}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 02. HOW IT WORKS — frontend-design: editorial numbered steps ── */}
        <section className="relative py-24 bg-card/30 border-y border-border/50 overflow-hidden">
          <div className="absolute top-0 right-4 section-num select-none">02</div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <div className="label-tag mb-5">So funktioniert&apos;s</div>
              <h2 className="font-syne text-3xl font-700 sm:text-4xl">In 3 Schritten zu mehr Buchungen</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { step: "1", title: "Business verbinden", desc: "WhatsApp & Instagram in unter 5 Minuten verbinden. Kein technisches Wissen nötig." },
                { step: "2", title: "KI einrichten",      desc: "Erkläre der KI dein Business, deine Dienstleistungen und Öffnungszeiten — fertig." },
                { step: "3", title: "Termine fließen",    desc: "Kunden schreiben, KI antwortet sofort und bucht Termine automatisch in deinen Kalender." },
              ].map((s, i) => (
                <div key={s.step} className="relative" style={{ animationDelay: `${i * 0.1}s` }}>
                  {i < 2 && <div className="hidden md:block absolute top-8 left-full w-full h-px border-t border-dashed border-border/60 z-10" />}
                  <div className="font-syne text-6xl font-800 text-primary/10 leading-none mb-4">{s.step}</div>
                  <h3 className="font-syne font-700 text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03. FEATURES — frontend-design: 2x3 editorial grid ── */}
        <section id="features" className="relative py-24 overflow-hidden">
          <div className="absolute top-0 left-4 section-num select-none">03</div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <div className="label-tag mb-5">{t("footer.features")}</div>
              <h2 className="font-syne text-3xl font-700 sm:text-4xl">{t("features.title")}</h2>
              <p className="mt-3 text-muted-foreground max-w-xl">{t("features.subtitle")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[i];
                return (
                  <div key={key} className="group rounded-xl border border-border/60 bg-card p-6 card-hover overflow-hidden relative">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/4 to-transparent" />
                    <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="relative font-syne font-700 mb-2">{t(`features.${key}.title`)}</h3>
                    <p className="relative text-sm text-muted-foreground leading-relaxed">{t(`features.${key}.description`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 04. PRICING ── */}
        <section id="pricing" className="relative py-24 bg-card/30 border-y border-border/50 overflow-hidden">
          <div className="absolute top-0 right-4 section-num select-none">04</div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <div className="label-tag mb-5">{t("footer.pricing")}</div>
              <h2 className="font-syne text-3xl font-700 sm:text-4xl">{t("pricing.title")}</h2>
              <p className="mt-3 text-muted-foreground">{t("pricing.subtitle")}</p>
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

        {/* ── 05. TESTIMONIALS — page-cro: social proof before final CTA, editorial pull-quote style ── */}
        <section id="testimonials" className="relative py-24 overflow-hidden">
          <div className="absolute top-0 left-4 section-num select-none">05</div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <div className="label-tag mb-5">Kundenstimmen</div>
              <h2 className="font-syne text-3xl font-700 sm:text-4xl">{t("testimonials.title")}</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {(t.raw("testimonials.items") as Array<{ quote: string; author: string; role: string }>).map((item, i) => (
                <div key={item.author} className="rounded-xl border border-border/60 bg-card p-6 card-hover relative overflow-hidden">
                  {/* large decorative quote mark */}
                  <div className="absolute -top-2 -right-1 font-syne text-8xl font-800 text-primary/6 leading-none select-none">"</div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold shrink-0 font-syne"
                      style={{ background: `hsl(${(i * 60 + 160) % 360}, 50%, 35%)`, color: `hsl(${(i * 60 + 160) % 360}, 80%, 90%)` }}
                    >
                      {item.author[0]}
                    </div>
                    <div>
                      <p className="font-syne font-700 text-sm">{item.author}</p>
                      <p className="font-jetbrains text-[10px] text-muted-foreground tracking-wide">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ — page-cro: objection handling before final CTA (highest-impact section) ── */}
        <section className="relative py-24 bg-card/30 border-y border-border/50 overflow-hidden">
          <div className="absolute top-0 right-4 section-num select-none">06</div>
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="label-tag inline-flex mb-5">Häufige Fragen</div>
              <h2 className="font-syne text-3xl font-700 sm:text-4xl">Noch Fragen? Wir antworten.</h2>
              <p className="mt-3 text-muted-foreground">Genau wie deine Kunden — nur schneller.</p>
            </div>
            <div className="space-y-3">
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
                  a: "Du entscheidest, ob du weitermachst. Keine automatische Verlängerung ohne deine Zustimmung, keine versteckten Kosten. Starter ab 49€/Monat — im Vergleich zu 1.200€ durchschnittlichem Mehrertrag.",
                },
                {
                  q: "Funktioniert das auch mit Instagram, nicht nur WhatsApp?",
                  a: "Ja — beide Kanäle sind von Anfang an dabei. WhatsApp, Instagram Direct Messages, alles in einem Dashboard. Pro-Plan schaltet beide Kanäle frei.",
                },
              ].map((faq, i) => (
                <details key={i} className="group rounded-xl border border-border/60 bg-card overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-syne font-700 text-sm list-none hover:bg-card/80 transition-colors">
                    {faq.q}
                    <span className="shrink-0 text-primary font-jetbrains text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA — page-cro: after social proof, risk-free, high contrast ── */}
        <section className="py-24 bg-card/40 border-t border-border/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            {/* big mint glow behind */}
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-primary/5 blur-3xl rounded-full" />
              <div className="relative">
                <div className="label-tag inline-flex mb-6">
                  <Zap className="h-3 w-3" /> Jetzt starten — kostenlos
                </div>
                <h2 className="font-syne text-4xl font-800 sm:text-5xl lg:text-6xl tracking-tight">
                  {t("cta.title")}
                </h2>
                <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">{t("cta.subtitle")}</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register">
                    <Button size="lg" className="h-13 px-10 text-base font-semibold gap-2 bg-cta hover:bg-cta/90 text-white shadow-xl shadow-orange-600/25 hover:-translate-y-0.5 transition-all">
                      {t("cta.button")} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Keine Kreditkarte · 7 Tage gratis · danach ab 49€/Monat</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Sticky mobile CTA bar — page-cro: always-visible CTA on mobile ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl px-4 py-3 flex items-center gap-3 shadow-2xl shadow-black/40">
        <div className="flex-1 min-w-0">
          <p className="font-syne font-700 text-sm leading-tight">7 Tage kostenlos</p>
          <p className="font-jetbrains text-[10px] text-muted-foreground">Keine Kreditkarte · sofort live</p>
        </div>
        <Link href="/register">
          <Button size="sm" className="bg-cta hover:bg-cta/90 text-white font-semibold px-5 shrink-0 shadow-md shadow-orange-600/25">
            Starten <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 py-14 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary shadow-sm">
                  <Zap className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-bold">{tc("appName")}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">KI-Automatisierung für lokale Businesses.</p>
            </div>
            {[
              { title: t("footer.product"), links: [t("footer.features"), t("footer.pricing")] },
              { title: t("footer.company"), links: [t("footer.about"), t("footer.blog")] },
              { title: t("footer.legal"),   links: [t("footer.privacy"), t("footer.terms"), t("footer.imprint")] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {tc("appName")}. {t("footer.copyright")}</p>
            <div className="flex items-center gap-1">
              <span>Powered by</span>
              <Brain className="h-3.5 w-3.5 text-primary mx-1" />
              <span>AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
