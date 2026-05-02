'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';

// ── 3D Floating T-shirt shape (simplified mesh) ───────────────────
function FloatingShirt() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <group>
      {/* Main body */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.2, 2.6, 0.12]} />
        <MeshDistortMaterial
          color="#1E5EFF"
          metalness={0.1}
          roughness={0.4}
          distort={0.08}
          speed={2}
        />
      </mesh>

      {/* Left sleeve */}
      <mesh position={[-1.55, 0.55, 0]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.85, 0.55, 0.11]} />
        <MeshDistortMaterial color="#1E5EFF" metalness={0.1} roughness={0.4} distort={0.05} speed={2} />
      </mesh>

      {/* Right sleeve */}
      <mesh position={[1.55, 0.55, 0]} rotation={[0, 0, 0.45]}>
        <boxGeometry args={[0.85, 0.55, 0.11]} />
        <MeshDistortMaterial color="#1E5EFF" metalness={0.1} roughness={0.4} distort={0.05} speed={2} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.18, 32, 1, true]} />
        <MeshDistortMaterial color="#123A73" metalness={0.2} roughness={0.3} distort={0.02} speed={1} />
      </mesh>

      {/* Gold logo mark */}
      <mesh position={[0, 0.3, 0.07]}>
        <torusGeometry args={[0.22, 0.04, 16, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ── Animated particles ────────────────────────────────────────────
function Particles() {
  const count = 60;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#D4AF37" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ── Ambient glow spheres ──────────────────────────────────────────
function GlowSpheres() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    r1.current.position.x = Math.sin(t * 0.3) * 2.5;
    r1.current.position.y = Math.cos(t * 0.2) * 1.5;
    r2.current.position.x = Math.cos(t * 0.25) * 3;
    r2.current.position.y = Math.sin(t * 0.35) * 2;
  });

  return (
    <>
      <Sphere ref={r1} args={[0.6, 32, 32]} position={[-3, 1, -2]}>
        <meshStandardMaterial color="#1E5EFF" transparent opacity={0.15} />
      </Sphere>
      <Sphere ref={r2} args={[0.4, 32, 32]} position={[3, -1, -2]}>
        <meshStandardMaterial color="#D4AF37" transparent opacity={0.2} />
      </Sphere>
    </>
  );
}

// ── Text animation variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

// ── Main Hero Component ───────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-navy-darkest overflow-hidden flex items-center">

      {/* ── 3D Canvas Background ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <pointLight position={[-3, 2, 2]} color="#D4AF37" intensity={0.8} />
          <pointLight position={[3, -2, 2]} color="#1E5EFF" intensity={0.6} />

          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
              <FloatingShirt />
            </Float>
            <Particles />
            <GlowSpheres />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-darkest via-navy-darkest/85 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-navy-darkest to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Europe & Middle East Delivery
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Wear Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
              Identity
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="text-navy-soft text-lg sm:text-xl leading-relaxed mb-10 max-w-lg"
          >
            Design your perfect custom T-shirt online. Choose colors, upload your logo, add text — and we ship directly to your door across Europe and the Middle East.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
            <Link
              href="/customize"
              className="group flex items-center gap-3 px-7 py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/30 text-base"
            >
              <span>🎨</span>
              Start Designing
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-2xl transition-all duration-200 text-base backdrop-blur-sm"
            >
              Browse Collection
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-8">
            {[
              { value: '10K+', label: 'Orders Delivered' },
              { value: '30+',  label: 'Countries Shipped' },
              { value: '4.9★', label: 'Customer Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-navy-soft text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-navy-soft text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-navy-soft to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}