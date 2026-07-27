"use client";

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#f4f5f7" />
      <directionalLight
        position={[3, 8, 5]}
        intensity={1.35}
        color="#fff9f2"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={20}
        shadow-camera-left={-2.5}
        shadow-camera-right={2.5}
        shadow-camera-top={2.5}
        shadow-camera-bottom={-2.5}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
      />
      <directionalLight
        position={[-4, 3, 2]}
        intensity={0.22}
        color="#e3ecff"
      />
    </>
  );
}
