"use client";

import { useRef } from "react";
import { Html } from "@react-three/drei";
import { Group } from "three";
import {
  CANVAS_HEIGHT_PX,
  CANVAS_WIDTH_PX,
  PAPER_WORLD_HEIGHT,
  PAPER_WORLD_WIDTH,
} from "@/lib/canvas3d/constants";
import { PaperSurface } from "../paper/PaperSurface";

/** Maps A4 pixel layout to paper width in world units: scale = PAPER_WORLD_WIDTH / CANVAS_WIDTH_PX */
const HTML_SCALE = PAPER_WORLD_WIDTH / CANVAS_WIDTH_PX;

const PAPER_TILT_X = -0.08;

export function PaperMesh() {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} rotation={[PAPER_TILT_X, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[PAPER_WORLD_WIDTH, PAPER_WORLD_HEIGHT, 0.014]} />
        <meshStandardMaterial color="#ffffff" roughness={0.88} metalness={0} />
      </mesh>
      <Html
        transform
        occlude={false}
        center
        scale={HTML_SCALE}
        distanceFactor={1}
        zIndexRange={[100, 0]}
        position={[0, 0, 0.015]}
        style={{
          width: CANVAS_WIDTH_PX,
          height: CANVAS_HEIGHT_PX,
          pointerEvents: "auto",
        }}
      >
        <PaperSurface />
      </Html>
    </group>
  );
}
