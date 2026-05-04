'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ── Shirt Mesh ────────────────────────────────────────────────────
function ShirtMesh({ color, rotating }: { color: string; rotating: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const mat      = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05 });

  useFrame((state) => {
    if (!groupRef.current) return;
    if (rotating) groupRef.current.rotation.y += 0.008;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef} scale={1.1}>
      {/* Body */}
      <mesh castShadow receiveShadow material={mat}>
        <boxGeometry args={[2, 2.5, 0.14]} />
      </mesh>

      {/* Left sleeve */}
      <mesh position={[-1.38, 0.5, 0]} rotation={[0, 0, -0.42]} material={mat} castShadow>
        <boxGeometry args={[0.9, 0.52, 0.13]} />
      </mesh>

      {/* Right sleeve */}
      <mesh position={[1.38, 0.5, 0]} rotation={[0, 0, 0.42]} material={mat} castShadow>
        <boxGeometry args={[0.9, 0.52, 0.13]} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.36, 0.4, 0.16, 32, 1, true]} />
        <meshStandardMaterial color={color} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Gold logo mark */}
      <mesh position={[0, 0.4, 0.075]}>
        <torusGeometry args={[0.18, 0.035, 16, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Fold line */}
      <mesh position={[0, -0.3, 0.072]}>
        <boxGeometry args={[1.6, 0.012, 0.01]} />
        <meshStandardMaterial color={color} roughness={1} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────
export function ShirtScene({ color, rotating }: { color: string; rotating: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <pointLight position={[-3, 2, 3]} color="#D4AF37" intensity={0.5} />
      <pointLight position={[3, -2, 2]} color="#5B8CFF"  intensity={0.4} />

      <Suspense fallback={null}>
        <ShirtMesh color={color} rotating={rotating} />
        <Environment preset="studio" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate={false}
      />
    </Canvas>
  );
}

export default ShirtScene;