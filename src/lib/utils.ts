import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PriceBreakdown, Customization } from '@/types';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function calculatePrice(customization: Customization, basePrice: number): PriceBreakdown {
  const { quantity, printType, embroidery } = customization;
  const printCosts = { none: 0, front: 5, back: 5, both: 8 };
  const printCost      = printCosts[printType] * quantity;
  const embroideryCost = embroidery ? 4 * quantity : 0;
  const subtotal       = (basePrice * quantity) + printCost + embroideryCost;
  let discountPercent  = quantity >= 100 ? 30 : quantity >= 50 ? 20 : quantity >= 10 ? 10 : 0;
  const bulkDiscount   = (subtotal * discountPercent) / 100;
  const shippingCost   = subtotal > 200 ? 0 : 18;
  return { basePrice: basePrice * quantity, printCost, embroideryCost, subtotal, bulkDiscount, discountPercent, shippingCost, total: subtotal - bulkDiscount + shippingCost, currency: 'EUR', currencySymbol: '€' };
}

export function formatPrice(amount: number, symbol = '€'): string {
  return `${symbol}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function generateCartId(productId: string, customization: Customization): string {
  const key = `${productId}-${customization.color}-${customization.size}-${customization.printType}`;
  return btoa(key).replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
}

export function detectMarket(country: string): 'EU' | 'ME' | 'OTHER' {
  const EU = ['DE','FR','GB','NL','IT','ES','BE','AT','CH','SE','NO','DK','PL'];
  const ME = ['AE','SA','KW','QA','BH','OM','JO','EG'];
  if (EU.includes(country)) return 'EU';
  if (ME.includes(country)) return 'ME';
  return 'OTHER';
}
