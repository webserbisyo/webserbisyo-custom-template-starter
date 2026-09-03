// TEMPLATE ASSET MANIFEST.
// Local asset references for current template artwork and local images.
// Visual assets (Hero, Gallery, Story, Venue) are managed locally by template designers.
// Connected platform data owns event text, dates, and Gift QR codes.

export type TemplateAssets = {
  photos: {
    hero?: string;
    gallery: string[];
    story: string[];
    venue?: string;
    [key: string]: unknown;
  };
  decorations: Record<string, string>;
  backgrounds: Record<string, string>;
  illustrations: Record<string, string>;
  icons: Record<string, string>;
};

export const templateAssets: TemplateAssets = {
  photos: {
    hero: "/template-assets/photos/hero/debut-portrait.webp",
    gallery: [
      "/template-assets/photos/gallery/debut-ballroom.webp",
      "/template-assets/photos/gallery/debut-gown.webp",
      "/template-assets/photos/gallery/debut-silhouette.webp",
      "/template-assets/photos/gallery/debut-toast.webp",
      "/template-assets/photos/gallery/debut-table.webp",
    ],
    story: ["/template-assets/photos/story/debut-chronicle.webp"],
    venue: "/template-assets/photos/venue/debut-venue.webp",
  },
  decorations: {
    qrDemo: "/template-assets/decorations/qr-demo.svg",
  },
  backgrounds: {},
  illustrations: {},
  icons: {},
};
