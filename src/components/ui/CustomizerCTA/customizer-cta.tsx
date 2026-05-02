'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
const steps = [
  { num: '01', title: 'Pick Your Shirt',   desc: 'Choose fabric, style, and base color from our collection' },
  { num: '02', title: 'Design It Live',    desc: 'Upload logo, add text, change colors — see it in 3D instantly' },
  { num: '03', title: 'Set Quantity',      desc: 'Bulk discounts apply automatically — more shirts, more savings' },
  { num: '04', title: 'We Ship to You',    desc: 'DHL or FedEx delivery across Europe and Middle East' },
];

// ── Component ─────────────────────────────────────────────────────
export function CustomizerCTA() {
  return (
    <section className="bg-navy-darkest py-20 lg:py-28 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>

          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-gold font-medium text-sm uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              Design in Minutes,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                Delivered in Days
              </span>
            </h2>
            <p className="text-navy-soft text-lg max-w-xl mx-auto">
              Our live 3D customizer lets you see exactly what your shirt will look like before ordering.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="relative p-6 rounded-3xl bg-white/5 border border-white/8 hover:border-gold/20 hover:bg-white/8 transition-all duration-300 group"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-gold/20 z-10" />
                )}
                <div className="font-display text-5xl font-bold text-white/5 mb-4 group-hover:text-gold/10 transition-colors">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-navy-soft text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Big CTA */}
          <motion.div variants={fadeUp} className="text-center">
            <Link
              href="/customize"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-gold hover:bg-gold-dark text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/30"
            >
              <span>🎨</span>
              Launch 3D Customizer
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-navy-soft text-sm mt-4">No account needed to start designing</p>
          </motion.div>

        </AnimatedSection>
      </div>
    </section>
  );
}

export default CustomizerCTA;