import { og, ogSize } from '@/lib/og';
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'About SmartStitch';
export default function Image() { return og('About SmartStitch', 'A Karachi apparel manufacturer built for brands that order small and grow.'); }
