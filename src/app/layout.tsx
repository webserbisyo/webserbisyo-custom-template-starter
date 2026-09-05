import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";
import "./globals.css";

const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-event-display",
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-event-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
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
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);

  const name = identity.displayName || "Michael";
  const milestone = identity.milestoneText || "10th Birthday Special Edition";

  const eventDate =
    (data as any)?.ceremony?.eventDate ||
    (data as any)?.mainEvent?.eventDate ||
    (data as any)?.eventDateLabel ||
    "2026";

  const invitationMessage =
    (data as any)?.couple?.shortHostMessage ||
    (data as any)?.invitationMessage ||
    `Official mission dossier and celebration guide for ${name}'s ${milestone}.`;

  const cacheKey = encodeURIComponent(`${name}-${eventDate}`.replace(/\s+/g, "_"));
  const title = `${name} — ${milestone}`;
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
          alt: `${name} — ${milestone}`,
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
      statusBarStyle: "black-translucent",
      title: name,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={process.env.NODE_ENV === "development"}>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-[var(--event-bg)] text-[var(--event-text)] antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
