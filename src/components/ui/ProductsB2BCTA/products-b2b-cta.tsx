'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function ProductsB2BCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16 rounded-3xl bg-navy-darkest p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
    >
      <div className="text-center lg:text-left">
        <h2 className="font-display text-3xl font-bold text-white mb-3">
          Need 50+ Shirts?
        </h2>
        <p className="text-navy-soft max-w-md">
          Get a custom B2B quote with bulk pricing, dedicated account manager,
          and priority production slot.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <Link
          href="/b2b"
          className="px-8 py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30 text-center"
        >
          Get B2B Quote
        </Link>
        <Link
          href="/contact"
          className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all text-center"
        >
          WhatsApp Us
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductsB2BCTA;