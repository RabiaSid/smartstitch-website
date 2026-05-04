'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductDetail } from '../ProductDetailVisual/product-types';

interface Props { product: ProductDetail; }

export function ProductDetailTabs({ product }: Props) {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card">

      {/* Tab headers */}
      <div className="flex border-b border-gray-100">
        {(['details', 'reviews'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-4 text-sm font-semibold capitalize transition-all',
              activeTab === tab
                ? 'text-navy-darkest border-b-2 border-navy-darkest'
                : 'text-neutral-silver hover:text-navy'
            )}
          >
            {tab === 'reviews' ? `Reviews (${product.reviews})` : 'Product Details'}
          </button>
        ))}
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">

          {/* ── Details tab ── */}
          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              <div>
                <h3 className="font-display font-semibold text-navy-darkest text-lg mb-4">Description</h3>
                <p className="text-neutral-text text-sm leading-relaxed mb-6">{product.description}</p>

                <h3 className="font-display font-semibold text-navy-darkest text-lg mb-4">Features</h3>
                <ul className="space-y-2.5">
                  {product.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-text">
                      <Check size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display font-semibold text-navy-darkest text-lg mb-4">Print Options</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.printOptions.map(p => (
                    <span key={p} className="px-3 py-2 bg-navy-soft text-navy-darkest text-xs font-medium rounded-xl">
                      {p}
                    </span>
                  ))}
                </div>

                <h3 className="font-display font-semibold text-navy-darkest text-lg mb-4">Delivery Times</h3>
                <div className="space-y-3">
                  {[
                    { region: '🇪🇺 Europe',      time: product.deliveryEU },
                    { region: '🇦🇪 Middle East', time: product.deliveryME },
                  ].map(d => (
                    <div key={d.region} className="flex items-center justify-between p-3 bg-neutral-smoke rounded-xl">
                      <span className="text-sm font-medium text-navy-darkest">{d.region}</span>
                      <span className="text-sm text-neutral-silver">{d.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Reviews tab ── */}
          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Rating summary */}
              <div className="flex items-center gap-6 p-6 bg-neutral-smoke rounded-2xl mb-8">
                <div className="text-center">
                  <div className="font-display text-6xl font-bold text-navy-darkest">{product.rating}</div>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="text-xs text-neutral-silver mt-1">{product.reviews} reviews</div>
                </div>

                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-neutral-silver w-4">{stars}</span>
                      <Star size={10} className="fill-gold text-gold" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full"
                          style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : '5%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review cards */}
              {product.reviews_list.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 border border-gray-100 rounded-2xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy-darkest flex items-center justify-center text-white text-sm font-bold">
                        {r.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-navy-darkest text-sm">{r.name} {r.country}</div>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array(r.rating).fill(0).map((_, i) => (
                            <Star key={i} size={11} className="fill-gold text-gold" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-silver">{r.date}</span>
                  </div>
                  <p className="text-sm text-neutral-text leading-relaxed">{r.text}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs text-emerald-600 font-medium">
                    <Check size={11} /> Verified Purchase
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProductDetailTabs;