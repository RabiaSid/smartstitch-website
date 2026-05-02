export interface User {
  id: string; name: string; email: string; phone?: string;
  country: string; customerType: 'retail' | 'wholesale' | 'b2b';
  loyaltyPoints: number; isVIP: boolean; createdAt: string;
}
export interface Product {
  id: string; name: string; description: string;
  basePrice: number; currency: string; category: string; fabric: string;
  sizes: Size[]; colors: ColorOption[]; images: string[];
  inStock: boolean; stockCount: number; rating: number;
  reviewCount: number; isFeatured: boolean; tags: string[];
}
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export interface ColorOption { name: string; hex: string; available: boolean; }
export interface Customization {
  productId: string; color: string; colorHex: string; size: Size; quantity: number;
  printType: 'none' | 'front' | 'back' | 'both';
  designUrl?: string; designPosition?: { x: number; y: number; scale: number };
  customText?: string; textFont?: string; textColor?: string; embroidery?: boolean;
}
export interface PriceBreakdown {
  basePrice: number; printCost: number; embroideryCost: number;
  subtotal: number; bulkDiscount: number; discountPercent: number;
  shippingCost: number; total: number; currency: string; currencySymbol: string;
}
export interface CartItem {
  id: string; product: Product; customization: Customization;
  pricing: PriceBreakdown; previewImageUrl?: string;
}
export interface Cart {
  items: CartItem[]; totalItems: number; subtotal: number;
  shipping: number; discount: number; total: number; currency: string;
}
export type OrderStatus = 'pending'|'confirmed'|'processing'|'printing'|'quality_check'|'packed'|'shipped'|'delivered'|'cancelled'|'refunded';
export interface Order {
  id: string; customerId: string; items: CartItem[];
  status: OrderStatus; shippingAddress: Address;
  paymentMethod: PaymentMethod; paymentStatus: 'pending'|'paid'|'failed'|'refunded';
  total: number; currency: string; trackingNumber?: string;
  carrier?: 'DHL'|'FedEx'; estimatedDelivery?: string;
  notes?: string; createdAt: string; updatedAt: string;
}
export interface Address {
  fullName: string; company?: string; street1: string; street2?: string;
  city: string; state?: string; postalCode: string;
  country: string; phone: string; isDefault?: boolean;
}
export type PaymentMethod = 'stripe_card'|'stripe_apple_pay'|'stripe_google_pay'|'stripe_sepa'|'tabby_bnpl'|'hyperpay'|'wire_transfer';
export interface ShippingRate {
  carrier: 'DHL'|'FedEx'; service: string; price: number;
  currency: string; estimatedDays: number; estimatedDelivery: string;
}
export type Market = 'EU' | 'ME' | 'OTHER';
export interface ApiResponse<T> { success: boolean; data: T; message?: string; errors?: Record<string, string>; }
