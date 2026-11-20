import type { MetadataRoute } from 'next';
import { MARKETS, SITE } from '@/data/content';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/b2b', '/portfolio', '/quote', '/fabric-guide', '/privacy', ...MARKETS.map(m => `/markets/${m.slug}`)];
  return pages.map(p => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
