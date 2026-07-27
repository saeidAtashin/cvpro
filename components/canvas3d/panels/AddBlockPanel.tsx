"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";
import type { ImageShape, TextVariant } from "@/lib/canvas3d/types";

const TEXT_VARIANTS: { id: TextVariant; label: string }[] = [
  { id: "simple", label: "Simple text" },
  { id: "header", label: "Header" },
  { id: "withIcon", label: "Text + icon" },
  { id: "withImage", label: "Text + image" },
  { id: "numbered", label: "Numbered list" },
  { id: "bulleted", label: "Bullet list" },
];

const IMAGE_SHAPES: { id: ImageShape; label: string }[] = [
  { id: "rectangle", label: "Rectangle" },
  { id: "rounded", label: "Rounded" },
  { id: "circle", label: "Circle" },
];

export function AddBlockPanel() {
  const addImage = useCanvas3DStore((s) => s.addImage);
  const addText = useCanvas3DStore((s) => s.addText);
  const selectedId = useCanvas3DStore((s) => s.selectedId);
  const removeElement = useCanvas3DStore((s) => s.removeElement);
  const duplicateElement = useCanvas3DStore((s) => s.duplicateElement);

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4 overflow-y-auto flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-2">Images</h2>
        <div className="flex flex-col gap-1.5">
          {IMAGE_SHAPES.map((shape) => (
            <Button
              key={shape.id}
              variant="secondary"
              size="sm"
              className="w-full justify-start"
              onClick={() => addImage(shape.id)}
            >
              {shape.label}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-2">Text</h2>
        <div className="flex flex-col gap-1.5">
          {TEXT_VARIANTS.map((v) => (
            <Button
              key={v.id}
              variant="secondary"
              size="sm"
              className="w-full justify-start"
              onClick={() => addText(v.id)}
            >
              {v.label}
            </Button>
          ))}
        </div>
      </div>
      {selectedId ? (
        <div className="pt-2 border-t border-gray-100 flex flex-col gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => duplicateElement(selectedId)}
          >
            Duplicate selected
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => removeElement(selectedId)}
          >
            Delete selected
          </Button>
        </div>
      ) : null}
    </aside>
  );
}
