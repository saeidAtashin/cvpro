export interface TemplateCatalogEntry {
  id: string;
  name: string;
  thumbnail: string;
  /** Price in Toman (display); charged in Rial (×10) for Zarinpal */
  priceToman: number;
  editorPath: string;
}

export const TEMPLATE_CATALOG: TemplateCatalogEntry[] = [
  {
    id: "minimalist",
    name: "Minimalist CV",
    thumbnail: "/Minimalist-CV-Resume.png",
    priceToman: 450_000,
    editorPath: "/minimalist-editor",
  },
  {
    id: "template02",
    name: "CV Template 02",
    thumbnail: "/Minimalist-CV-Resume.png",
    priceToman: 450_000,
    editorPath: "/template02-editor",
  },
];

export function getTemplateById(id: string): TemplateCatalogEntry | undefined {
  return TEMPLATE_CATALOG.find((t) => t.id === id);
}

/** Zarinpal expects amount in Rial */
export function priceTomanToRial(toman: number): number {
  return toman * 10;
}
