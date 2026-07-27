import {
  GENERATED_TEMPLATE_CATALOG,
  type GeneratedTemplateCatalogEntry,
} from "./catalog.generated";

export type { GeneratedTemplateCatalogEntry };

/** Stone Template 02 — separate React layout, not driven by PNG folder sync */
export interface LegacyTemplateCatalogEntry {
  id: string;
  name: string;
  thumbnail: string;
  priceToman: number;
  editorPath: string;
}

export type TemplateCatalogEntry =
  | GeneratedTemplateCatalogEntry
  | LegacyTemplateCatalogEntry;

export function isGeneratedEntry(
  entry: TemplateCatalogEntry
): entry is GeneratedTemplateCatalogEntry {
  return "schemaId" in entry && "layout" in entry;
}

export const LEGACY_TEMPLATE_CATALOG: LegacyTemplateCatalogEntry[] = [
  {
    id: "modern-minimalist-professional",
    name: "Modern Minimalist Professional CV",
    thumbnail: "/templates/thumbs/minimalist-cv-resume.webp",
    priceToman: 450_000,
    editorPath: "/pdf-generator/modern-minimalist-professional",
  },
  {
    id: "template02",
    name: "CV Template 02",
    thumbnail: "/templates/thumbs/minimalist-cv-resume.webp",
    priceToman: 450_000,
    editorPath: "/template02-editor",
  },
  {
    id: "3d-canvas-cv",
    name: "3D Canvas CV Studio",
    thumbnail: "/templates/thumbs/3d-canvas-cv.webp",
    priceToman: 450_000,
    editorPath: "/3d-canvas-editor",
  },
];

/** PDF-template editors shown first on the landing page */
const PDF_TEMPLATE_LANDING: LegacyTemplateCatalogEntry[] = [
  LEGACY_TEMPLATE_CATALOG[0],
];

const LEGACY_WITHOUT_PDF_LANDING = LEGACY_TEMPLATE_CATALOG.slice(1);

export const TEMPLATE_CATALOG: TemplateCatalogEntry[] = [
  ...PDF_TEMPLATE_LANDING,
  ...GENERATED_TEMPLATE_CATALOG,
  ...LEGACY_WITHOUT_PDF_LANDING,
];

export function getTemplateById(id: string): TemplateCatalogEntry | undefined {
  return TEMPLATE_CATALOG.find((t) => t.id === id);
}

export function priceTomanToRial(toman: number): number {
  return toman * 10;
}

export const PRIMARY_MINIMALIST_SLUG = "minimalist-cv-resume";
