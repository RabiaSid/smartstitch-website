// ─────────────────────────────────────────────
// SHARED TYPES & DATA — import everywhere
// ─────────────────────────────────────────────

export interface ProductReview {
  name:    string;
  country: string;
  rating:  number;
  text:    string;
  date:    string;
}

export interface ProductDetail {
  id:            string;
  name:          string;
  category:      string;
  fabric:        string;
  weight:        string;
  basePrice:     number;
  originalPrice: number | null;
  tag?:          string;
  rating:        number;
  reviews:       number;
  moq:           number;
  colors:        { name: string; hex: string }[];
  sizes:         string[];
  emoji:         string;
  description:   string;
  features:      string[];
  printOptions:  string[];
  inStock:       boolean;
  deliveryEU:    string;
  deliveryME:    string;
  reviews_list:  ProductReview[];
}

export const BULK_TIERS = [
  { min: 1,   max: 9,   discount: 0,  label: '1-9 pcs'  },
  { min: 10,  max: 49,  discount: 10, label: '10-49 pcs' },
  { min: 50,  max: 99,  discount: 20, label: '50-99 pcs' },
  { min: 100, max: 999, discount: 30, label: '100+ pcs'  },
];

export function getDiscount(qty: number) {
  return BULK_TIERS.find(t => qty >= t.min && qty <= t.max)?.discount ?? 0;
}

export const PRODUCTS: Record<string, ProductDetail> = {
  '1': {
    id: '1', name: 'Classic Essential Tee', category: 'Basic',
    fabric: '100% Cotton', weight: '180 GSM',
    basePrice: 8.50, originalPrice: 12,
    tag: 'Best Seller', rating: 4.9, reviews: 342, moq: 1,
    colors: [
      { name: 'White',    hex: '#FFFFFF' },
      { name: 'Black',    hex: '#111111' },
      { name: 'Navy',     hex: '#0A1F44' },
      { name: 'Grey',     hex: '#6B7280' },
      { name: 'Sky Blue', hex: '#5B8CFF' },
      { name: 'Red',      hex: '#C1121F' },
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    emoji: '👕',
    description: 'Our most popular tee — soft, breathable, and perfect for everyday wear and custom printing. Made from 100% ring-spun cotton for a premium feel that lasts wash after wash.',
    features: [
      'Ring-spun 100% cotton — ultra soft',
      'Pre-shrunk fabric — maintains shape',
      'Seamless double-needle collar',
      'Quarter-turned to eliminate center crease',
      'Taped neck and shoulders',
    ],
    printOptions: ['Screen Print', 'DTG Print', 'Embroidery', 'Sublimation'],
    inStock: true,
    deliveryEU: '5-7 business days',
    deliveryME: '7-10 business days',
    reviews_list: [
      { name: 'Marcus W.', country: '🇩🇪', rating: 5, text: 'Excellent quality, ordered 100 pieces for our company event. Very happy!', date: 'Apr 2026' },
      { name: 'Fatima R.', country: '🇦🇪', rating: 5, text: 'Fast delivery to Dubai. The print quality is outstanding.', date: 'Mar 2026' },
      { name: 'Sophie L.', country: '🇫🇷', rating: 4, text: 'Great fabric, true to size. Will order again.', date: 'Mar 2026' },
    ],
  },
  '2': {
    id: '2', name: 'Premium Pima Cotton', category: 'Premium',
    fabric: '100% Pima Cotton', weight: '200 GSM',
    basePrice: 14.00, originalPrice: 18,
    tag: 'Premium', rating: 4.8, reviews: 198, moq: 1,
    colors: [
      { name: 'Royal Blue', hex: '#1E5EFF' },
      { name: 'Gold',       hex: '#D4AF37' },
      { name: 'Forest',     hex: '#2D6A4F' },
      { name: 'Burgundy',   hex: '#6B1F2A' },
    ],
    sizes: ['S','M','L','XL','XXL','XXXL'],
    emoji: '👔',
    description: 'Luxury Pima cotton with an ultra-smooth finish. Ideal for high-end brand merchandise and premium corporate gifting.',
    features: [
      '100% Pima cotton — silky smooth',
      'Heavier 200 GSM weight',
      'Retail-quality finish',
      'Perfect for embroidery',
      'Shrink and fade resistant',
    ],
    printOptions: ['Embroidery', 'Screen Print', 'DTG Print'],
    inStock: true,
    deliveryEU: '5-7 business days',
    deliveryME: '7-10 business days',
    reviews_list: [
      { name: 'Ahmed K.', country: '🇸🇦', rating: 5, text: 'Premium quality as described. Perfect for our brand.', date: 'Apr 2026' },
      { name: 'Clara M.', country: '🇳🇱', rating: 5, text: 'Feels incredible, our clients loved it.', date: 'Mar 2026' },
    ],
  },
  '3': {
    id: '3', name: 'Sport Performance', category: 'Sport',
    fabric: 'Polyester Blend', weight: '160 GSM',
    basePrice: 11.00, originalPrice: null,
    tag: 'New', rating: 4.7, reviews: 87, moq: 10,
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Red',   hex: '#C1121F' },
      { name: 'Navy',  hex: '#0A1F44' },
      { name: 'Sky',   hex: '#5B8CFF' },
    ],
    sizes: ['XS','S','M','L','XL','XXL'],
    emoji: '🎽',
    description: 'Moisture-wicking performance fabric. Perfect for sports teams, gyms, and corporate wellness events.',
    features: [
      'Moisture-wicking polyester blend',
      'Lightweight 160 GSM',
      'UV protection UPF 30+',
      'Anti-odor treatment',
      'Quick-dry technology',
    ],
    printOptions: ['Sublimation', 'Screen Print'],
    inStock: true,
    deliveryEU: '5-7 business days',
    deliveryME: '7-10 business days',
    reviews_list: [
      { name: 'Lars B.', country: '🇸🇪', rating: 5, text: 'Our football team loves these. Great quality.', date: 'Apr 2026' },
    ],
  },
};