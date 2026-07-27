import type { PdfTemplateRegistryEntry } from "./types";

export const PDF_TEMPLATE_REGISTRY: Record<
  string,
  PdfTemplateRegistryEntry
> = {
  "modern-minimalist-professional": {
    id: "modern-minimalist-professional",
    name: "Modern Minimalist Professional CV",
    schemaId: "minimalist",
    pdfRelativePath: "public/templates/pdf/modern-minimalist-professional.pdf",
    overlayRelativePath:
      "lib/pdf-templates/overlays/modern-minimalist-professional.json",
    pageSize: { width: 2482, height: 3510 },
    fonts: {
      regular: "public/fonts/Poppins-Regular.ttf",
      bold: "public/fonts/Poppins-Bold.ttf",
    },
  },
};

export function getPdfTemplateEntry(
  templateId: string
): PdfTemplateRegistryEntry | undefined {
  return PDF_TEMPLATE_REGISTRY[templateId];
}

export function listPdfTemplateIds(): string[] {
  return Object.keys(PDF_TEMPLATE_REGISTRY);
}
