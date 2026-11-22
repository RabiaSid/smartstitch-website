import type { MetadataRoute } from 'next';
import { MARKETS, SITE } from '@/data/content';
import { GUIDES } from '@/data/guides';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/b2b', '/portfolio', '/quote', '/fabric-guide', '/privacy', '/contact', '/private-label', '/samples', '/production', '/guides', ...GUIDES.map(g => `/guides/${g.slug}`), '/custom/hoodies', '/custom/t-shirts', '/custom/sweatshirts', '/custom/polos', ...MARKETS.map(m => `/markets/${m.slug}`)];
  return pages.map(p => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
