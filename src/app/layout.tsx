import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-wedding-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-wedding-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#304438",
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
  const eventResult = await loadEvent();
  const data = (eventResult as any)?.data || eventResult;
  const identity = deriveHostIdentity((data as any)?.couple || (data as any)?.hostInfo);

  const couple = identity.displayName || "Alex & Jamie";

  const eventDate =
    (data as any)?.ceremony?.eventDate ||
    (data as any)?.mainEvent?.eventDate ||
    (data as any)?.eventDateLabel ||
    "2026";

  const venueName =
    (data as any)?.venue?.venueName ||
    (data as any)?.mainEvent?.venueName ||
    "The Glasshouse Conservatory, Sage Estate";

  const invitationMessage =
    (data as any)?.couple?.shortHostMessage ||
    (data as any)?.invitationMessage ||
    `Official wedding invitation, schedule, and guest guide for ${couple} at ${venueName}.`;

  const cacheKey = encodeURIComponent(`${couple}-${eventDate}`.replace(/\s+/g, "_"));
  const title = `${couple} — Wedding Celebration`;
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
          alt: `${couple} — Wedding Celebration`,
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
      title: couple,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={process.env.NODE_ENV === "development"}>
      <body
        className={`${playfair.variable} ${manrope.variable} bg-[var(--wedding-bg)] text-[var(--wedding-text)] antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
