import { SITE, PRODUCTS, MARKETS } from '@/data/content';

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function SiteJsonLd() {
  const sameAs = [SITE.instagram, SITE.facebook, SITE.threads, SITE.linkedin, SITE.x].filter(Boolean);
  const org = {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE.url}/#org`,
    name: SITE.name, url: SITE.url, logo: `${SITE.url}/images/logo.webp`,
    description: 'Custom apparel manufacturer in Karachi, Pakistan, making T-shirts, polos and hoodies for brands in the US, UAE and UK.',
    address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' },
    areaServed: MARKETS.map(m => m.name),
    ...(SITE.email ? { email: SITE.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
  const site = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { '@id': `${SITE.url}/#org` } };
  const service = {
    '@context': 'https://schema.org', '@type': 'Service', name: 'Custom apparel manufacturing',
    serviceType: 'Private-label and custom-printed apparel manufacturing',
    provider: { '@id': `${SITE.url}/#org` }, areaServed: MARKETS.map(m => m.name),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Custom apparel', itemListElement: PRODUCTS.map(p => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: p.name, description: p.note } })) },
  };
  return <><JsonLd data={org} /><JsonLd data={site} /><JsonLd data={service} /></>;
}

export function BreadcrumbJsonLd({ trail }: { trail: [string, string][] }) {
  return <JsonLd data={{
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE.url}${path}` })),
  }} />;
}
