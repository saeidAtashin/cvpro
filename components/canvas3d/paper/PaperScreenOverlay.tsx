"use client";

import {
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
} from "@/lib/canvas3d/constants";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";
import { PaperSurface } from "./PaperSurface";

export function PaperScreenOverlay() {
  const paperScreen = useCanvas3DStore((s) => s.paperScreen);
  const viewMode = useCanvas3DStore((s) => s.viewMode);

  if (!paperScreen?.visible) {
    return null;
  }

  const isEdit = viewMode === "edit";

  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden"
      style={{ pointerEvents: isEdit ? "auto" : "none" }}
    >
      <div
        style={{
          position: "absolute",
          left: paperScreen.left,
          top: paperScreen.top,
          width: paperScreen.width,
          height: paperScreen.height,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: CANVAS_WIDTH_PX,
            height: CANVAS_HEIGHT_PX,
            transform: `scale(${paperScreen.scale})`,
            transformOrigin: "top left",
          }}
        >
          <PaperSurface />
        </div>
      </div>
    </div>
  );
}
