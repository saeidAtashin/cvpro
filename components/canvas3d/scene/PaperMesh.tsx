"use client";

import { useRef } from "react";
import { Group } from "three";
import {
  PAPER_WORLD_HEIGHT,
  PAPER_WORLD_WIDTH,
} from "@/lib/canvas3d/constants";
import { PAPER_DEPTH } from "@/lib/canvas3d/paper-projection";
import { PaperBoundsTracker } from "./PaperBoundsTracker";

const PAPER_TILT_X = -0.08;

export function PaperMesh() {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} rotation={[PAPER_TILT_X, 0, 0]}>
      <PaperBoundsTracker paperGroupRef={groupRef} />
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[PAPER_WORLD_WIDTH, PAPER_WORLD_HEIGHT, PAPER_DEPTH]} />
        <meshStandardMaterial color="#ffffff" roughness={0.88} metalness={0} />
      </mesh>
    </group>
  );
}
