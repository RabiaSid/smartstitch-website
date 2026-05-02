'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, Palette, Shield, Headphones } from 'lucide-react';

// ── Animation helpers ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (delay = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger(0)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────
const features = [
  { icon: Truck,      title: 'Free Shipping',      desc: 'Orders over €150 ship free to Europe & Middle East', color: 'text-blue-400' },
  { icon: Palette,    title: 'Live Customizer',     desc: '3D design tool — see your shirt before you order',   color: 'text-gold' },
  { icon: Shield,     title: 'Quality Guaranteed',  desc: 'Premium fabric, professional printing, or money back', color: 'text-emerald-400' },
  { icon: Headphones, title: '24/7 Support',        desc: 'WhatsApp & live chat — we reply within 1 hour',     color: 'text-purple-400' },
];

// ── Component ─────────────────────────────────────────────────────
export function FeaturesStrip() {
  return (
    <section className="bg-navy-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className={`p-2.5 rounded-xl bg-white/5 ${f.color} group-hover:scale-110 transition-transform`}>
                <f.icon size={22} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-navy-soft text-xs leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

export default FeaturesStrip;