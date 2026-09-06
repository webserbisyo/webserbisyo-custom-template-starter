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
  id: "template-baptism-celestial-sky",
  name: "Celestial Sky (Christening)",
  version: 1,
  description:
    "Serene celestial sky christening and baptism celebration template with cloud pearl surfaces, frosted sky accents, and sacramental gold detailing.",
  palette: [
    { name: "Cloud Pearl", hex: "#F8FAFC" },
    { name: "Sky Blue", hex: "#0284C7" },
    { name: "Frosted Sky", hex: "#E0F2FE" },
    { name: "Sacramental Gold", hex: "#D97706" },
    { name: "Starlight Navy", hex: "#0B1329" },
  ],
};
