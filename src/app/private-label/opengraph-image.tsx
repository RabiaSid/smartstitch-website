import { og, ogSize } from '@/lib/og';
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'SmartStitch private label';
export default function Image() { return og('Private label clothing manufacturer', 'Your labels, tags and packaging. From 10 pieces per design.', 'Private label'); }
