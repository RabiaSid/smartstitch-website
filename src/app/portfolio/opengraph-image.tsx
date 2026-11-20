import { og, ogSize } from '@/lib/og';
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'SmartStitch portfolio';
export default function Image() { return og('Hoodies, sweatshirts and tees', 'A lookbook of custom apparel made in Karachi. From 10 pieces.', 'Portfolio'); }
