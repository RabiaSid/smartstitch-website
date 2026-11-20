import { og, ogSize } from '@/lib/og';
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Contact SmartStitch';
export default function Image() { return og('Contact SmartStitch', 'Quote requests answered within 24 hours.', 'Contact'); }
