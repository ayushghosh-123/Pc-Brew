import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pcbrew // Autonomous Agentic Terminal & Remote Controller",
  description: "pcbrew - Autonomous Agentic Coding Terminal, WhatsApp Laptop Controller & Telegram Gateway documentation and interactive console.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-agent-bg text-slate-200 antialiased selection:bg-agent-accent selection:text-black">
        {children}
      </body>
    </html>
  );
}
