import type { Metadata } from "next";
import { Playfair_Display, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-debut-display",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-debut-subheading",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-debut-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sophia Eleanor — 18th Birthday Debut Royale & Grand Cotillion",
  description:
    "Luminous Rose Glam Debutante Cotillion Template — 2-Canvas Satin Alabaster & Living Coral",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={process.env.NODE_ENV === "development"}>
      <body
        className={`${playfair.variable} ${cinzel.variable} ${plusJakarta.variable} bg-[var(--debut-bg-alabaster,#FAF5F5)] text-[var(--debut-text-noir,#26131C)] antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
