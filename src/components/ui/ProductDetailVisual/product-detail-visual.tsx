'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductDetail } from './product-types';

interface Props {
  product:       ProductDetail;
  selectedColor: number;
  onColorChange: (i: number) => void;
}

export function ProductDetailVisual({ product, selectedColor, onColorChange }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered3D,  setHovered3D]  = useState(false);

  const bgHex = product.colors[selectedColor]?.hex ?? '#DCE7FF';

  return (
    <div className="space-y-4">

      {/* Main display */}
      <motion.div
        className="relative rounded-3xl overflow-hidden h-96 lg:h-[500px] flex items-center justify-center cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${bgHex}20 0%, ${bgHex}45 50%, ${bgHex}25 100%)`,
        }}
        onHoverStart={() => setHovered3D(true)}
        onHoverEnd={() => setHovered3D(false)}
      >
        {/* Decorative rings */}
        <div className="absolute inset-8  rounded-full border-2 opacity-10 transition-colors duration-500" style={{ borderColor: bgHex }} />
        <div className="absolute inset-16 rounded-full border   opacity-5  transition-colors duration-500" style={{ borderColor: bgHex }} />

        {/* Shirt emoji */}
        <motion.div
          className="text-[160px] lg:text-[200px] select-none"
          animate={hovered3D
            ? { scale: 1.1, rotate: [-3, 3, -2, 0], y: -10 }
            : { scale: 1,   rotate: 0,               y: 0   }
          }
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          {product.emoji}
        </motion.div>

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-5 left-5 px-3 py-1.5 bg-gold text-white text-xs font-bold rounded-full">
            {product.tag}
          </div>
        )}

        {/* Share + Wishlist */}
        <div className="absolute top-5 right-5 flex gap-2">
          <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform text-neutral-silver hover:text-navy">
            <Share2 size={15} />
          </button>
          <button
            onClick={() => setWishlisted(w => !w)}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart size={15} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-silver'} />
          </button>
        </div>

        {/* Color name label */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-navy-darkest">
          {product.colors[selectedColor]?.name}
        </div>
      </motion.div>

      {/* Color swatches */}
      <div className="flex items-center gap-3 flex-wrap">
        {product.colors.map((c, i) => (
          <button
            key={c.hex}
            onClick={() => onColorChange(i)}
            title={c.name}
            className={cn(
              'w-9 h-9 rounded-full border-4 transition-all hover:scale-110',
              selectedColor === i
                ? 'border-navy-darkest scale-110 shadow-lg'
                : 'border-transparent hover:border-gray-300'
            )}
            style={{
              backgroundColor: c.hex,
              boxShadow: c.hex === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined,
            }}
          />
        ))}
        <span className="text-xs text-neutral-silver ml-1">
          {product.colors.length} colors available
        </span>
      </div>

      {/* Fabric + weight + stock badges */}
      <div className="flex gap-3 flex-wrap">
        <span className="px-3 py-1.5 bg-navy-soft text-navy-darkest text-xs font-medium rounded-full">
          {product.fabric}
        </span>
        <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
          {product.weight}
        </span>
        <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
          {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </span>
      </div>
    </div>
  );
}

export default ProductDetailVisual;