import { og, ogSize } from '@/lib/og';
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Custom apparel made for US brands';
export default function Image() { return og('Custom apparel made for US brands', 'T-shirts, polos and hoodies from 10 pieces. Free digital proof.'); }
