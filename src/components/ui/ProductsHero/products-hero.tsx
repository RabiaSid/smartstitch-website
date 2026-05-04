'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ── Floating card data ────────────────────────────────────────────
const CARDS = [
  { emoji: '👕', label: 'Classic Tee',      color: '#0A1F44', text: '#D4AF37',  rotate: -12, x: '8%',  y: '10%', size: 'w-28 h-36' },
  { emoji: '🎽', label: 'Sport Fit',         color: '#C1121F', text: '#ffffff',  rotate:   8, x: '22%', y: '55%', size: 'w-24 h-32' },
  { emoji: '👔', label: 'Premium Pima',      color: '#D4AF37', text: '#0A1F44', rotate:  -6, x: '70%', y: '8%',  size: 'w-32 h-40' },
  { emoji: '🧥', label: 'Oversized',         color: '#1E5EFF', text: '#ffffff',  rotate:  14, x: '82%', y: '52%', size: 'w-26 h-34' },
  { emoji: '👕', label: 'V-Neck',            color: '#2D6A4F', text: '#ffffff',  rotate:  -9, x: '48%', y: '68%', size: 'w-24 h-30' },
  { emoji: '👔', label: 'Polo Club',         color: '#6B1F2A', text: '#D4AF37', rotate:   5, x: '36%', y: '5%',  size: 'w-28 h-36' },
  { emoji: '🧒', label: 'Kids Organic',      color: '#F97316', text: '#ffffff',  rotate: -14, x: '60%', y: '72%', size: 'w-22 h-28' },
  { emoji: '👕', label: 'Long Sleeve',       color: '#374151', text: '#D4AF37', rotate:  10, x: '14%', y: '72%', size: 'w-26 h-34' },
  { emoji: '✨', label: 'Custom Print',      color: '#7C3AED', text: '#ffffff',  rotate:  -7, x: '88%', y: '18%', size: 'w-20 h-26' },
  { emoji: '🌍', label: 'Global Shipping',   color: '#0891B2', text: '#ffffff',  rotate:  12, x: '3%',  y: '40%', size: 'w-24 h-30' },
];

function FloatingCard({
  card, index,
}: {
  card: typeof CARDS[0];
  index: number;
}) {
  return (
    <motion.div
      className={`absolute ${card.size} rounded-2xl flex flex-col items-center justify-center gap-2 shadow-2xl cursor-default select-none`}
      style={{
        left: card.x,
        top:  card.y,
        backgroundColor: card.color,
        rotate: card.rotate,
        zIndex: index % 3,
      }}
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      animate={{
        opacity: [0, 1, 1],
        scale:   [0.6, 1.05, 1],
        y:       [40, -6, 0],
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale:  1.12,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.25 },
      }}
    >
      {/* Floating animation loop */}
      <motion.div
        className="flex flex-col items-center gap-1.5"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + index * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
      >
        <span className="text-3xl">{card.emoji}</span>
        <span
          className="text-xs font-bold tracking-wide text-center px-2"
          style={{ color: card.text }}
        >
          {card.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────
export function ProductsHero() {
  return (
    <div className="relative bg-navy-darkest overflow-hidden">

      {/* ── Floating cards background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient mesh */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl" />

        {/* Cards — pointer-events enabled so hover works */}
        <div className="absolute inset-0 pointer-events-auto">
          {CARDS.map((card, i) => (
            <FloatingCard key={card.label} card={card} index={i} />
          ))}
        </div>

        {/* Center fade — so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-darkest/10 via-navy-darkest/60 to-navy-darkest/80" />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gold text-sm font-semibold uppercase tracking-[0.25em] mb-4"
        >
          Our Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]"
        >
          Premium
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold">
            T-Shirts
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-navy-soft text-lg max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Custom printed & shipped across Europe & Middle East.
          No minimum order. Bulk discounts up to 30%.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-10"
        >
          {[
            { val: '8+',     label: 'Categories' },
            { val: '30+',    label: 'Colors' },
            { val: '10k+',   label: 'Orders' },
            { val: '30%',    label: 'Bulk Off' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-gold">{s.val}</div>
              <div className="text-navy-soft text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#products"
            className="px-8 py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30"
          >
            Browse Collection
          </a>
          <Link
            href="/customize"
            className="px-8 py-4 bg-white/8 hover:bg-white/12 border border-white/15 text-white font-semibold rounded-2xl transition-all hover:-translate-y-0.5 backdrop-blur-sm"
          >
            🎨 Design Your Shirt
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade into page */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-smoke to-transparent" /> */}
    </div>
  );
}

export default ProductsHero;