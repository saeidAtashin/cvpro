"use client";

export function StudioBackground() {
  return (
    <>
      <color attach="background" args={["#e4e8ef"]} />
      <fog attach="fog" args={["#e4e8ef", 14, 32]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#c5ccd6" roughness={0.92} metalness={0} />
      </mesh>
      <mesh position={[0, 2.5, -6]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial color="#eef1f5" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}
