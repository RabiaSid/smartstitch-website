import { og, ogSize } from '@/lib/og';
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Get a custom apparel quote';
export default function Image() { return og('Get a custom apparel quote', 'Tell us your quantity and design. We reply with pricing and a free proof.'); }
