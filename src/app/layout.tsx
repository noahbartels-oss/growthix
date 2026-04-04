import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReplyFlow AI",
  description:
    "AI antwortet automatisch auf WhatsApp-Nachrichten und verwandelt sie in Termine.",
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
