// ─────────────────────────────────────────────
// CUSTOMIZER — Shared Types, Constants & Utils
// ─────────────────────────────────────────────

import { Palette, Upload, Type, Ruler, ShoppingBag } from 'lucide-react';

export const SHIRT_COLORS = [
  { name: 'White',        hex: '#FFFFFF' },
  { name: 'Black',        hex: '#111111' },
  { name: 'Navy',         hex: '#0A1F44' },
  { name: 'Royal Blue',   hex: '#1E5EFF' },
  { name: 'Sky Blue',     hex: '#5B8CFF' },
  { name: 'Forest Green', hex: '#2D6A4F' },
  { name: 'Red',          hex: '#C1121F' },
  { name: 'Burgundy',     hex: '#6B1F2A' },
  { name: 'Grey',         hex: '#6B7280' },
  { name: 'Charcoal',     hex: '#374151' },
  { name: 'Gold',         hex: '#D4AF37' },
  { name: 'Beige',        hex: '#D4B896' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const PRINT_TYPES = [
  { id: 'none',  label: 'No Print',     price: 0, icon: '⬜' },
  { id: 'front', label: 'Front Only',   price: 5, icon: '👕' },
  { id: 'back',  label: 'Back Only',    price: 5, icon: '🔙' },
  { id: 'both',  label: 'Front + Back', price: 8, icon: '✌️' },
];

export const FONTS = ['DM Sans', 'Playfair Display', 'Georgia', 'Arial', 'Courier New', 'Impact'];

export const STEPS = [
  { id: 1, label: 'Color',  icon: Palette     },
  { id: 2, label: 'Design', icon: Upload      },
  { id: 3, label: 'Text',   icon: Type        },
  { id: 4, label: 'Size',   icon: Ruler       },
  { id: 5, label: 'Order',  icon: ShoppingBag },
];

export const BASE_PRICE = 8.50;

export interface Pricing {
  printCost:      number;
  embroideryCost: number;
  subtotal:       number;
  discountPct:    number;
  discount:       number;
  shipping:       number;
  total:          number;
}

export function calcPrice(basePrice: number, qty: number, printType: string, embroidery: boolean): Pricing {
  const printCosts: Record<string, number> = { none: 0, front: 5, back: 5, both: 8 };
  const printCost      = printCosts[printType] * qty;
  const embroideryCost = embroidery ? 4 * qty : 0;
  const subtotal       = (basePrice * qty) + printCost + embroideryCost;
  const discountPct    = qty >= 100 ? 30 : qty >= 50 ? 20 : qty >= 10 ? 10 : 0;
  const discount       = (subtotal * discountPct) / 100;
  const shipping       = subtotal - discount > 200 ? 0 : 18;
  const total          = subtotal - discount + shipping;
  return { printCost, embroideryCost, subtotal, discountPct, discount, shipping, total };
}

export interface CustomizerState {
  step:       number;
  color:      string;
  colorName:  string;
  printType:  string;
  designFile: File | null;
  embroidery: boolean;
  customText: string;
  textColor:  string;
  textFont:   string;
  size:       string;
  quantity:   number;
  rotating:   boolean;
}