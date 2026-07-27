"use client";

import React from "react";
import { CANVAS_FONTS } from "@/lib/canvas3d/fonts";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";
import {
  isImageElement,
  isShapeElement,
  isTextElement,
  type ImageShape,
  type TextAlign,
  type TextVariant,
} from "@/lib/canvas3d/types";

export function ElementInspector() {
  const elements = useCanvas3DStore((s) => s.elements);
  const selectedId = useCanvas3DStore((s) => s.selectedId);
  const updateElement = useCanvas3DStore((s) => s.updateElement);
  const bringForward = useCanvas3DStore((s) => s.bringForward);

  const selected = elements.find((el) => el.id === selectedId);

  if (!selected) {
    return (
      <aside className="w-64 shrink-0 border-l border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">Select a block on the paper to edit.</p>
      </aside>
    );
  }

  const readFileAsDataUrl = (file: File, onLoad: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => onLoad(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <aside className="w-64 shrink-0 border-l border-gray-200 bg-white p-4 overflow-y-auto flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-gray-900">Inspector</h2>
      <button
        type="button"
        className="text-xs text-blue-600 hover:underline text-left"
        onClick={() => bringForward(selected.id)}
      >
        Bring to front
      </button>

      {isShapeElement(selected) && (
        <>
          <label className="text-xs font-medium text-gray-600">Fill color</label>
          <input
            type="color"
            value={selected.fillColor}
            onChange={(e) =>
              updateElement(selected.id, { fillColor: e.target.value })
            }
          />
          <label className="text-xs font-medium text-gray-600">
            Corner radius
          </label>
          <input
            type="number"
            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={selected.borderRadius ?? 0}
            onChange={(e) =>
              updateElement(selected.id, {
                borderRadius: Number(e.target.value),
              })
            }
          />
          <label className="text-xs font-medium text-gray-600">Opacity</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={selected.opacity ?? 1}
            onChange={(e) =>
              updateElement(selected.id, { opacity: Number(e.target.value) })
            }
          />
        </>
      )}

      {isImageElement(selected) && (
        <>
          <label className="text-xs font-medium text-gray-600">Shape</label>
          <select
            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={selected.shape}
            onChange={(e) =>
              updateElement(selected.id, {
                shape: e.target.value as ImageShape,
              })
            }
          >
            <option value="rectangle">Rectangle</option>
            <option value="rounded">Rounded</option>
            <option value="circle">Circle</option>
          </select>
          {selected.shape === "rounded" && (
            <>
              <label className="text-xs font-medium text-gray-600">
                Corner radius
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                value={selected.borderRadius ?? 16}
                onChange={(e) =>
                  updateElement(selected.id, {
                    borderRadius: Number(e.target.value),
                  })
                }
              />
            </>
          )}
          <label className="text-xs font-medium text-gray-600">Image file</label>
          <input
            type="file"
            accept="image/*"
            className="text-xs"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                readFileAsDataUrl(file, (src) =>
                  updateElement(selected.id, { src })
                );
              }
            }}
          />
          <label className="text-xs font-medium text-gray-600">Object fit</label>
          <select
            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={selected.objectFit}
            onChange={(e) =>
              updateElement(selected.id, {
                objectFit: e.target.value as "cover" | "contain",
              })
            }
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
          </select>
        </>
      )}

      {isTextElement(selected) && (
        <>
          <label className="text-xs font-medium text-gray-600">Variant</label>
          <select
            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={selected.variant}
            onChange={(e) =>
              updateElement(selected.id, {
                variant: e.target.value as TextVariant,
              })
            }
          >
            <option value="simple">Simple</option>
            <option value="header">Header</option>
            <option value="sectionTitle">Section title</option>
            <option value="subtitle">Subtitle</option>
            <option value="labelValue">Label + value</option>
            <option value="link">Link</option>
            <option value="withIcon">With icon</option>
            <option value="withImage">With image</option>
            <option value="numbered">Numbered list</option>
            <option value="bulleted">Bullet list</option>
          </select>
          <label className="text-xs font-medium text-gray-600">Font</label>
          <select
            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={selected.fontId}
            onChange={(e) =>
              updateElement(selected.id, { fontId: e.target.value })
            }
          >
            {CANVAS_FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
          {(selected.variant === "simple" ||
            selected.variant === "header" ||
            selected.variant === "sectionTitle" ||
            selected.variant === "subtitle" ||
            selected.variant === "link" ||
            selected.variant === "withIcon" ||
            selected.variant === "withImage") && (
            <>
              <label className="text-xs font-medium text-gray-600">Content</label>
              <textarea
                className="border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[72px]"
                value={selected.content}
                onChange={(e) =>
                  updateElement(selected.id, { content: e.target.value })
                }
              />
            </>
          )}
          {selected.variant === "labelValue" && (
            <>
              <label className="text-xs font-medium text-gray-600">Label</label>
              <input
                className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                value={selected.label ?? ""}
                onChange={(e) =>
                  updateElement(selected.id, { label: e.target.value })
                }
              />
              <label className="text-xs font-medium text-gray-600">Value</label>
              <textarea
                className="border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[56px]"
                value={selected.content}
                onChange={(e) =>
                  updateElement(selected.id, { content: e.target.value })
                }
              />
            </>
          )}
          {selected.variant === "link" && (
            <>
              <label className="text-xs font-medium text-gray-600">URL</label>
              <input
                className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                value={selected.href ?? ""}
                onChange={(e) =>
                  updateElement(selected.id, { href: e.target.value })
                }
                placeholder="https://"
              />
            </>
          )}
          {selected.variant === "withIcon" && (
            <>
              <label className="text-xs font-medium text-gray-600">Icon</label>
              <input
                className="border border-gray-300 rounded px-2 py-1.5 text-sm"
                value={selected.icon ?? ""}
                onChange={(e) =>
                  updateElement(selected.id, { icon: e.target.value })
                }
                placeholder="Emoji or character"
              />
            </>
          )}
          {selected.variant === "withImage" && (
            <>
              <label className="text-xs font-medium text-gray-600">
                Side image
              </label>
              <input
                type="file"
                accept="image/*"
                className="text-xs"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    readFileAsDataUrl(file, (imageSrc) =>
                      updateElement(selected.id, { imageSrc })
                    );
                  }
                }}
              />
            </>
          )}
          {(selected.variant === "numbered" ||
            selected.variant === "bulleted") && (
            <>
              <label className="text-xs font-medium text-gray-600">
                List items (one per line)
              </label>
              <textarea
                className="border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[100px]"
                value={(selected.listItems ?? []).join("\n")}
                onChange={(e) =>
                  updateElement(selected.id, {
                    listItems: e.target.value
                      .split("\n")
                      .filter((line) => line.length > 0),
                  })
                }
              />
            </>
          )}
          <label className="text-xs font-medium text-gray-600">Font size</label>
          <input
            type="number"
            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={selected.fontSize}
            onChange={(e) =>
              updateElement(selected.id, { fontSize: Number(e.target.value) })
            }
          />
          <label className="text-xs font-medium text-gray-600">Color</label>
          <input
            type="color"
            value={selected.color}
            onChange={(e) =>
              updateElement(selected.id, { color: e.target.value })
            }
          />
          <label className="text-xs font-medium text-gray-600">Align</label>
          <select
            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={selected.align}
            onChange={(e) =>
              updateElement(selected.id, {
                align: e.target.value as TextAlign,
              })
            }
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
          <label className="text-xs font-medium text-gray-600">Weight</label>
          <select
            className="border border-gray-300 rounded px-2 py-1.5 text-sm"
            value={selected.fontWeight}
            onChange={(e) =>
              updateElement(selected.id, {
                fontWeight: e.target.value as "normal" | "bold",
              })
            }
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </>
      )}
    </aside>
  );
}
