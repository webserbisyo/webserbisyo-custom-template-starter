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
    src: "",
    alt: "Grand Cotillion ballroom celebration arch",
    caption: "The Grand Ballroom",
    folioLabel: "FOLIO // 01",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-02",
    src: "",
    alt: "Portrait of the debutante in her couture evening gown",
    caption: "The Debutante",
    folioLabel: "FOLIO // 02",
    width: 1536,
    height: 2752,
    orientation: "portrait",
  },
  {
    id: "gallery-03",
    src: "",
    alt: "Evening silhouette in the grand hall",
    caption: "Midnight Silhouette",
    folioLabel: "FOLIO // 03",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-04",
    src: "",
    alt: "Eighteen roses celebratory toast",
    caption: "Celebration Toast",
    folioLabel: "FOLIO // 04",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-05",
    src: "",
    alt: "Candlelit gala dining table setting",
    caption: "Gala Table Setting",
    folioLabel: "FOLIO // 05",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-06",
    src: "",
    alt: "Grand ballroom chandelier and cotillion dance floor",
    caption: "Cotillion Chandelier",
    folioLabel: "FOLIO // 06",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
];
