import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  MessageSquare,
  CalendarCheck,
  Clock,
  BarChart3,
  Brain,
  Layers,
  Check,
  Zap,
  ArrowRight,
  Star,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

const featureIcons = [MessageSquare, CalendarCheck, Clock, BarChart3, Brain, Layers];
const featureKeys = ["autoReply", "booking", "available", "analytics", "personalized", "multichannel"] as const;

const stats = [
  { icon: TrendingUp, value: "+40%", label: "Mehr Termine" },
  { icon: Clock, value: "24/7", label: "Verfügbar" },
  { icon: Users, value: "500+", label: "Businesses" },
  { icon: MessageSquare, value: "98%", label: "Antwortrate" },
];

export default function LandingPage() {
  const t = useTranslations("landing");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">{tc("appName")}</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {["features", "pricing", "testimonials"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {s === "features" ? t("footer.features")
                  : s === "pricing" ? t("footer.pricing")
                  : t("testimonials.title")}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium">{tc("login")}</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="font-medium shadow-md shadow-primary/25">
                {tc("register")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          {/* background layers */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 mesh-gradient" />
          {/* decorative orbs */}
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">

              {/* badge */}
              <div className="animate-fade-up mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  KI-gestützte Automatisierung
                </span>
              </div>

              {/* headline */}
              <h1 className="animate-fade-up delay-100 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]">
                <span className="gradient-text">{t("hero.title").split(".")[0]}.</span>
                <br />
                <span className="text-foreground">{t("hero.title").split(".").slice(1).join(".").trim()}</span>
              </h1>

              <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>

              {/* CTAs */}
              <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row items-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="gap-2.5 text-base px-8 h-12 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {t("hero.cta")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 h-12 border-border/60 hover:bg-muted/50"
                >
                  {t("hero.secondaryCta")}
                </Button>
              </div>

              {/* trust line */}
              <p className="animate-fade-up delay-400 mt-5 text-sm text-muted-foreground">
                ✓ Keine Kreditkarte nötig &nbsp;·&nbsp; ✓ 14 Tage kostenlos &nbsp;·&nbsp; ✓ Jederzeit kündbar
              </p>

              {/* Stats row */}
              <div className="animate-fade-up delay-500 mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 w-full max-w-3xl">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="glass rounded-2xl p-4 text-center card-hover"
                  >
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <s.icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Chat mockup */}
              <div className="animate-float mt-16 w-full max-w-sm">
                <div className="glass rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden">
                  {/* chat header */}
                  <div className="flex items-center gap-3 border-b border-border/50 bg-muted/30 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">
                      K
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-semibold">Kunde via WhatsApp</p>
                      <p className="text-[10px] text-green-500">● Online</p>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                      <MessageSquare className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  {/* messages */}
                  <div className="space-y-3 p-4 bg-card/50">
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold shrink-0">K</div>
                      <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-xs max-w-[200px]">
                        Ich möchte einen Termin buchen 💇‍♀️
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-3 py-2 text-xs max-w-[220px]">
                        Hallo! 👋 Wir haben morgen um 10:00 oder 14:00 Uhr freie Termine. Welche Zeit passt dir?
                        <div className="mt-1 flex items-center gap-1 opacity-70 text-[10px]">
                          <Brain className="h-2.5 w-2.5" /> KI-generiert · sofort
                        </div>
                      </div>
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">AI</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold shrink-0">K</div>
                      <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-xs">14:00 Uhr! 🙏</div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-3 py-2 text-xs max-w-[220px]">
                        ✅ Bestätigt! Morgen 14:00 Uhr. Bis dann!
                      </div>
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">AI</div>
                    </div>
                  </div>
                </div>
                {/* floating badge */}
                <div className="animate-bounce-in delay-500 absolute -right-4 -bottom-3 glass rounded-xl px-3 py-2 text-xs font-medium shadow-lg">
                  <span className="text-success">✓</span> Termin gebucht in 45 Sek.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────────── */}
        <section id="features" className="py-24 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">{t("footer.features")}</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t("features.title")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("features.subtitle")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[i];
                const gradients = [
                  "from-violet-500 to-purple-600",
                  "from-blue-500 to-cyan-600",
                  "from-emerald-500 to-teal-600",
                  "from-orange-500 to-amber-600",
                  "from-pink-500 to-rose-600",
                  "from-indigo-500 to-blue-600",
                ];
                return (
                  <div
                    key={key}
                    className="group relative rounded-2xl border border-border/60 bg-card p-6 card-hover overflow-hidden"
                  >
                    {/* subtle gradient glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
                    <div className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[i]} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="relative text-base font-semibold mb-2">
                      {t(`features.${key}.title`)}
                    </h3>
                    <p className="relative text-sm text-muted-foreground leading-relaxed">
                      {t(`features.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Pricing ────────────────────────────────────────────── */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Pricing</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t("pricing.title")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid gap-8 max-w-4xl mx-auto md:grid-cols-2 items-start">
              {/* Starter */}
              <div className="rounded-2xl border border-border bg-card p-8 card-hover">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{t("pricing.starter.name")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("pricing.starter.description")}</p>
                </div>
                <div className="flex items-end gap-1 mb-8">
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

              {/* Pro */}
              <div className="relative rounded-2xl bg-gradient-to-br from-primary to-indigo-600 p-[1px] shadow-2xl shadow-primary/30 card-hover">
                <div className="rounded-2xl bg-card p-8 h-full">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      {t("pricing.pro.badge")}
                    </span>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">{t("pricing.pro.name")}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t("pricing.pro.description")}</p>
                  </div>
                  <div className="flex items-end gap-1 mb-8">
                    <span className="text-5xl font-extrabold">{t("pricing.pro.price")}€</span>
                    <span className="text-muted-foreground pb-1">{t("pricing.pro.period")}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {(t.raw("pricing.pro.features") as string[]).map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button className="w-full h-11 font-medium shadow-lg shadow-primary/30">
                      {t("pricing.cta")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────────── */}
        <section id="testimonials" className="py-24 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Kundenstimmen</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("testimonials.title")}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {(t.raw("testimonials.items") as Array<{ quote: string; author: string; role: string }>).map((item, i) => (
                <div
                  key={item.author}
                  className="relative rounded-2xl border border-border/60 bg-card p-6 card-hover"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* quote mark */}
                  <div className="absolute top-4 right-5 text-5xl font-serif text-primary/10 leading-none select-none">"</div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-indigo-500 text-white text-sm font-bold">
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

        {/* ── CTA Banner ─────────────────────────────────────────── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-violet-600 to-indigo-600 px-8 py-20 text-center text-white animate-gradient">
              {/* noise overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
              <div className="absolute top-8 left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute bottom-8 right-8 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium mb-6">
                  <Zap className="h-3.5 w-3.5" /> Jetzt starten
                </span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl max-w-2xl mx-auto">
                  {t("cta.title")}
                </h2>
                <p className="mt-4 text-lg opacity-80 max-w-xl mx-auto">
                  {t("cta.subtitle")}
                </p>
                <Link href="/register" className="inline-block mt-8">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/95 text-base px-10 h-12 font-semibold gap-2 shadow-2xl"
                  >
                    {t("cta.button")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t py-14 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-bold">{tc("appName")}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                KI-gestützte Automatisierung für lokale Businesses.
              </p>
            </div>
            {[
              { title: t("footer.product"), links: [t("footer.features"), t("footer.pricing")] },
              { title: t("footer.company"), links: [t("footer.about"), t("footer.blog")] },
              { title: t("footer.legal"), links: [t("footer.privacy"), t("footer.terms"), t("footer.imprint")] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {tc("appName")}. {t("footer.copyright")}</p>
            <div className="flex items-center gap-1">
              <span>Gebaut mit</span>
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>für lokale Businesses</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
