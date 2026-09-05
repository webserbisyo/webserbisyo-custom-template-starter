import type { MetadataRoute } from "next";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const data = await loadEvent();
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);
  const celebrant = identity.displayName || "Birthday Celebration";
  const firstName = celebrant.split(" ")[0] || "Birthday";
  const milestone = identity.milestoneText || "Special Edition";

  return {
    name: `${celebrant} — ${milestone}`,
    short_name: `${firstName}'s Birthday`,
    description:
      (data as any)?.invitationMessage ||
      (data as any)?.couple?.shortHostMessage ||
      `Official mission dossier and celebration guide for ${celebrant}'s ${milestone}.`,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    categories: ["events", "social", "lifestyle", "kids"],
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
