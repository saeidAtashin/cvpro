"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CAMERA_PRESETS } from "@/lib/canvas3d/camera-presets";
import { CameraRig } from "./CameraRig";
import { PaperMesh } from "./PaperMesh";
import { SceneLighting } from "./SceneLighting";
import { StudioBackground } from "./StudioBackground";

export function SceneRoot() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      camera={{
        position: CAMERA_PRESETS.edit.position,
        fov: CAMERA_PRESETS.edit.fov,
        near: 0.1,
        far: 100,
      }}
    >
      <CameraRig />
      <SceneLighting />
      <StudioBackground />
      <PaperMesh />
    </Canvas>
  );
}
