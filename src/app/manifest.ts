import type { MetadataRoute } from "next";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity, getSingleHostFirstName } from "@/template/utils/host-identity";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const result = await loadEvent();
  const data = result.status === "available" ? result.data : null;
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);
  const celebrant = identity.displayName || "Sophia Marie Reyes";
  const firstName = getSingleHostFirstName(celebrant) || celebrant.split(" ")[0] || "Debut";
  const invitationMessage =
    (data?.couple?.kind === "debut" ? data.couple.shortHostMessage : null) ||
    (data as Record<string, unknown> | null)?.invitationMessage?.toString() ||
    `Official celebration guide and guest program for ${celebrant}'s 18th Birthday Grand Cotillion.`;

  return {
    name: `${celebrant} — 18th Birthday Debut Royale`,
    short_name: `${firstName}'s Debut`,
    description: invitationMessage,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#FAF5F5",
    theme_color: "#FAF5F5",
    categories: ["events", "social", "lifestyle"],
    icons: [
      {
        src: "/template-assets/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/template-assets/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/template-assets/icons/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
