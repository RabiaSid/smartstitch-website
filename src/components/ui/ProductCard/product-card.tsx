'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  category: string;
  fabric: string;
  basePrice: number;
  originalPrice?: number;
  tag?: string;
  rating: number;
  reviews: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  emoji: string;
  description: string;
  inStock: boolean;
  moq: number;
}

export const TAG_COLORS: Record<string, string> = {
  'Best Seller': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Premium':     'bg-purple-50 text-purple-700 border-purple-200',
  'New':         'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Trending':    'bg-blue-50 text-blue-700 border-blue-200',
};

// ── Component ─────────────────────────────────────────────────────
export function ProductCard({ product, index }: { product: Product; index: number }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlisted, setWishlisted]       = useState(false);
  const [hovered, setHovered]             = useState(false);

  const bgHex = product.colors[selectedColor]?.hex ?? '#DCE7FF';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div
        className="relative h-56 flex items-center justify-center overflow-hidden transition-colors duration-500"
        style={{ background: `linear-gradient(135deg, ${bgHex}25 0%, ${bgHex}50 100%)` }}
      >
        <motion.div
          className="text-8xl select-none pointer-events-none"
          animate={hovered
            ? { scale: 1.1, y: -8, rotate: [-2, 2, -1, 0] }
            : { scale: 1,   y: 0,  rotate: 0 }
          }
          transition={{ duration: 0.4 }}
        >
          {product.emoji}
        </motion.div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center">
            <span className="px-4 py-1.5 bg-neutral-jet text-white text-xs font-semibold rounded-full tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {product.tag && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${TAG_COLORS[product.tag]}`}>
            {product.tag}
          </span>
        )}

        <button
          onClick={() => setWishlisted(w => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart size={14} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-silver'} />
        </button>

        <AnimatePresence>
          {hovered && product.inStock && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
            >
              <Link
                href={`/customize?product=${product.id}`}
                className="flex-1 py-2 bg-navy-darkest hover:bg-navy-dark text-white text-xs font-semibold rounded-xl text-center transition-colors"
              >
                🎨 Customize
              </Link>
              <Link
                href={`/products/${product.id}`}
                className="flex-1 py-2 bg-gold hover:bg-gold-dark text-white text-xs font-semibold rounded-xl text-center transition-colors"
              >
                Details
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-navy uppercase tracking-wider">{product.category}</span>
          <span className="text-xs text-neutral-silver">{product.fabric}</span>
        </div>

        <h3 className="font-display font-semibold text-navy-darkest text-base mb-2 group-hover:text-navy transition-colors leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={12}
                className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-silver">{product.rating} ({product.reviews})</span>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          {product.colors.map((c, i) => (
            <button
              key={c.hex}
              onClick={() => setSelectedColor(i)}
              title={c.name}
              className={cn(
                'w-5 h-5 rounded-full border-2 transition-all hover:scale-125',
                selectedColor === i ? 'border-navy-darkest scale-125 shadow-sm' : 'border-transparent'
              )}
              style={{
                backgroundColor: c.hex,
                boxShadow: c.hex === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined,
              }}
            />
          ))}
          <span className="text-xs text-neutral-silver ml-1">+8 colors</span>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-navy-darkest text-xl">€{product.basePrice.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-neutral-silver text-sm line-through">€{product.originalPrice}</span>
              )}
            </div>
            <p className="text-xs text-neutral-silver mt-0.5">
              {product.moq > 1 ? `Min. ${product.moq} pcs` : 'No minimum'}
            </p>
          </div>

          <Link
            href={`/customize?product=${product.id}`}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all',
              product.inStock
                ? 'bg-navy text-white hover:bg-navy-dark hover:-translate-y-0.5 hover:shadow-navy'
                : 'bg-gray-100 text-neutral-silver pointer-events-none'
            )}
          >
            <ShoppingBag size={13} />
            {product.inStock ? 'Order Now' : 'Notify Me'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;