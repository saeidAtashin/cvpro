"use client";

import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";
import type { Group } from "three";
import {
  computePaperScreenQuad,
  quadsNearEqual,
} from "@/lib/canvas3d/paper-projection";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";

interface PaperBoundsTrackerProps {
  paperGroupRef: RefObject<Group | null>;
}

export function PaperBoundsTracker({ paperGroupRef }: PaperBoundsTrackerProps) {
  const { camera, gl } = useThree();
  const setPaperScreen = useCanvas3DStore((s) => s.setPaperScreen);

  useFrame(() => {
    const group = paperGroupRef.current;
    if (!group) return;

    const quad = computePaperScreenQuad(group, camera, gl.domElement);
    const prev = useCanvas3DStore.getState().paperScreen;
    if (!quadsNearEqual(prev, quad)) {
      setPaperScreen(quad);
    }
  });

  return null;
}
