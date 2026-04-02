import { Link } from "@/i18n/navigation";
import { Zap } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-2xl font-bold"
      >
        <Zap className="h-7 w-7 text-primary" />
        ReplyFlow AI
      </Link>
      {children}
    </div>
  );
}
