'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Star, ShoppingBag, Truck, Shield, RotateCcw, Check, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BULK_TIERS, getDiscount } from '../ProductDetailVisual/product-types';
import type { ProductDetail } from '../ProductDetailVisual/product-types';

interface Props { product: ProductDetail; }

export function ProductDetailInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity,     setQuantity]     = useState(1);
  const [addedToCart,  setAddedToCart]  = useState(false);

  const discount   = getDiscount(quantity);
  const unitPrice  = product.basePrice * (1 - discount / 100);
  const totalPrice = unitPrice * quantity;
  const savings    = (product.basePrice - unitPrice) * quantity;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="space-y-6">

      {/* Name + rating */}
      <div>
        <p className="text-navy font-semibold text-sm uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-navy-darkest mb-3 leading-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={16}
                className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="font-semibold text-navy-darkest">{product.rating}</span>
          <span className="text-neutral-silver text-sm">({product.reviews} reviews)</span>
        </div>
      </div>

      {/* Price card */}
      <div className="p-5 bg-white rounded-2xl border border-gray-100">
        <div className="flex items-end gap-3 mb-2">
          <span className="font-display text-4xl font-bold text-navy-darkest">
            €{unitPrice.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-neutral-silver text-lg line-through mb-1">
              €{product.originalPrice}
            </span>
          )}
          <span className="text-sm text-neutral-silver mb-1">/ piece</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
              {discount}% BULK DISCOUNT
            </span>
            <span className="text-emerald-600 text-sm font-medium">
              Save €{savings.toFixed(2)} total
            </span>
          </div>
        )}
        <p className="text-xs text-neutral-silver mt-2">
          {product.moq > 1 ? `Minimum order: ${product.moq} pieces` : 'No minimum order'}
        </p>
      </div>

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="font-semibold text-navy-darkest text-sm">Select Size</label>
          <button className="text-xs text-navy underline underline-offset-2">Size Guide</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all',
                selectedSize === size
                  ? 'border-navy-darkest bg-navy-darkest text-white'
                  : 'border-gray-200 text-neutral-text hover:border-navy hover:text-navy'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="font-semibold text-navy-darkest text-sm block mb-3">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity(q => Math.max(product.moq, q - 1))}
              className="px-4 py-3 hover:bg-gray-50 transition-colors text-neutral-text"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(Math.max(product.moq, Number(e.target.value)))}
              className="w-16 text-center font-semibold text-navy-darkest border-none outline-none py-3 text-sm"
            />
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-4 py-3 hover:bg-gray-50 transition-colors text-neutral-text"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex-1 p-3 bg-navy-soft rounded-xl text-center">
            <div className="text-xs text-navy-dark mb-0.5">Total</div>
            <div className="font-display font-bold text-navy-darkest text-xl">
              €{totalPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Bulk tier buttons */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {BULK_TIERS.map(tier => (
            <button
              key={tier.label}
              onClick={() => setQuantity(tier.min)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                quantity >= tier.min && quantity <= tier.max
                  ? 'bg-navy-darkest text-white border-navy-darkest'
                  : 'bg-white border-gray-200 text-neutral-silver hover:border-navy hover:text-navy'
              )}
            >
              {tier.label}
              {tier.discount > 0 && (
                <span className="ml-1 text-gold font-bold">-{tier.discount}%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all',
            addedToCart
              ? 'bg-emerald-500 text-white'
              : 'bg-navy-darkest hover:bg-navy-dark text-white hover:-translate-y-0.5 hover:shadow-navy'
          )}
        >
          <AnimatePresence mode="wait">
            {addedToCart ? (
              <motion.span key="added" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Check size={18} /> Added to Cart!
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <ShoppingBag size={18} /> Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <Link
          href={`/customize?product=${product.id}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-gold text-base"
        >
          🎨 Customize
        </Link>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        {[
          { icon: Truck,     text: `EU: ${product.deliveryEU}` },
          { icon: Shield,    text: 'Quality Guaranteed' },
          { icon: RotateCcw, text: 'Easy Returns' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-gray-100 text-center">
            <Icon size={18} className="text-navy" />
            <span className="text-xs text-neutral-silver leading-tight">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailInfo;