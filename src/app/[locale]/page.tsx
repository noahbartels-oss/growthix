import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";

const featureIcons = [MessageSquare, CalendarCheck, Clock, BarChart3, Brain, Layers];
const featureKeys = [
  "autoReply",
  "booking",
  "available",
  "analytics",
  "personalized",
  "multichannel",
] as const;

export default function LandingPage() {
  const t = useTranslations("landing");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">{tc("appName")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">
              {t("footer.features")}
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition">
              {t("footer.pricing")}
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition">
              {t("testimonials.title")}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {tc("login")}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">{tc("register")}</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(109,40,217,0.15),transparent)]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              AI-Powered
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2 text-base px-8">
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-base px-8">
                {t("hero.secondaryCta")}
              </Button>
            </div>
            {/* Chat mockup */}
            <div className="mx-auto mt-16 max-w-lg">
              <Card className="text-left">
                <CardContent className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 text-xs font-bold shrink-0">
                      K
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2 text-sm">
                      Hallo, ich möchte einen Termin buchen 💇‍♀️
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-2 text-sm max-w-[280px]">
                      Hallo! 👋 Gerne! Wir haben morgen um 10:00 oder 14:00 Uhr noch freie Termine.
                      Welche Zeit passt dir besser?
                      <div className="mt-1 flex items-center gap-1 text-xs opacity-75">
                        <Brain className="h-3 w-3" />
                        AI-generiert
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                      AI
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 text-xs font-bold shrink-0">
                      K
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2 text-sm">
                      14:00 Uhr bitte! 🙏
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-2 text-sm max-w-[280px]">
                      Perfekt! Dein Termin ist bestätigt: Morgen um 14:00 Uhr ✅ Bis dann!
                      <div className="mt-1 flex items-center gap-1 text-xs opacity-75">
                        <Brain className="h-3 w-3" />
                        AI-generiert
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                      AI
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("features.title")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("features.subtitle")}
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[i];
                return (
                  <Card key={key} className="border-0 bg-card shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {t(`features.${key}.title`)}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {t(`features.${key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("pricing.title")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("pricing.subtitle")}
              </p>
            </div>
            <div className="grid gap-8 max-w-4xl mx-auto md:grid-cols-2">
              {/* Starter */}
              <Card className="relative">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold">{t("pricing.starter.name")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("pricing.starter.description")}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold">{t("pricing.starter.price")}</span>
                    <span className="text-lg text-muted-foreground">{t("pricing.starter.period")}</span>
                  </div>
                  <ul className="mt-8 space-y-3">
                    {(t.raw("pricing.starter.features") as string[]).map((feature: string) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block mt-8">
                    <Button variant="outline" className="w-full">
                      {t("pricing.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              {/* Pro */}
              <Card className="relative border-primary shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="px-4 py-1">{t("pricing.pro.badge")}</Badge>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold">{t("pricing.pro.name")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("pricing.pro.description")}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold">{t("pricing.pro.price")}</span>
                    <span className="text-lg text-muted-foreground">{t("pricing.pro.period")}</span>
                  </div>
                  <ul className="mt-8 space-y-3">
                    {(t.raw("pricing.pro.features") as string[]).map((feature: string) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block mt-8">
                    <Button className="w-full">{t("pricing.cta")}</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("testimonials.title")}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {(
                t.raw("testimonials.items") as Array<{
                  quote: string;
                  author: string;
                  role: string;
                }>
              ).map((item) => (
                <Card key={item.author} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-warning text-warning"
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-sm">{item.author}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
                  {t("cta.subtitle")}
                </p>
                <Link href="/register" className="inline-block mt-8">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 text-base px-8 gap-2"
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

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-bold">{tc("appName")}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("hero.subtitle").slice(0, 80)}...
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t("footer.product")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition">{t("footer.features")}</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition">{t("footer.pricing")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t("footer.company")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">{t("footer.about")}</a></li>
                <li><a href="#" className="hover:text-foreground transition">{t("footer.blog")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t("footer.legal")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">{t("footer.privacy")}</a></li>
                <li><a href="#" className="hover:text-foreground transition">{t("footer.terms")}</a></li>
                <li><a href="#" className="hover:text-foreground transition">{t("footer.imprint")}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {tc("appName")}. {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
}
