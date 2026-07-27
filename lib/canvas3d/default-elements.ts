import { DEFAULT_FONT_ID } from "./fonts";
import type { Canvas3DElement } from "./types";

export const DEFAULT_ELEMENTS: Canvas3DElement[] = [
  {
    id: "default-header",
    type: "text",
    variant: "header",
    x: 40,
    y: 48,
    width: 400,
    height: 56,
    zIndex: 1,
    content: "Your name",
    fontId: DEFAULT_FONT_ID,
    fontSize: 32,
    color: "#111827",
    fontWeight: "bold",
    align: "left",
    lineHeight: 1.2,
  },
  {
    id: "default-body",
    type: "text",
    variant: "simple",
    x: 40,
    y: 120,
    width: 500,
    height: 80,
    zIndex: 2,
    content: "Add your summary or bio here.",
    fontId: DEFAULT_FONT_ID,
    fontSize: 14,
    color: "#374151",
    fontWeight: "normal",
    align: "left",
    lineHeight: 1.5,
  },
];

export function cloneDefaultElements(): Canvas3DElement[] {
  return DEFAULT_ELEMENTS.map((el) => ({ ...el }));
}
