import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BewerbungsKI – Bewerbungsschreiben in 60 Sekunden",
  description:
    "KI schreibt deinen individuellen Bewerbungsbrief in unter 60 Sekunden. Professionell, auf die Stelle zugeschnitten. Nur 7 € zum Download.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
