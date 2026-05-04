'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Minus, Plus, X, ShoppingBag, Tag,
  Truck, Shield, ArrowRight, ChevronRight,
  Package, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface CartItem {
  id: string;
  name: string;
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
  basePrice: number;
  printType: string;
  printCost: number;
  embroidery: boolean;
  emoji: string;
  customText?: string;
}

// ─────────────────────────────────────────────
// MOCK CART DATA
// ─────────────────────────────────────────────
const INITIAL_ITEMS: CartItem[] = [
  {
    id: '1', name: 'Classic Essential Tee',
    color: 'Navy', colorHex: '#0A1F44',
    size: 'L', quantity: 25,
    basePrice: 8.50, printType: 'Front + Back',
    printCost: 8, embroidery: false,
    emoji: '👕', customText: 'SmartStitch Team',
  },
  {
    id: '2', name: 'Premium Pima Cotton',
    color: 'Royal Blue', colorHex: '#1E5EFF',
    size: 'M', quantity: 10,
    basePrice: 14.00, printType: 'Front Only',
    printCost: 5, embroidery: true,
    emoji: '👔',
  },
];

const PROMO_CODES: Record<string, number> = {
  'SMART10':  10,
  'WELCOME15': 15,
  'BULK20':   20,
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function getItemTotal(item: CartItem) {
  const base        = item.basePrice * item.quantity;
  const print       = item.printCost * item.quantity;
  const embroidery  = item.embroidery ? 4 * item.quantity : 0;
  return base + print + embroidery;
}

function getBulkDiscount(subtotal: number, totalQty: number) {
  if (totalQty >= 100) return 30;
  if (totalQty >= 50)  return 20;
  if (totalQty >= 10)  return 10;
  return 0;
}

// ─────────────────────────────────────────────
// CART ITEM CARD
// ─────────────────────────────────────────────
function CartItemCard({
  item,
  onUpdateQty,
  onRemove,
}: {
  item: CartItem;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const itemTotal = getItemTotal(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-5 shadow-card"
    >
      <div className="flex gap-4">

        {/* Shirt preview */}
        <div
          className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 text-4xl"
          style={{ background: `${item.colorHex}22` }}
        >
          {item.emoji}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-semibold text-navy-darkest text-base leading-snug">
                {item.name}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-navy-soft text-navy-darkest text-xs rounded-full">
                  <div className="w-2.5 h-2.5 rounded-full border border-white/50" style={{ backgroundColor: item.colorHex }} />
                  {item.color}
                </span>
                <span className="px-2 py-0.5 bg-neutral-smoke text-neutral-text text-xs rounded-full">
                  Size {item.size}
                </span>
                <span className="px-2 py-0.5 bg-gold-cream text-gold-dark text-xs rounded-full">
                  {item.printType}
                </span>
                {item.embroidery && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Embroidery
                  </span>
                )}
                {item.customText && (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                    "{item.customText}"
                  </span>
                )}
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => onRemove(item.id)}
              className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-neutral-silver hover:text-red-500 transition-all flex-shrink-0"
            >
              <X size={13} />
            </button>
          </div>

          {/* Price breakdown */}
          <div className="mt-3 text-xs text-neutral-silver space-y-0.5">
            <div className="flex gap-3">
              <span>Base: €{item.basePrice.toFixed(2)}/pc</span>
              {item.printCost > 0 && <span>Print: +€{item.printCost}/pc</span>}
              {item.embroidery && <span>Embroidery: +€4/pc</span>}
            </div>
          </div>

          {/* Quantity + Total */}
          <div className="flex items-center justify-between mt-4">

            {/* Qty controls */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                className="px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <Minus size={13} className="text-neutral-text" />
              </button>
              <span className="px-3 py-2 font-semibold text-navy-darkest text-sm min-w-[3rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                className="px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <Plus size={13} className="text-neutral-text" />
              </button>
            </div>

            {/* Item total */}
            <div className="text-right">
              <div className="font-display font-bold text-navy-darkest text-lg">
                €{itemTotal.toFixed(2)}
              </div>
              <div className="text-xs text-neutral-silver">
                €{(itemTotal / item.quantity).toFixed(2)}/pc
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// EMPTY CART
// ─────────────────────────────────────────────
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="text-7xl mb-6">🛒</div>
      <h2 className="font-display text-2xl font-bold text-navy-darkest mb-3">
        Your cart is empty
      </h2>
      <p className="text-neutral-silver mb-8 max-w-sm mx-auto">
        Looks like you haven't added anything yet. Start designing your custom t-shirts!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/customize"
          className="px-7 py-3.5 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-gold"
        >
          🎨 Start Designing
        </Link>
        <Link
          href="/products"
          className="px-7 py-3.5 bg-navy hover:bg-navy-dark text-white font-semibold rounded-2xl transition-all hover:-translate-y-0.5"
        >
          Browse Products
        </Link>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN CART PAGE
// ─────────────────────────────────────────────
export default function CartPage() {
  const [items,      setItems]      = useState<CartItem[]>(INITIAL_ITEMS);
  const [promoCode,  setPromoCode]  = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calculations
  const totalQty     = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal     = items.reduce((s, i) => s + getItemTotal(i), 0);
  const bulkPct      = getBulkDiscount(subtotal, totalQty);
  const bulkDiscount = (subtotal * bulkPct) / 100;
  const afterBulk    = subtotal - bulkDiscount;
  const promoAmt     = (afterBulk * promoDiscount) / 100;
  const afterPromo   = afterBulk - promoAmt;
  const shipping     = afterPromo > 200 ? 0 : 18;
  const total        = afterPromo + shipping;

  // Handlers
  const updateQty = (id: string, qty: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoCode(code);
      setPromoDiscount(PROMO_CODES[code]);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try SMART10 or WELCOME15');
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoError('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-smoke">
        <div className="bg-navy-darkest py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-3xl font-bold text-white">Your Cart</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-smoke">

      {/* ── Header ── */}
      <div className="bg-navy-darkest py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-xs font-medium uppercase tracking-widest mb-1">
            {totalQty} items
          </p>
          <h1 className="font-display text-3xl font-bold text-white">Your Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Cart Items ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Bulk discount banner */}
            {bulkPct > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl"
              >
                <div className="text-2xl">🎉</div>
                <div>
                  <p className="font-semibold text-emerald-800 text-sm">
                    {bulkPct}% Bulk Discount Applied!
                  </p>
                  <p className="text-emerald-600 text-xs">
                    You're ordering {totalQty} pieces — saving €{bulkDiscount.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Next tier hint */}
            {bulkPct < 30 && (
              <div className="flex items-center gap-3 p-4 bg-navy-soft border border-navy-light/30 rounded-2xl">
                <div className="text-xl">💡</div>
                <div>
                  {totalQty < 10 && (
                    <p className="text-navy-darkest text-sm">
                      Add <strong>{10 - totalQty} more</strong> pieces to unlock <strong>10% bulk discount</strong>
                    </p>
                  )}
                  {totalQty >= 10 && totalQty < 50 && (
                    <p className="text-navy-darkest text-sm">
                      Add <strong>{50 - totalQty} more</strong> pieces to unlock <strong>20% discount</strong>
                    </p>
                  )}
                  {totalQty >= 50 && totalQty < 100 && (
                    <p className="text-navy-darkest text-sm">
                      Add <strong>{100 - totalQty} more</strong> pieces to unlock <strong>30% discount</strong>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Items */}
            <AnimatePresence>
              {items.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                />
              ))}
            </AnimatePresence>

            {/* Continue shopping */}
            <div className="flex gap-3 pt-2">
              <Link
                href="/products"
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:border-navy text-neutral-text hover:text-navy rounded-2xl text-sm font-medium transition-all"
              >
                <ShoppingBag size={15} />
                Continue Shopping
              </Link>
              <Link
                href="/customize"
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:border-gold text-neutral-text hover:text-gold-dark rounded-2xl text-sm font-medium transition-all"
              >
                🎨 Add Custom Design
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="space-y-4">

            {/* Promo code */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-navy-darkest text-sm mb-3 flex items-center gap-2">
                <Tag size={15} className="text-gold" />
                Promo Code
              </h3>

              {promoCode ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div>
                    <span className="font-bold text-emerald-700 text-sm">{promoCode}</span>
                    <span className="text-emerald-600 text-xs ml-2">−{promoDiscount}% off</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-emerald-600 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => { setPromoInput(e.target.value); setPromoError(''); }}
                    onKeyDown={e => e.key === 'Enter' && applyPromo()}
                    placeholder="Enter code..."
                    className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy placeholder:text-neutral-silver"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-dark transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-red-500 text-xs mt-2">{promoError}</p>
              )}
              {!promoCode && (
                <p className="text-neutral-silver text-xs mt-2">
                  Try: <button onClick={() => setPromoInput('SMART10')} className="text-navy underline">SMART10</button>
                  {' '}or{' '}
                  <button onClick={() => setPromoInput('WELCOME15')} className="text-navy underline">WELCOME15</button>
                </p>
              )}
            </div>

            {/* Price summary */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-navy-darkest text-sm mb-4">Order Summary</h3>

              <div className="space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-silver">Subtotal ({totalQty} pcs)</span>
                  <span className="font-medium text-navy-darkest">€{subtotal.toFixed(2)}</span>
                </div>

                {/* Bulk discount */}
                {bulkDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">Bulk discount ({bulkPct}%)</span>
                    <span className="font-medium text-emerald-600">−€{bulkDiscount.toFixed(2)}</span>
                  </div>
                )}

                {/* Promo discount */}
                {promoAmt > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">Promo ({promoCode})</span>
                    <span className="font-medium text-emerald-600">−€{promoAmt.toFixed(2)}</span>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-silver flex items-center gap-1">
                    <Truck size={13} />
                    Shipping (DHL)
                  </span>
                  <span className={cn(
                    'font-medium',
                    shipping === 0 ? 'text-emerald-600' : 'text-navy-darkest'
                  )}>
                    {shipping === 0 ? 'FREE 🎉' : `€${shipping.toFixed(2)}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-neutral-silver">
                    Free shipping on orders over €200
                  </p>
                )}

                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-navy-darkest">Total</span>
                    <span className="font-display font-bold text-gold text-2xl">
                      €{total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-silver mt-1 text-right">
                    €{(total / totalQty).toFixed(2)} per piece
                  </p>
                </div>
              </div>

              {/* Checkout button */}
              <Link
                href="/checkout"
                className="mt-5 w-full flex items-center justify-center gap-2 py-4 bg-navy-darkest hover:bg-navy-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-navy text-base"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              {/* Express checkout */}
              <div className="mt-4">
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-neutral-silver">or pay with</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:border-navy transition-colors flex items-center justify-center gap-2">
                    🍎 Apple Pay
                  </button>
                  <button className="py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:border-navy transition-colors flex items-center justify-center gap-2">
                    🔵 Tabby
                  </button>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl p-5 shadow-card space-y-3">
              {[
                { icon: Shield,   text: 'Secure checkout — SSL encrypted' },
                { icon: Truck,    text: 'DHL delivery — Europe 5-7 days' },
                { icon: RotateCcw,text: 'Easy returns within 14 days' },
                { icon: Package,  text: 'Bulk orders — dedicated support' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-neutral-silver">
                  <Icon size={15} className="text-navy flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Payment icons */}
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <p className="text-xs text-neutral-silver text-center mb-3">Accepted payments</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Visa', 'Mastercard', 'Stripe', 'Apple Pay', 'Tabby', 'Wire'].map(p => (
                  <span
                    key={p}
                    className="px-2.5 py-1 bg-neutral-smoke border border-gray-200 rounded-lg text-xs font-medium text-neutral-text"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}