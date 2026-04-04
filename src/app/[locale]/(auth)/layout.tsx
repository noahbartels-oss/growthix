import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden" style={{ background: "#080810" }}>
      {/* orbs — same as landing page */}
      <div className="absolute inset-0 hero-glow opacity-60" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 30%, rgba(8,8,16,0.95) 100%)" }} />

      {/* top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <span className="text-white text-[10px] font-bold">R</span>
          </div>
          <span className="font-syne text-sm font-700 text-white">ReplyFlow AI</span>
        </Link>
        <LanguageSwitcher />
      </div>

      {/* card */}
      <div className="relative z-10 w-full max-w-sm px-4">
        {children}
      </div>
    </div>
  );
}
