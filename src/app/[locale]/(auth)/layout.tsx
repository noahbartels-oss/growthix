import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* background decoration */}
      <div className="absolute inset-0 mesh-bg opacity-40" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />

      {/* top bar */}
      <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm">
          ReplyFlow AI
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
