export interface CanvasFontEntry {
  id: string;
  label: string;
  cssVar: string;
}

/** Ten fonts: five from root layout + five added for canvas editor */
export const CANVAS_FONTS: CanvasFontEntry[] = [
  { id: "geist", label: "Geist", cssVar: "var(--font-geist-sans)" },
  { id: "geist-mono", label: "Geist Mono", cssVar: "var(--font-geist-mono)" },
  { id: "poppins", label: "Poppins", cssVar: "var(--font-poppins)" },
  { id: "passion-one", label: "Passion One", cssVar: "var(--font-passion-one)" },
  { id: "vazirmatn", label: "Vazirmatn", cssVar: "var(--font-vazirmatn)" },
  { id: "inter", label: "Inter", cssVar: "var(--font-inter)" },
  { id: "roboto", label: "Roboto", cssVar: "var(--font-roboto)" },
  {
    id: "playfair",
    label: "Playfair Display",
    cssVar: "var(--font-playfair)",
  },
  { id: "lora", label: "Lora", cssVar: "var(--font-lora)" },
  { id: "montserrat", label: "Montserrat", cssVar: "var(--font-montserrat)" },
];

export const DEFAULT_FONT_ID = "poppins";

export function getFontFamily(fontId: string): string {
  const entry = CANVAS_FONTS.find((f) => f.id === fontId);
  return entry?.cssVar ?? CANVAS_FONTS[0].cssVar;
}
