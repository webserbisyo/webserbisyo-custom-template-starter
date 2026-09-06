import type { MetadataRoute } from "next";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity, getSingleHostFirstName } from "@/template/utils/host-identity";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const result = await loadEvent();
  const data = result.status === "available" ? result.data : null;
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);
  const celebrant = identity.displayName || "Liam Santos";
  const firstName = getSingleHostFirstName(celebrant) || celebrant.split(" ")[0] || "Liam";
  const invitationMessage =
    (data?.couple?.kind === "baptism" ? data.couple.shortHostMessage : null) ||
    (data as Record<string, unknown> | null)?.invitationMessage?.toString() ||
    `Official celebration guide and guest program for ${celebrant}'s Holy Baptism.`;

  return {
    name: `${celebrant} — The Holy Baptism`,
    short_name: `${firstName}'s Baptism`,
    description: invitationMessage,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#F8FAFC",
    theme_color: "#F8FAFC",
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
