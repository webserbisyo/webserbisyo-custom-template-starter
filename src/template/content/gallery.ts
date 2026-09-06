/**
 * Gallery Content Manifest (Celestial Sky — Christening Edition)
 *
 * Canonical template asset metadata for the kinetic photo gallery.
 * Matches serene christening moments, church grounds, and reception assets.
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
    alt: "The holy water baptismal rite at the church font",
    caption: "The Holy Baptismal Rite",
    folioLabel: "FOLIO // 01",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-02",
    src: "/template-assets/photos/gallery/gallery-02.webp",
    alt: "Heirloom christening robe and sacramental candle details",
    caption: "Heirloom Gown & Candle",
    folioLabel: "FOLIO // 02",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-03",
    src: "/template-assets/photos/gallery/gallery-03.webp",
    alt: "Historic church sanctuary and candlelit church altar",
    caption: "San Agustin Sanctuary",
    folioLabel: "FOLIO // 03",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-04",
    src: "/template-assets/photos/gallery/gallery-04.webp",
    alt: "Parents and godparents gathered around the child for the blessing",
    caption: "Family & Godparents Blessing",
    folioLabel: "FOLIO // 04",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-05",
    src: "/template-assets/photos/gallery/gallery-05.webp",
    alt: "Guests toasting at the thanksgiving reception banquet table",
    caption: "Thanksgiving Celebration",
    folioLabel: "FOLIO // 05",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
  {
    id: "gallery-06",
    src: "/template-assets/photos/gallery/gallery-06.webp",
    alt: "Family and guests celebrating Liam's welcome into faith",
    caption: "Welcoming Liam into Faith",
    folioLabel: "FOLIO // 06",
    width: 1792,
    height: 2400,
    orientation: "portrait",
  },
];
