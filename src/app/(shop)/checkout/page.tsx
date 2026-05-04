'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight, ChevronLeft, Check, Shield,
  Truck, CreditCard, Building2, Smartphone,
  MapPin, User, Mail, Phone, Lock, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Address {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const EU_COUNTRIES = [
  { code: 'DE', name: '🇩🇪 Germany' },
  { code: 'GB', name: '🇬🇧 United Kingdom' },
  { code: 'FR', name: '🇫🇷 France' },
  { code: 'NL', name: '🇳🇱 Netherlands' },
  { code: 'BE', name: '🇧🇪 Belgium' },
  { code: 'AT', name: '🇦🇹 Austria' },
  { code: 'CH', name: '🇨🇭 Switzerland' },
  { code: 'SE', name: '🇸🇪 Sweden' },
  { code: 'IT', name: '🇮🇹 Italy' },
  { code: 'ES', name: '🇪🇸 Spain' },
];

const ME_COUNTRIES = [
  { code: 'AE', name: '🇦🇪 UAE' },
  { code: 'SA', name: '🇸🇦 Saudi Arabia' },
  { code: 'KW', name: '🇰🇼 Kuwait' },
  { code: 'QA', name: '🇶🇦 Qatar' },
  { code: 'BH', name: '🇧🇭 Bahrain' },
  { code: 'OM', name: '🇴🇲 Oman' },
];

const SHIPPING_OPTIONS = [
  {
    id: 'dhl_express',
    carrier: 'DHL Express',
    service: 'Express Delivery',
    days: '5-7 business days',
    price: 18,
    icon: '🟡',
  },
  {
    id: 'dhl_economy',
    carrier: 'DHL Economy',
    service: 'Standard Delivery',
    days: '8-12 business days',
    price: 10,
    icon: '⚪',
  },
  {
    id: 'fedex',
    carrier: 'FedEx International',
    service: 'Priority Delivery',
    days: '4-6 business days',
    price: 24,
    icon: '🟣',
  },
];

const PAYMENT_METHODS = [
  { id: 'stripe_card',    label: 'Credit / Debit Card',  icon: CreditCard,  desc: 'Visa, Mastercard, Amex',       market: 'EU' },
  { id: 'stripe_apple',   label: 'Apple Pay',             icon: Smartphone,  desc: 'Pay with Touch ID / Face ID',  market: 'EU' },
  { id: 'sepa',           label: 'SEPA Bank Transfer',    icon: Building2,   desc: 'EU bank accounts only',        market: 'EU' },
  { id: 'tabby',          label: 'Tabby — Buy Now Pay Later', icon: Smartphone, desc: 'Split into 4 payments, 0% interest', market: 'ME' },
  { id: 'wire',           label: 'Wire Transfer (B2B)',   icon: Building2,   desc: 'For bulk orders 100+ pieces',  market: 'BOTH' },
];

const STEPS = ['Shipping Address', 'Delivery Method', 'Payment', 'Review Order'];

// Mock order summary
const ORDER = {
  items: [
    { name: 'Classic Essential Tee', color: 'Navy', size: 'L', qty: 25, emoji: '👕', total: 337.50 },
    { name: 'Premium Pima Cotton',   color: 'Royal Blue', size: 'M', qty: 10, emoji: '👔', total: 190.00 },
  ],
  subtotal:     527.50,
  bulkDiscount: 52.75,
  shipping:     18.00,
  total:        492.75,
  currency:     '€',
};

// ─────────────────────────────────────────────
// INPUT COMPONENT
// ─────────────────────────────────────────────
function Input({
  label, name, value, onChange, placeholder = '', type = 'text',
  required = false, icon: Icon, half = false,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string; required?: boolean;
  icon?: any; half?: boolean;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', half ? 'col-span-1' : 'col-span-2')}>
      <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-silver" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full py-3 rounded-xl border border-gray-200 text-sm text-neutral-text',
            'focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent',
            'placeholder:text-neutral-silver transition-all',
            Icon ? 'pl-10 pr-4' : 'px-4'
          )}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 1 — SHIPPING ADDRESS
// ─────────────────────────────────────────────
function StepAddress({ address, onChange }: { address: Address; onChange: (e: any) => void }) {
  const allCountries = [...EU_COUNTRIES, ...ME_COUNTRIES];

  return (
    <div>
      <h2 className="font-display font-bold text-navy-darkest text-xl mb-6">Shipping Address</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Full Name"    name="fullName"    value={address.fullName}    onChange={onChange} placeholder="John Smith"         required icon={User}  />
        <Input label="Company"      name="company"     value={address.company}     onChange={onChange} placeholder="Company (optional)"        half />
        <Input label="Email"        name="email"       value={address.email}       onChange={onChange} placeholder="john@company.com"   required icon={Mail}  type="email" />
        <Input label="Phone"        name="phone"       value={address.phone}       onChange={onChange} placeholder="+49 123 456789"     required icon={Phone} half />
        <Input label="Address Line 1" name="street1"  value={address.street1}     onChange={onChange} placeholder="Street address"     required icon={MapPin} />
        <Input label="Address Line 2" name="street2"  value={address.street2}     onChange={onChange} placeholder="Apt, suite, floor (optional)" half />
        <Input label="City"         name="city"        value={address.city}        onChange={onChange} placeholder="Berlin"            required half />
        <Input label="State / Region" name="state"    value={address.state}       onChange={onChange} placeholder="Bavaria"                   half />
        <Input label="Postal Code"  name="postalCode"  value={address.postalCode}  onChange={onChange} placeholder="10115"            required half />

        {/* Country select */}
        <div className="col-span-1 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">
            Country <span className="text-red-400">*</span>
          </label>
          <select
            name="country"
            value={address.country}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-neutral-text focus:outline-none focus:ring-2 focus:ring-navy bg-white"
          >
            <option value="">Select country...</option>
            <optgroup label="🇪🇺 Europe">
              {EU_COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </optgroup>
            <optgroup label="🌙 Middle East">
              {ME_COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 2 — SHIPPING METHOD
// ─────────────────────────────────────────────
function StepShipping({
  selected, onSelect,
}: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div>
      <h2 className="font-display font-bold text-navy-darkest text-xl mb-2">Delivery Method</h2>
      <p className="text-neutral-silver text-sm mb-6">
        Estimated delivery times from Pakistan to your destination
      </p>
      <div className="space-y-3">
        {SHIPPING_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={cn(
              'w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left',
              selected === opt.id
                ? 'border-navy bg-navy-soft'
                : 'border-gray-200 bg-white hover:border-navy-light'
            )}
          >
            <span className="text-2xl">{opt.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-navy-darkest text-sm">{opt.carrier}</span>
                <span className="text-xs text-neutral-silver">— {opt.service}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Truck size={12} className="text-neutral-silver" />
                <span className="text-xs text-neutral-silver">{opt.days}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-display font-bold text-navy-darkest text-lg">
                €{opt.price.toFixed(2)}
              </div>
              {opt.price === 0 && (
                <span className="text-xs text-emerald-600 font-medium">FREE</span>
              )}
            </div>
            {selected === opt.id && (
              <div className="w-6 h-6 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={13} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Info box */}
      <div className="mt-6 p-4 bg-gold-cream border border-gold-light rounded-2xl flex gap-3">
        <Info size={16} className="text-gold-dark flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gold-dark">
          <strong>Production time:</strong> All custom orders require 3-5 business days for printing and quality check before shipping.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 3 — PAYMENT
// ─────────────────────────────────────────────
function StepPayment({
  selected, onSelect, country, cardData, setCardData,
}: {
  selected: string; onSelect: (id: string) => void;
  country: string; cardData: any; setCardData: any;
}) {
  const isME = ['AE','SA','KW','QA','BH','OM'].includes(country);

  const available = PAYMENT_METHODS.filter(m =>
    m.market === 'BOTH' ||
    (isME ? m.market === 'ME' : m.market === 'EU')
  );

  return (
    <div>
      <h2 className="font-display font-bold text-navy-darkest text-xl mb-2">Payment Method</h2>
      <p className="text-neutral-silver text-sm mb-6">
        {isME ? 'Middle East payment options' : 'European payment options'} available
      </p>

      <div className="space-y-3 mb-6">
        {available.map(method => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={cn(
              'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left',
              selected === method.id
                ? 'border-navy bg-navy-soft'
                : 'border-gray-200 bg-white hover:border-navy-light'
            )}
          >
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              selected === method.id ? 'bg-navy text-white' : 'bg-neutral-smoke text-neutral-silver'
            )}>
              <method.icon size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-navy-darkest text-sm">{method.label}</div>
              <div className="text-xs text-neutral-silver mt-0.5">{method.desc}</div>
            </div>
            {selected === method.id && (
              <div className="w-5 h-5 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={11} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Card form */}
      {selected === 'stripe_card' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-smoke rounded-2xl p-5 space-y-4"
        >
          <h3 className="font-semibold text-navy-darkest text-sm flex items-center gap-2">
            <Lock size={14} className="text-emerald-500" />
            Card Details — Secured by Stripe
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">Card Number</label>
            <input
              type="text"
              value={cardData.number}
              onChange={e => setCardData({ ...cardData, number: e.target.value })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">Expiry</label>
              <input
                type="text"
                value={cardData.expiry}
                onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                placeholder="MM / YY"
                maxLength={7}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy font-mono"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">CVV</label>
              <input
                type="password"
                value={cardData.cvv}
                onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                placeholder="•••"
                maxLength={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">Name on Card</label>
            <input
              type="text"
              value={cardData.name}
              onChange={e => setCardData({ ...cardData, name: e.target.value })}
              placeholder="John Smith"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-silver">
            <Lock size={11} className="text-emerald-500" />
            256-bit SSL encryption. Your card details are never stored.
          </div>
        </motion.div>
      )}

      {/* Tabby info */}
      {selected === 'tabby' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5"
        >
          <h3 className="font-semibold text-emerald-800 text-sm mb-2">💚 Tabby — Buy Now, Pay Later</h3>
          <p className="text-emerald-700 text-xs leading-relaxed">
            Split your payment into 4 equal installments. 0% interest, no hidden fees.
            You will be redirected to Tabby to complete your setup.
          </p>
          <div className="flex gap-2 mt-3">
            {['1/4 today', '1/4 in 1 month', '1/4 in 2 months', '1/4 in 3 months'].map(t => (
              <div key={t} className="flex-1 text-center py-1.5 bg-white rounded-lg text-xs font-medium text-emerald-700 border border-emerald-200">
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Wire transfer info */}
      {selected === 'wire' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-soft border border-navy-light/30 rounded-2xl p-5"
        >
          <h3 className="font-semibold text-navy-darkest text-sm mb-3">🏦 Wire Transfer Details</h3>
          <div className="space-y-2 text-xs">
            {[
              { label: 'Bank Name',       value: 'HBL — Habib Bank Limited' },
              { label: 'Account Name',    value: 'SmartStitch Exports' },
              { label: 'Account Number',  value: '1234-5678-9012' },
              { label: 'IBAN',            value: 'PK36HABB0000001123456702' },
              { label: 'SWIFT / BIC',     value: 'HABBPKKA' },
              { label: 'Reference',       value: 'Your Order ID (sent via email)' },
            ].map(r => (
              <div key={r.label} className="flex justify-between gap-4">
                <span className="text-neutral-silver font-medium">{r.label}</span>
                <span className="text-navy-darkest font-semibold text-right">{r.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-silver mt-3">
            Production starts after payment confirmation (1-2 business days).
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// STEP 4 — REVIEW ORDER
// ─────────────────────────────────────────────
function StepReview({
  address, shipping, payment, onPlaceOrder, placing,
}: {
  address: Address; shipping: string; payment: string;
  onPlaceOrder: () => void; placing: boolean;
}) {
  const shippingOpt  = SHIPPING_OPTIONS.find(s => s.id === shipping);
  const paymentOpt   = PAYMENT_METHODS.find(p => p.id === payment);

  return (
    <div>
      <h2 className="font-display font-bold text-navy-darkest text-xl mb-6">Review Your Order</h2>

      {/* Items */}
      <div className="bg-neutral-smoke rounded-2xl p-5 mb-4">
        <h3 className="font-semibold text-navy-darkest text-sm mb-4">Order Items</h3>
        <div className="space-y-3">
          {ORDER.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-soft flex items-center justify-center text-xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-darkest text-sm truncate">{item.name}</p>
                <p className="text-xs text-neutral-silver">{item.color} · Size {item.size} · Qty {item.qty}</p>
              </div>
              <span className="font-display font-bold text-navy-darkest text-sm">€{item.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Address + Shipping + Payment */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* Address */}
        <div className="bg-neutral-smoke rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} className="text-navy" />
            <span className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">Ship To</span>
          </div>
          <p className="text-sm font-semibold text-navy-darkest">{address.fullName || 'Not set'}</p>
          <p className="text-xs text-neutral-silver mt-1 leading-relaxed">
            {address.street1}<br />
            {address.city} {address.postalCode}<br />
            {address.country}
          </p>
        </div>

        {/* Shipping */}
        <div className="bg-neutral-smoke rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={14} className="text-navy" />
            <span className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">Delivery</span>
          </div>
          <p className="text-sm font-semibold text-navy-darkest">{shippingOpt?.carrier ?? 'Not selected'}</p>
          <p className="text-xs text-neutral-silver mt-1">{shippingOpt?.days}</p>
          <p className="text-xs font-semibold text-navy mt-1">€{shippingOpt?.price.toFixed(2)}</p>
        </div>

        {/* Payment */}
        <div className="bg-neutral-smoke rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={14} className="text-navy" />
            <span className="text-xs font-semibold text-navy-darkest uppercase tracking-wide">Payment</span>
          </div>
          <p className="text-sm font-semibold text-navy-darkest">{paymentOpt?.label ?? 'Not selected'}</p>
          <p className="text-xs text-neutral-silver mt-1">{paymentOpt?.desc}</p>
        </div>
      </div>

      {/* Price summary */}
      <div className="bg-navy-darkest rounded-2xl p-5 mb-6 space-y-2.5">
        <h3 className="font-semibold text-white text-sm mb-4">Price Summary</h3>
        {[
          { label: 'Subtotal',       value: `€${ORDER.subtotal.toFixed(2)}` },
          { label: 'Bulk discount (10%)', value: `-€${ORDER.bulkDiscount.toFixed(2)}`, green: true },
          { label: `Shipping (${shippingOpt?.carrier})`, value: `€${(shippingOpt?.price ?? 0).toFixed(2)}` },
        ].map(row => (
          <div key={row.label} className="flex justify-between">
            <span className="text-navy-soft text-xs">{row.label}</span>
            <span className={cn('text-xs font-semibold', row.green ? 'text-emerald-400' : 'text-white')}>
              {row.value}
            </span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-3 flex justify-between items-center">
          <span className="font-display font-bold text-white text-base">Total</span>
          <span className="font-display font-bold text-gold text-2xl">
            €{(ORDER.total + (shippingOpt?.price ?? 0) - 18).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Terms */}
      <p className="text-xs text-neutral-silver mb-5 leading-relaxed">
        By placing this order you agree to our{' '}
        <Link href="/terms" className="text-navy underline">Terms of Service</Link> and{' '}
        <Link href="/privacy" className="text-navy underline">Privacy Policy</Link>.
        All prices in EUR. VAT may apply.
      </p>

      {/* Place order button */}
      <motion.button
        onClick={onPlaceOrder}
        whileTap={{ scale: 0.97 }}
        disabled={placing}
        className={cn(
          'w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg transition-all',
          placing
            ? 'bg-emerald-500 text-white'
            : 'bg-gold hover:bg-gold-dark text-white hover:-translate-y-0.5 hover:shadow-gold'
        )}
      >
        {placing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            Placing Order...
          </>
        ) : (
          <>
            <Lock size={18} />
            Place Order — €{(ORDER.total + (shippingOpt?.price ?? 0) - 18).toFixed(2)}
          </>
        )}
      </motion.button>

      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-neutral-silver">
        <Shield size={12} className="text-emerald-500" />
        Secured by SSL — 256-bit encryption
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN CHECKOUT PAGE
// ─────────────────────────────────────────────
export default function CheckoutPage() {
  const [step,    setStep]    = useState(0);
  const [placing, setPlacing] = useState(false);
  const [done,    setDone]    = useState(false);

  const [address, setAddress] = useState<Address>({
    fullName: '', email: '', phone: '', company: '',
    street1: '', street2: '', city: '', state: '',
    postalCode: '', country: '',
  });

  const [shipping, setShipping] = useState('dhl_express');
  const [payment,  setPayment]  = useState('stripe_card');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setDone(true);
    }, 2500);
  };

  // ── Order Success Screen ──
  if (done) {
    return (
      <div className="min-h-screen bg-neutral-smoke flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={40} className="text-emerald-600" />
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-navy-darkest mb-3">
            Order Placed! 🎉
          </h1>
          <p className="text-neutral-silver mb-2">
            Thank you, <strong>{address.fullName || 'Customer'}</strong>!
          </p>
          <p className="text-neutral-silver text-sm mb-6">
            Order confirmation has been sent to <strong>{address.email || 'your email'}</strong>.
            We'll start production within 24 hours.
          </p>

          <div className="bg-white rounded-2xl p-5 shadow-card mb-6 text-left space-y-2">
            {[
              { label: 'Order ID',   value: '#SS-2026-0042' },
              { label: 'Total',      value: '€492.75' },
              { label: 'Delivery',   value: '5-7 business days' },
              { label: 'Tracking',   value: 'Will be emailed once shipped' },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-neutral-silver">{r.label}</span>
                <span className="font-semibold text-navy-darkest">{r.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/orders"
              className="w-full py-3.5 bg-navy hover:bg-navy-dark text-white font-bold rounded-2xl transition-all"
            >
              Track My Order
            </Link>
            <Link
              href="/products"
              className="w-full py-3.5 bg-white border border-gray-200 hover:border-navy text-navy-darkest font-semibold rounded-2xl transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-smoke">

      {/* ── Header ── */}
      <div className="bg-navy-darkest py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-xs font-medium uppercase tracking-widest mb-1">Secure Checkout</p>
          <h1 className="font-display text-3xl font-bold text-white">Complete Your Order</h1>
        </div>
      </div>

      {/* ── Progress steps ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-shrink-0">
                <div className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all',
                  i === step
                    ? 'bg-navy-darkest text-white'
                    : i < step
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-neutral-silver'
                )}>
                  {i < step
                    ? <Check size={12} />
                    : <span className="w-4 text-center">{i + 1}</span>
                  }
                  {s}
                </div>
                {i < STEPS.length - 1 && <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Step content ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 0 && (
                    <StepAddress address={address} onChange={handleAddressChange} />
                  )}
                  {step === 1 && (
                    <StepShipping selected={shipping} onSelect={setShipping} />
                  )}
                  {step === 2 && (
                    <StepPayment
                      selected={payment} onSelect={setPayment}
                      country={address.country}
                      cardData={cardData} setCardData={setCardData}
                    />
                  )}
                  {step === 3 && (
                    <StepReview
                      address={address} shipping={shipping}
                      payment={payment} onPlaceOrder={handlePlaceOrder}
                      placing={placing}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              {step < 3 && (
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                  {step > 0 && (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-neutral-text hover:border-navy hover:text-navy transition-all"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy hover:bg-navy-dark text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-navy text-sm"
                  >
                    Continue to {STEPS[step + 1]}
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Order summary ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-navy-darkest text-sm mb-4">Order Summary</h3>

              {ORDER.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-soft flex items-center justify-center text-xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-navy-darkest truncate">{item.name}</p>
                    <p className="text-xs text-neutral-silver">Qty {item.qty} · Size {item.size}</p>
                  </div>
                  <span className="text-xs font-bold text-navy-darkest">€{item.total.toFixed(2)}</span>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-4 mt-2 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-silver">Subtotal</span>
                  <span className="font-medium text-navy-darkest">€{ORDER.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-600">Bulk discount</span>
                  <span className="font-medium text-emerald-600">−€{ORDER.bulkDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-silver">Shipping</span>
                  <span className="font-medium text-navy-darkest">
                    €{(SHIPPING_OPTIONS.find(s => s.id === shipping)?.price ?? 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-display font-bold text-navy-darkest text-sm">Total</span>
                  <span className="font-display font-bold text-gold text-xl">€{ORDER.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="bg-white rounded-2xl p-4 shadow-card space-y-2.5">
              {[
                { icon: Shield,  text: 'SSL secured checkout' },
                { icon: Truck,   text: 'DHL tracked shipping' },
                { icon: Lock,    text: 'Your data is protected' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs text-neutral-silver">
                  <Icon size={13} className="text-navy flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}