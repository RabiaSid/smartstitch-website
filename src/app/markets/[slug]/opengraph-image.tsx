import { og, ogSize } from '@/lib/og';
import { MARKETS } from '@/data/content';
export function generateStaticParams() { return MARKETS.map(m => ({ slug: m.slug })); }
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'SmartStitch market page';
export default function Image({ params }: { params: { slug: string } }) {
  const m = MARKETS.find(x => x.slug === params.slug);
  return og(m ? `Custom apparel for ${m.name} brands` : 'SmartStitch', m ? `${m.transit}. 10-piece minimum.` : '', m ? `${m.short} market` : 'SmartStitch');
}
