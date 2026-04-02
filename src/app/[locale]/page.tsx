import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  MessageSquare, CalendarCheck, Clock, BarChart3, Brain,
  Layers, Check, Zap, ArrowRight, Star, Sparkles,
  TrendingUp, Users, AlertCircle,
} from "lucide-react";

const featureIcons = [MessageSquare, CalendarCheck, Clock, BarChart3, Brain, Layers];
const featureGradients = [
  "from-indigo-500 to-violet-600",
  "from-emerald-500 to-teal-600",
  "from-sky-500 to-blue-600",
  "from-orange-500 to-amber-600",
  "from-purple-500 to-pink-600",
  "from-cyan-500 to-indigo-600",
];
const featureKeys = ["autoReply", "booking", "available", "analytics", "personalized", "multichannel"] as const;

export default function LandingPage() {
  const t  = useTranslations("landing");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">{tc("appName")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#problem"      className="text-muted-foreground hover:text-foreground transition-colors duration-200">Problem</a>
            <a href="#features"     className="text-muted-foreground hover:text-foreground transition-colors duration-200">{t("footer.features")}</a>
            <a href="#pricing"      className="text-muted-foreground hover:text-foreground transition-colors duration-200">{t("footer.pricing")}</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Kunden</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium">{tc("login")}</Button>
            </Link>
            <Link href="/register">
              {/* skill: CTA #F97316 orange */}
              <Button size="sm" className="font-medium bg-cta hover:bg-cta/90 text-white shadow-md shadow-orange-500/25">
                {tc("register")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── 1. HERO ── */}
        <section className="relative pt-20 pb-28 overflow-hidden">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 mesh-bg" />
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-accent/8 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            {/* badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary mb-7">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered · WhatsApp &amp; Instagram
            </div>

            {/* headline — skill: bold, display font */}
            <h1 className="animate-fade-up delay-100 max-w-4xl mx-auto text-5xl font-extrabold tracking-tight leading-[1.1] sm:text-6xl lg:text-7xl">
              <span className="gradient-text">{t("hero.title").split(".")[0]}.</span>{" "}
              <br className="hidden sm:block" />
              <span>{t("hero.title").split(".").slice(1).join(".").trim()}</span>
            </h1>

            <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* CTAs — skill: one primary CTA */}
            <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="gap-2 text-base px-9 h-12 font-semibold bg-cta hover:bg-cta/90 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-base px-8 h-12 border-border hover:bg-muted/50">
                {t("hero.secondaryCta")}
              </Button>
            </div>

            {/* trust signals */}
            <p className="animate-fade-up delay-400 mt-5 text-sm text-muted-foreground">
              ✓ Keine Kreditkarte &nbsp;·&nbsp; ✓ 14 Tage kostenlos &nbsp;·&nbsp; ✓ Jederzeit kündbar
            </p>

            {/* social proof numbers */}
            <div className="animate-fade-up delay-500 mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl mx-auto">
              {[
                { icon: TrendingUp, value: "+40%",  label: "Mehr Termine" },
                { icon: Clock,      value: "24/7",  label: "Verfügbar"    },
                { icon: Users,      value: "500+",  label: "Businesses"   },
                { icon: MessageSquare, value: "98%",label: "Antwortrate"  },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center card-hover">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* AI-native chat mockup — skill: Interactive Demo */}
            <div className="animate-float mt-16 mx-auto w-full max-w-sm">
              <div className="glass rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden text-left">
                {/* header */}
                <div className="flex items-center gap-3 border-b border-border/50 bg-card/60 px-4 py-3">
                  <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">K</div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold leading-none">Kunde via WhatsApp</p>
                    <p className="text-[10px] text-accent mt-0.5 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
                      Online
                    </p>
                  </div>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </div>
                {/* messages — skill: chat bubble layout */}
                <div className="space-y-3 bg-card/40 px-4 py-4">
                  {/* customer message — right-aligned */}
                  <div className="flex justify-end">
                    <div
                      className="max-w-[80%] rounded-2xl rounded-tr-sm px-3 py-2 text-xs text-white"
                      style={{ background: "var(--user-bubble-bg)", color: "var(--foreground)" }}
                    >
                      Ich möchte einen Termin buchen 💇‍♀️
                    </div>
                  </div>
                  {/* typing indicator (3-dot pulse) */}
                  <div className="typing-indicator w-fit">
                    <span /><span /><span />
                  </div>
                  {/* AI reply */}
                  <div
                    className="max-w-[90%] rounded-2xl rounded-tl-sm border border-border/60 px-3 py-2 text-xs"
                    style={{ background: "var(--ai-bubble-bg)" }}
                  >
                    Hallo! 👋 Morgen um <strong>10:00</strong> oder <strong>14:00</strong> Uhr — welche Zeit passt?
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-primary/70">
                      <Brain className="h-2.5 w-2.5" /> KI · sofort geantwortet
                    </div>
                  </div>
                  {/* customer reply */}
                  <div className="flex justify-end">
                    <div
                      className="rounded-2xl rounded-tr-sm px-3 py-2 text-xs"
                      style={{ background: "var(--user-bubble-bg)", color: "var(--foreground)" }}
                    >
                      14:00 Uhr bitte!
                    </div>
                  </div>
                  {/* AI confirmation */}
                  <div
                    className="max-w-[90%] rounded-2xl rounded-tl-sm border border-accent/30 px-3 py-2 text-xs"
                    style={{ background: "var(--ai-bubble-bg)" }}
                  >
                    <span className="text-accent font-semibold">✓ Bestätigt!</span> Morgen 14:00 Uhr. Bis dann!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. PROBLEM (skill: problem statement section) ── */}
        <section id="problem" className="py-20 bg-foreground/[0.02] border-y border-border/40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <AlertCircle className="h-3 w-3" /> Das Problem
              </Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">Kennst du das?</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { emoji: "📱", title: "Zu viele Nachrichten",   desc: "Täglich kommen Dutzende Anfragen auf WhatsApp & Instagram — du kommst nicht hinterher." },
                { emoji: "⏰", title: "Zu langsame Antworten",  desc: "Wer nicht binnen Minuten antwortet, verliert den Kunden an die Konkurrenz." },
                { emoji: "📅", title: "Verpasste Termine",      desc: "Jede unbeantwortete Buchungsanfrage ist direkter Umsatzverlust." },
              ].map((p) => (
                <div key={p.title} className="context-card py-4 rounded-r-xl card-hover">
                  <div className="text-2xl mb-2">{p.emoji}</div>
                  <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. SOLUTION / FEATURES ── */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">{t("footer.features")}</Badge>
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{t("features.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t("features.subtitle")}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[i];
                return (
                  <div
                    key={key}
                    className="group relative rounded-2xl border border-border/60 bg-card p-6 card-hover overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/4 to-transparent" />
                    <div className={`relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${featureGradients[i]} shadow-md`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="relative font-semibold mb-2 text-sm">{t(`features.${key}.title`)}</h3>
                    <p className="relative text-sm text-muted-foreground leading-relaxed">{t(`features.${key}.description`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. PRICING ── */}
        <section id="pricing" className="py-24 bg-foreground/[0.02] border-y border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <Badge variant="secondary" className="mb-4">Pricing</Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">{t("pricing.title")}</h2>
              <p className="mt-3 text-muted-foreground">{t("pricing.subtitle")}</p>
            </div>
            <div className="grid gap-8 max-w-4xl mx-auto md:grid-cols-2 items-start">
              {/* Starter */}
              <div className="rounded-2xl border border-border bg-card p-8 card-hover">
                <h3 className="text-xl font-bold">{t("pricing.starter.name")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t("pricing.starter.description")}</p>
                <div className="flex items-end gap-1 my-6">
                  <span className="text-5xl font-extrabold">{t("pricing.starter.price")}€</span>
                  <span className="text-muted-foreground pb-1">{t("pricing.starter.period")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {(t.raw("pricing.starter.features") as string[]).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button variant="outline" className="w-full h-11 font-medium">{t("pricing.cta")}</Button>
                </Link>
              </div>

              {/* Pro — gradient border */}
              <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-br from-primary via-violet-500 to-indigo-600 shadow-xl shadow-primary/25 card-hover">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow-md">
                    <Sparkles className="h-3 w-3" /> {t("pricing.pro.badge")}
                  </span>
                </div>
                <div className="rounded-2xl bg-card p-8">
                  <h3 className="text-xl font-bold">{t("pricing.pro.name")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("pricing.pro.description")}</p>
                  <div className="flex items-end gap-1 my-6">
                    <span className="text-5xl font-extrabold">{t("pricing.pro.price")}€</span>
                    <span className="text-muted-foreground pb-1">{t("pricing.pro.period")}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {(t.raw("pricing.pro.features") as string[]).map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button className="w-full h-11 font-semibold shadow-md shadow-primary/25">{t("pricing.cta")}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. TESTIMONIALS (skill: social proof before CTA) ── */}
        <section id="testimonials" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <Badge variant="secondary" className="mb-4">Kundenstimmen</Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">{t("testimonials.title")}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {(t.raw("testimonials.items") as Array<{ quote: string; author: string; role: string }>).map((item, i) => (
                <div key={item.author} className="relative rounded-2xl border border-border/60 bg-card p-6 card-hover">
                  <div className="absolute top-4 right-5 text-5xl font-serif text-primary/8 leading-none select-none">"</div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-bold shrink-0"
                      style={{ background: `hsl(${(i * 80 + 240) % 360}, 60%, 55%)` }}
                    >
                      {item.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.author}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CTA (skill: vibrant, after social proof) ── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-violet-600 to-indigo-700 px-8 py-20 text-center text-white animate-gradient">
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
              }} />
              <div className="absolute top-0 left-1/4 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium mb-6">
                  <Zap className="h-3.5 w-3.5" /> Jetzt starten — kostenlos
                </div>
                <h2 className="text-3xl font-bold sm:text-5xl max-w-2xl mx-auto tracking-tight">{t("cta.title")}</h2>
                <p className="mt-4 text-lg opacity-80 max-w-xl mx-auto">{t("cta.subtitle")}</p>
                <Link href="/register" className="inline-block mt-8">
                  {/* skill: CTA button — vibrant, distinct from section */}
                  <Button
                    size="lg"
                    className="bg-cta hover:bg-cta/90 text-white text-base px-10 h-12 font-semibold gap-2 shadow-2xl shadow-orange-500/30 border-0"
                  >
                    {t("cta.button")} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 py-14 bg-card/50">
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
