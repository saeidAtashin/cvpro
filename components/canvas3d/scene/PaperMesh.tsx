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

const HTML_SCALE = PAPER_WORLD_WIDTH / CANVAS_WIDTH_PX;

const PAPER_TILT_X = -0.08;

export function PaperMesh() {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} rotation={[PAPER_TILT_X, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0, -0.002]}>
        <boxGeometry args={[PAPER_WORLD_WIDTH, PAPER_WORLD_HEIGHT, 0.012]} />
        <meshStandardMaterial color="#fafafa" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0, 0, 0.007]}>
        <planeGeometry args={[PAPER_WORLD_WIDTH * 0.998, PAPER_WORLD_HEIGHT * 0.998]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <Html
        transform
        occlude={false}
        scale={HTML_SCALE}
        position={[0, 0, 0.008]}
        style={{
          width: CANVAS_WIDTH_PX,
          height: CANVAS_HEIGHT_PX,
          pointerEvents: "auto",
        }}
        center={false}
      >
        <PaperSurface />
      </Html>
    </group>
  );
}
