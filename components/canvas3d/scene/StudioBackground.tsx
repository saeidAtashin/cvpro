"use client";

import { ContactShadows } from "@react-three/drei";

export function StudioBackground() {
  return (
    <>
      <color attach="background" args={["#e8eaef"]} />
      <fog attach="fog" args={["#e8eaef", 8, 22]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.25} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#d4d8e0" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.5, -6]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial color="#eef0f4" roughness={1} />
      </mesh>
      <ContactShadows
        position={[0, -1.04, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
      />
    </>
  );
}
