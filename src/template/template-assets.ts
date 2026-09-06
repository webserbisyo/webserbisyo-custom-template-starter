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
    hero: "/template-assets/photos/hero/baby-hero.webp",
    gallery: [
      "/template-assets/photos/gallery/gallery-01.webp",
      "/template-assets/photos/gallery/gallery-02.webp",
      "/template-assets/photos/gallery/gallery-03.webp",
      "/template-assets/photos/gallery/gallery-04.webp",
      "/template-assets/photos/gallery/gallery-05.webp",
      "/template-assets/photos/gallery/gallery-06.webp",
    ],
    story: ["/template-assets/photos/story/baby-story.webp"],
    venue: "/template-assets/photos/venue/venue-church.webp",
  },
  decorations: {
    qrDemo: "/template-assets/decorations/qr-demo.svg",
  },
  backgrounds: {
    pattern01: "/template-assets/backgrounds/pattern-01-celestial.webp",
    pattern02: "/template-assets/backgrounds/pattern-02-doves.webp",
    pattern03: "/template-assets/backgrounds/pattern-03-floral.webp",
    pattern04: "/template-assets/backgrounds/pattern-04-lace.webp",
  },
  illustrations: {},
  icons: {},
};
