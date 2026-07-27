import type { Canvas3DElement } from "../types";
import { cloneDefaultElements } from "../default-elements";
import { buildMinimalistCvResumePreset } from "./presets/minimalist-cv-resume";
import type { Canvas3DTemplateDefinition } from "./types";

export const BLANK_TEMPLATE_ID = "blank";
export const MINIMALIST_TEMPLATE_ID = "minimalist-cv-resume";

export const CANVAS3D_TEMPLATES: Canvas3DTemplateDefinition[] = [
  {
    id: MINIMALIST_TEMPLATE_ID,
    name: "Minimalist CV",
    thumbnail: "/templates/thumbs/minimalist-cv-resume.webp",
    elements: buildMinimalistCvResumePreset(),
  },
  {
    id: BLANK_TEMPLATE_ID,
    name: "Blank canvas",
    thumbnail: "/templates/thumbs/3d-canvas-cv.webp",
    elements: cloneDefaultElements(),
  },
];

export function getCanvas3DTemplate(
  id: string
): Canvas3DTemplateDefinition | undefined {
  return CANVAS3D_TEMPLATES.find((t) => t.id === id);
}

export function listCanvas3DTemplates(): Canvas3DTemplateDefinition[] {
  return CANVAS3D_TEMPLATES;
}

export function getTemplateElements(id: string): Canvas3DElement[] | null {
  if (id === MINIMALIST_TEMPLATE_ID) {
    return buildMinimalistCvResumePreset().map((el) => ({ ...el }));
  }
  const def = getCanvas3DTemplate(id);
  if (!def) return null;
  return def.elements.map((el) => ({ ...el }));
}
