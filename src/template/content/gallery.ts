/**
 * Gallery Content Manifest (Debut Rose Glam Edition)
 *
 * Canonical template asset metadata for the kinetic photo gallery.
 * Matches high-resolution debut photoshoot and ballroom assets.
 */

export type GalleryOrientation = "portrait" | "landscape" | "square";

export interface GalleryPhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  folioLabel: string;
  width: number;
  height: number;
  orientation: GalleryOrientation;
}

export const galleryPhotos: GalleryPhotoItem[] = [
  {
    id: "gallery-01",
    src: "/template-assets/photos/gallery/gallery-01.webp",
    alt: "Debutante dancing the Grand Cotillion waltz in the ballroom",
    caption: "The Grand Cotillion Waltz",
    folioLabel: "FOLIO // 01",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-02",
    src: "/template-assets/photos/gallery/gallery-02.webp",
    alt: "Hand resting on couture debutante ballgown bodice with crystal embellishments",
    caption: "Couture Gown Details",
    folioLabel: "FOLIO // 02",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-03",
    src: "/template-assets/photos/gallery/gallery-03.webp",
    alt: "Guests and escorts in formal evening attire mingling at the grand foyer cocktail",
    caption: "Grand Foyer Reception",
    folioLabel: "FOLIO // 03",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-04",
    src: "/template-assets/photos/gallery/gallery-04.webp",
    alt: "Father and daughter dancing the sentimental eighteen roses dance",
    caption: "The Eighteen Roses Dance",
    folioLabel: "FOLIO // 04",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-05",
    src: "/template-assets/photos/gallery/gallery-05.webp",
    alt: "Guests toasting with champagne flutes at the candlelit banquet gala table",
    caption: "Gala Dinner Toast",
    folioLabel: "FOLIO // 05",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-06",
    src: "/template-assets/photos/gallery/gallery-06.webp",
    alt: "Youth and cotillion court celebrating with confetti at the midnight afterparty",
    caption: "Midnight Celebration",
    folioLabel: "FOLIO // 06",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
];
