'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

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
const testimonials = [
  {
    name: 'Marcus Weber',
    role: 'Marketing Director',
    company: 'TechFlow GmbH',
    country: '🇩🇪 Germany',
    text: 'Ordered 200 branded shirts for our company event. Quality was exceptional and delivery was faster than expected. The 3D customizer made the whole process so easy.',
    rating: 5,
    avatar: 'MW',
    color: 'from-blue-500 to-navy',
  },
  {
    name: 'Fatima Al-Rashid',
    role: 'Founder',
    company: 'Desert Bloom Boutique',
    country: '🇦🇪 UAE',
    text: 'SmartStitch has been our go-to for custom merchandise. The quality rivals European luxury brands at a fraction of the cost. Shipping to Dubai is always on time.',
    rating: 5,
    avatar: 'FA',
    color: 'from-gold to-amber-600',
  },
  {
    name: 'Sophie Laurent',
    role: 'Event Manager',
    company: 'Paris Events Co.',
    country: '🇫🇷 France',
    text: 'We use SmartStitch for all our corporate gifting. The bulk discount saved us 30% on our last order of 500 shirts. Absolutely recommend for B2B customers.',
    rating: 5,
    avatar: 'SL',
    color: 'from-emerald-500 to-teal-600',
  },
];

const stats = [
  { value: '10,000+', label: 'Orders Completed' },
  { value: '98%',     label: 'Customer Satisfaction' },
  { value: '30+',     label: 'Countries Delivered' },
  { value: '< 48h',   label: 'Average Response Time' },
];

// ── Component ─────────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>

          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Customer Stories</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-darkest">
              Loved by Businesses<br />
              <span className="text-navy">Across the Globe</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="p-7 rounded-3xl bg-neutral-smoke border border-gray-100 hover:border-navy-soft hover:shadow-card-hover transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-text text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-navy-darkest text-sm">{t.name}</div>
                    <div className="text-neutral-silver text-xs">{t.role} · {t.company}</div>
                    <div className="text-xs mt-0.5">{t.country}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center justify-center gap-8 lg:gap-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-navy-darkest">{stat.value}</div>
                <div className="text-neutral-silver text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </AnimatedSection>
      </div>
    </section>
  );
}

export default Testimonials;