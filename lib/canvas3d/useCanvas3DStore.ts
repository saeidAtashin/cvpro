import { create } from "zustand";
import {
  CANVAS3D_STORAGE_KEY,
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
} from "./constants";
import { DEFAULT_FONT_ID } from "./fonts";
import type {
  Canvas3DElement,
  Canvas3DImageElement,
  Canvas3DTextElement,
  ImageShape,
  TextVariant,
  ViewMode,
} from "./types";

function nextId(): string {
  return `el-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function maxZIndex(elements: Canvas3DElement[]): number {
  if (elements.length === 0) return 0;
  return Math.max(...elements.map((e) => e.zIndex));
}

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

interface Canvas3DState {
  elements: Canvas3DElement[];
  selectedId: string | null;
  viewMode: ViewMode;
  hydrated: boolean;
  setViewMode: (mode: ViewMode) => void;
  setSelectedId: (id: string | null) => void;
  clearSelection: () => void;
  loadElements: (elements: Canvas3DElement[]) => void;
  addImage: (shape?: ImageShape) => void;
  addText: (variant: TextVariant) => void;
  updateElement: (id: string, patch: Partial<Canvas3DElement>) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  bringForward: (id: string) => void;
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

  hydrateFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(CANVAS3D_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          elements?: Canvas3DElement[];
          viewMode?: ViewMode;
        };
        if (parsed.elements?.length) {
          set({
            elements: parsed.elements,
            viewMode: parsed.viewMode ?? "edit",
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
    const { elements, viewMode } = get();
    localStorage.setItem(
      CANVAS3D_STORAGE_KEY,
      JSON.stringify({ elements, viewMode })
    );
  },
}));
