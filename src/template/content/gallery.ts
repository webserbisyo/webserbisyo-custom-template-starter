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
  title?: string;
  folioLabel: string;
  width: number;
  height: number;
  orientation: GalleryOrientation;
}

export const galleryPhotos: GalleryPhotoItem[] = [
  {
    id: "gallery-01",
    src: "/template-assets/photos/gallery/gallery-01.webp",
    alt: "Sacramental Keepsakes - Heirloom Christening gown, booties, and gold baptismal cross",
    title: "Sacramental Keepsakes",
    caption: "Heirloom Christening gown, booties, and gold baptismal cross.",
    folioLabel: "FOLIO // 01",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-02",
    src: "/template-assets/photos/gallery/gallery-02.webp",
    alt: "A Mother's Gentle Touch - Liam's tiny hand holding his mother's finger",
    title: "A Mother's Gentle Touch",
    caption: "Liam's tiny hand holding his mother's finger.",
    folioLabel: "FOLIO // 02",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-03",
    src: "/template-assets/photos/gallery/gallery-03.webp",
    alt: "Joyful Morning Smiles - Playful tummy time laughter and bright morning energy",
    title: "Joyful Morning Smiles",
    caption: "Playful tummy time laughter and bright morning energy.",
    folioLabel: "FOLIO // 03",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-04",
    src: "/template-assets/photos/gallery/gallery-04.webp",
    alt: "In Father's Harbor - Peaceful slumber resting on his father's shoulder",
    title: "In Father's Harbor",
    caption: "Peaceful slumber resting on his father's shoulder.",
    folioLabel: "FOLIO // 04",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-05",
    src: "/template-assets/photos/gallery/gallery-05.webp",
    alt: "The Nursery Sanctuary - Sunlight streaming into Liam's wooden nursery crib",
    title: "The Nursery Sanctuary",
    caption: "Sunlight streaming into Liam's wooden nursery crib.",
    folioLabel: "FOLIO // 05",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
  {
    id: "gallery-06",
    src: "/template-assets/photos/gallery/gallery-06.webp",
    alt: "Eyes of Wonder - Curious dark eyes welcoming the world with innocence",
    title: "Eyes of Wonder",
    caption: "Curious dark eyes welcoming the world with innocence.",
    folioLabel: "FOLIO // 06",
    width: 2752,
    height: 1536,
    orientation: "landscape",
  },
];
