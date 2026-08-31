// TEMPLATE METADATA — CUSTOM TEMPLATE IDENTITY ONLY.
// Do not place client names, event dates, eventSlugs, or credentials here.

export type TemplateColorSwatch = {
  name: string;
  hex: string;
};

export type TemplateConfig = {
  id: string;
  name: string;
  version: number;
  description: string;
  palette: TemplateColorSwatch[];
};

export const templateConfig: TemplateConfig = {
  id: "template-debut-rose-glam",
  name: "Rose Glam — Grand Cotillion Edition",
  version: 1,
  description:
    "Rose gold glamour debutante cotillion ball template with blush velvet surfaces, champagne gold accents, and archival parterre trellis patterns.",
  palette: [
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Blush Velvet", hex: "#F4E0E0" },
    { name: "Champagne Gold", hex: "#D4AF37" },
    { name: "Deep Plum", hex: "#181216" },
    { name: "Silk Cream", hex: "#FAF8F5" },
  ],
};
