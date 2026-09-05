import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";
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

export const viewport: Viewport = {
  themeColor: "#FAF5F5",
};

function getMetadataBase(): URL {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
  return new URL(siteUrl);
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await loadEvent();
  const data = result.status === "available" ? result.data : null;
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);

  const raw = data as Record<string, unknown> | null;
  const celebrant = identity.displayName || (raw?.displayName as string) || "Sophia Marie Reyes";

  const eventDate =
    data?.eventDateLabel ||
    data?.ceremony?.eventDate ||
    (raw?.mainEvent as Record<string, string> | undefined)?.eventDate ||
    "2026";

  const venueName =
    data?.venue?.venueName ||
    (raw?.mainEvent as Record<string, string> | undefined)?.venueName ||
    "Shangri-La at the Fort";

  const invitationMessage =
    (data?.couple?.kind === "debut" ? data.couple.shortHostMessage : null) ||
    (raw?.invitationMessage as string) ||
    `Official celebration guide and guest program for ${celebrant}'s 18th Birthday Grand Cotillion at ${venueName}.`;

  const cacheKey = encodeURIComponent(
    `${celebrant || "debut"}-${eventDate || "2026"}`.replace(/\s+/g, "_")
  );

  const title = `${celebrant} — 18th Birthday Debut Royale`;
  const description = invitationMessage;
  const ogImageUrl = `/opengraph-image?v=${cacheKey}`;

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${celebrant} — 18th Birthday Debut Royale`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: celebrant,
    },
  };
}

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
