import type { MetadataRoute } from "next";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const data = await loadEvent();
  const identity = deriveHostIdentity((data as any)?.couple || (data as any)?.hostInfo);
  const couple = identity.displayName || "Alex & Jamie";

  return {
    name: `${couple} — Wedding Celebration`,
    short_name: `${couple}`,
    description:
      (data as any)?.invitationMessage ||
      (data as any)?.couple?.shortHostMessage ||
      `Official wedding invitation, schedule, and guest guide for ${couple}.`,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f7f4ea",
    theme_color: "#304438",
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
