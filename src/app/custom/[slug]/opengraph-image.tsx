import { og, ogSize } from '@/lib/og';
import { PRODUCT_PAGES } from '@/data/content';
export function generateStaticParams() { return PRODUCT_PAGES.map(p => ({ slug: p.slug })); }
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'SmartStitch custom apparel';
export default function Image({ params }: { params: { slug: string } }) {
  const p = PRODUCT_PAGES.find(x => x.slug === params.slug);
  return og(p ? p.h1 : 'Custom apparel', '10-piece minimum. Free digital proof. Ships worldwide.', p ? p.name : 'SmartStitch');
}
