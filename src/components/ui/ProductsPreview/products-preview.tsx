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
const products = [
  { id: '1', name: 'Classic Essential',    price: 8.50,  originalPrice: 12,   tag: 'Best Seller', colors: ['#FFFFFF','#111111','#0A1F44'], img: '👕' },
  { id: '2', name: 'Premium Pima Cotton',  price: 14.00, originalPrice: 18,   tag: 'Premium',     colors: ['#1E5EFF','#D4AF37','#2D6A4F'], img: '👔' },
  { id: '3', name: 'Sport Performance',    price: 11.00, originalPrice: null,  tag: 'New',         colors: ['#111111','#C1121F','#0A1F44'], img: '🎽' },
  { id: '4', name: 'Oversized Streetwear', price: 13.50, originalPrice: null,  tag: 'Trending',    colors: ['#6B7280','#FFFFFF','#D4AF37'], img: '👕' },
];

// ── Sub-component: ProductCard ────────────────────────────────────
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const tagColors: Record<string, string> = {
    'Best Seller': 'bg-gold/10 text-gold border-gold/20',
    'Premium':     'bg-purple-500/10 text-purple-300 border-purple-500/20',
    'New':         'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    'Trending':    'bg-blue-500/10 text-blue-300 border-blue-500/20',
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover cursor-pointer"
    >
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-navy-dark to-navy-soft h-56 flex items-center justify-center overflow-hidden">
        <motion.div
          className="text-8xl"
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
        >
          {product.img}
        </motion.div>

        {/* Tag */}
        <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[product.tag]}`}>
          {product.tag}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy-darkest/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/customize?product=${product.id}`}
            className="px-5 py-2.5 bg-gold text-white font-semibold rounded-xl text-sm hover:bg-gold-dark transition-colors"
          >
            Customize This
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-navy-darkest text-base mb-1">{product.name}</h3>

        {/* Colors */}
        <div className="flex items-center gap-1.5 mb-3">
          {product.colors.map((c) => (
            <div
              key={c}
              className="w-5 h-5 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-125 transition-transform"
              style={{ backgroundColor: c }}
            />
          ))}
          <span className="text-xs text-neutral-silver ml-1">+8 colors</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-navy-darkest text-lg">€{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-neutral-silver text-sm line-through">€{product.originalPrice}</span>
            )}
          </div>
          <span className="text-xs text-navy-soft">per piece</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Component ─────────────────────────────────────────────────────
export function ProductsPreview() {
  return (
    <section className="bg-neutral-smoke py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div variants={fadeUp}>
            <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Our Collection</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-darkest leading-tight">
              Premium T-Shirts<br />
              <span className="text-navy">Built for Scale</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-navy font-semibold hover:text-navy-dark transition-colors"
            >
              View All Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* Products grid */}
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </AnimatedSection>

        {/* Bulk pricing banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-navy-darkest to-navy-dark border border-navy-dark flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">Bulk Order Discounts</h3>
            <p className="text-navy-soft text-sm">The more you order, the more you save.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { qty: '10+',  disc: '10% off' },
              { qty: '50+',  disc: '20% off' },
              { qty: '100+', disc: '30% off' },
            ].map((d) => (
              <div key={d.qty} className="text-center px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-display font-bold text-gold text-xl">{d.disc}</div>
                <div className="text-navy-soft text-xs mt-0.5">{d.qty} shirts</div>
              </div>
            ))}
          </div>
          <Link
            href="/b2b"
            className="flex-shrink-0 px-6 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
          >
            Get B2B Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductsPreview;