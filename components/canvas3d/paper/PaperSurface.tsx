"use client";

import React from "react";
import {
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
} from "@/lib/canvas3d/constants";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";
import { DraggableElement } from "./DraggableElement";
import { PaperContent } from "./PaperContent";

interface PaperSurfaceProps {
  exportMode?: boolean;
  exportRef?: React.RefObject<HTMLDivElement | null>;
}

export function PaperSurface({ exportMode = false, exportRef }: PaperSurfaceProps) {
  const elements = useCanvas3DStore((s) => s.elements);
  const selectedId = useCanvas3DStore((s) => s.selectedId);
  const viewMode = useCanvas3DStore((s) => s.viewMode);
  const setSelectedId = useCanvas3DStore((s) => s.setSelectedId);
  const clearSelection = useCanvas3DStore((s) => s.clearSelection);

  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex);
  const interactive = !exportMode && viewMode === "edit";

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) clearSelection();
  };

  return (
    <div
      ref={exportRef}
      data-export-root={exportMode ? "true" : undefined}
      onClick={interactive ? handleBackgroundClick : undefined}
      style={{
        width: CANVAS_WIDTH_PX,
        height: CANVAS_HEIGHT_PX,
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {interactive
        ? sorted.map((el) => (
            <DraggableElement
              key={el.id}
              element={el}
              isSelected={el.id === selectedId}
              onSelect={() => setSelectedId(el.id)}
            />
          ))
        : sorted.map((el) => (
            <div
              key={el.id}
              style={{
                position: "absolute",
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
                zIndex: el.zIndex,
              }}
            >
              <PaperContent element={el} />
            </div>
          ))}
    </div>
  );
}
