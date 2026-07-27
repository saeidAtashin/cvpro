"use client";

import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA_PRESETS } from "@/lib/canvas3d/camera-presets";
import { useCanvas3DStore } from "@/lib/canvas3d/useCanvas3DStore";

const LERP = 0.08;

export function CameraRig() {
  const viewMode = useCanvas3DStore((s) => s.viewMode);
  const { camera } = useThree();
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const targetVec = useRef(new THREE.Vector3());
  const desiredPos = useRef(new THREE.Vector3());

  useEffect(() => {
    const preset = CAMERA_PRESETS[viewMode];
    desiredPos.current.set(...preset.position);
    targetVec.current.set(...preset.target);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = preset.fov;
      camera.updateProjectionMatrix();
    }
  }, [viewMode, camera]);

  useFrame(() => {
    camera.position.lerp(desiredPos.current, LERP);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetVec.current, LERP);
      controlsRef.current.update();
    }
  });

  const preset = CAMERA_PRESETS[viewMode];

  return (
    <OrbitControls
      ref={controlsRef}
      target={preset.target}
      enabled={viewMode === "preview"}
      enablePan={viewMode === "preview"}
      enableRotate={viewMode === "preview"}
      enableZoom={viewMode === "preview"}
      minDistance={2.5}
      maxDistance={12}
      maxPolarAngle={Math.PI / 2 + 0.15}
      minPolarAngle={Math.PI / 6}
    />
  );
}
