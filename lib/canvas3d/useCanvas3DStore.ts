import { create } from "zustand";
import {
  CANVAS3D_STORAGE_KEY,
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
} from "./constants";
import { DEFAULT_ELEMENTS } from "./default-elements";
import { DEFAULT_FONT_ID } from "./fonts";
import type {
  Canvas3DElement,
  Canvas3DImageElement,
  Canvas3DTextElement,
  ImageShape,
  TextVariant,
  ViewMode,
} from "./types";
import type { PaperScreenQuad } from "./paper-projection";
import { getTemplateElements } from "./templates/registry";
import type { Canvas3DShapeElement } from "./types";

function nextId(): string {
  return `el-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function maxZIndex(elements: Canvas3DElement[]): number {
  if (elements.length === 0) return 0;
  return Math.max(...elements.map((e) => e.zIndex));
}

interface Canvas3DState {
  elements: Canvas3DElement[];
  selectedId: string | null;
  viewMode: ViewMode;
  hydrated: boolean;
  paperScreen: PaperScreenQuad | null;
  activeTemplateId: string | null;
  setViewMode: (mode: ViewMode) => void;
  setSelectedId: (id: string | null) => void;
  clearSelection: () => void;
  loadElements: (elements: Canvas3DElement[]) => void;
  addImage: (shape?: ImageShape) => void;
  addShape: () => void;
  addText: (variant: TextVariant) => void;
  updateElement: (id: string, patch: Partial<Canvas3DElement>) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  bringForward: (id: string) => void;
  setPaperScreen: (quad: PaperScreenQuad | null) => void;
  applyTemplate: (templateId: string) => boolean;
  hydrateFromStorage: () => void;
  persistToStorage: () => void;
}

function defaultTextForVariant(variant: TextVariant): Partial<Canvas3DTextElement> {
  const base: Partial<Canvas3DTextElement> = {
    type: "text",
    variant,
    fontId: DEFAULT_FONT_ID,
    color: "#111827",
    fontWeight: variant === "header" ? "bold" : "normal",
    align: "left",
  };
  switch (variant) {
    case "header":
      return {
        ...base,
        content: "Section title",
        fontSize: 28,
        width: 400,
        height: 48,
        lineHeight: 1.2,
      };
    case "withIcon":
      return {
        ...base,
        content: "Text with icon",
        fontSize: 16,
        width: 280,
        height: 40,
        icon: "★",
      };
    case "withImage":
      return {
        ...base,
        content: "Caption beside image",
        fontSize: 14,
        width: 320,
        height: 64,
        imageSrc: "",
      };
    case "numbered":
      return {
        ...base,
        content: "",
        fontSize: 14,
        width: 360,
        height: 100,
        listItems: ["First item", "Second item", "Third item"],
        lineHeight: 1.5,
      };
    case "bulleted":
      return {
        ...base,
        content: "",
        fontSize: 14,
        width: 360,
        height: 100,
        listItems: ["Bullet one", "Bullet two"],
        lineHeight: 1.5,
      };
    case "sectionTitle":
      return {
        ...base,
        content: "Section",
        fontSize: 16,
        width: 280,
        height: 28,
        fontWeight: "bold",
        color: "#1e2a4a",
        lineHeight: 1.2,
      };
    case "subtitle":
      return {
        ...base,
        content: "SUBTITLE",
        fontSize: 12,
        width: 320,
        height: 24,
        color: "#6b7280",
        lineHeight: 1.2,
      };
    case "labelValue":
      return {
        ...base,
        label: "Label",
        content: "Value",
        fontSize: 12,
        width: 200,
        height: 36,
        lineHeight: 1.3,
      };
    case "link":
      return {
        ...base,
        content: "Link text",
        href: "https://example.com",
        fontSize: 12,
        width: 160,
        height: 22,
        color: "#1e2a4a",
        fontWeight: "bold",
        lineHeight: 1.2,
      };
    default:
      return {
        ...base,
        content: "New text block",
        fontSize: 14,
        width: 240,
        height: 48,
        lineHeight: 1.4,
      };
  }
}

export const useCanvas3DStore = create<Canvas3DState>((set, get) => ({
  elements: DEFAULT_ELEMENTS,
  selectedId: null,
  viewMode: "edit",
  hydrated: false,
  paperScreen: null,
  activeTemplateId: null,

  setViewMode: (mode) => set({ viewMode: mode }),

  setSelectedId: (id) => set({ selectedId: id }),

  clearSelection: () => set({ selectedId: null }),

  loadElements: (elements) => set({ elements }),

  addImage: (shape = "rectangle") => {
    const { elements } = get();
    const el: Canvas3DImageElement = {
      id: nextId(),
      type: "image",
      x: 60,
      y: 200,
      width: shape === "circle" ? 120 : 160,
      height: shape === "circle" ? 120 : 120,
      zIndex: maxZIndex(elements) + 1,
      src: "",
      shape,
      borderRadius: shape === "rounded" ? 16 : 0,
      objectFit: "cover",
      opacity: 1,
    };
    set({ elements: [...elements, el], selectedId: el.id });
  },

  addShape: () => {
    const { elements } = get();
    const el: Canvas3DShapeElement = {
      id: nextId(),
      type: "shape",
      x: 48,
      y: 48,
      width: 200,
      height: 120,
      zIndex: maxZIndex(elements) + 1,
      fillColor: "#e5e7eb",
      borderRadius: 0,
      opacity: 1,
    };
    set({ elements: [...elements, el], selectedId: el.id });
  },

  addText: (variant) => {
    const { elements } = get();
    const defaults = defaultTextForVariant(variant);
    const el = {
      id: nextId(),
      x: 48,
      y: Math.min(400, CANVAS_HEIGHT_PX - 120),
      zIndex: maxZIndex(elements) + 1,
      ...defaults,
    } as Canvas3DTextElement;
    set({ elements: [...elements, el], selectedId: el.id });
  },

  updateElement: (id, patch) => {
    set({
      elements: get().elements.map((el) =>
        el.id === id ? ({ ...el, ...patch } as Canvas3DElement) : el
      ),
    });
  },

  removeElement: (id) => {
    const { selectedId, elements } = get();
    set({
      elements: elements.filter((el) => el.id !== id),
      selectedId: selectedId === id ? null : selectedId,
    });
  },

  duplicateElement: (id) => {
    const { elements } = get();
    const source = elements.find((el) => el.id === id);
    if (!source) return;
    const copy = {
      ...source,
      id: nextId(),
      x: Math.min(source.x + 24, CANVAS_WIDTH_PX - source.width),
      y: Math.min(source.y + 24, CANVAS_HEIGHT_PX - source.height),
      zIndex: maxZIndex(elements) + 1,
    };
    set({ elements: [...elements, copy], selectedId: copy.id });
  },

  bringForward: (id) => {
    const { elements } = get();
    const top = maxZIndex(elements) + 1;
    set({
      elements: elements.map((el) =>
        el.id === id ? { ...el, zIndex: top } : el
      ),
    });
  },

  setPaperScreen: (quad) => set({ paperScreen: quad }),

  applyTemplate: (templateId) => {
    const elements = getTemplateElements(templateId);
    if (!elements) return false;
    set({
      elements,
      activeTemplateId: templateId,
      selectedId: null,
    });
    return true;
  },

  hydrateFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(CANVAS3D_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          elements?: Canvas3DElement[];
          viewMode?: ViewMode;
          activeTemplateId?: string | null;
        };
        if (parsed.elements?.length) {
          set({
            elements: parsed.elements,
            viewMode: parsed.viewMode ?? "edit",
            activeTemplateId: parsed.activeTemplateId ?? null,
            hydrated: true,
          });
          return;
        }
      }
    } catch {
      /* use defaults */
    }
    set({ hydrated: true });
  },

  persistToStorage: () => {
    if (typeof window === "undefined") return;
    const { elements, viewMode, activeTemplateId } = get();
    localStorage.setItem(
      CANVAS3D_STORAGE_KEY,
      JSON.stringify({ elements, viewMode, activeTemplateId })
    );
  },
}));
