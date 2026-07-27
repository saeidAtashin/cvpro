"use client";

import React from "react";
import { Rnd } from "react-rnd";
import type { Canvas3DElement } from "@/lib/canvas3d/types";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";
import { PaperContent } from "./PaperContent";

interface DraggableElementProps {
  element: Canvas3DElement;
  isSelected: boolean;
  onSelect: () => void;
}

export function DraggableElement({
  element,
  isSelected,
  onSelect,
}: DraggableElementProps) {
  const updateElement = useCanvas3DStore((s) => s.updateElement);

  const handleDragStop = (_e: unknown, d: { x: number; y: number }) => {
    updateElement(element.id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (
    _e: unknown,
    _direction: unknown,
    ref: HTMLElement,
    _delta: unknown,
    position: { x: number; y: number }
  ) => {
    updateElement(element.id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      x: position.x,
      y: position.y,
    });
  };

  return (
    <Rnd
      size={{ width: element.width, height: element.height }}
      position={{ x: element.x, y: element.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect();
      }}
      style={{
        border: isSelected ? "2px solid #2563eb" : "2px solid transparent",
        cursor: "move",
        zIndex: element.zIndex,
      }}
      bounds="parent"
      enableResizing={isSelected}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: element.rotation
            ? `rotate(${element.rotation}deg)`
            : undefined,
        }}
      >
        <PaperContent element={element} />
      </div>
    </Rnd>
  );
}
