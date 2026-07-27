"use client";

import { Canvas } from "@react-three/fiber";
import { CAMERA_PRESETS } from "@/lib/canvas3d/camera-presets";
import { CameraRig } from "./CameraRig";
import { PaperMesh } from "./PaperMesh";
import { StudioBackground } from "./StudioBackground";

export function SceneRoot() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      camera={{
        position: CAMERA_PRESETS.edit.position,
        fov: CAMERA_PRESETS.edit.fov,
        near: 0.1,
        far: 100,
      }}
    >
      <CameraRig />
      <StudioBackground />
      <PaperMesh />
    </Canvas>
  );
}
