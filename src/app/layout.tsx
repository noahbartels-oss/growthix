import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BewerbungsKI – Bewerbungsschreiben in 60 Sekunden",
  description:
    "KI schreibt deinen individuellen Bewerbungsbrief in unter 60 Sekunden. Professionell, auf die Stelle zugeschnitten. Nur 6,99 € zum Download.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full antialiased" suppressHydrationWarning style={{ overflowX: "hidden" }}>
      <body className="min-h-full flex flex-col font-sans" style={{ overflowX: "hidden" }}>{children}</body>
    </html>
  );
}
