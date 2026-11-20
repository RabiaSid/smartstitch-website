import { SITE, MARKETS, TIERS, PRODUCTS, B2B_FAQ } from '@/data/content';
export const dynamic = 'force-static';
export function GET() {
  const t = [
    `# ${SITE.name}`, '',
    `> ${SITE.name} is a custom apparel manufacturer in ${SITE.city}. We make T-shirts, polos and hoodies for brands, teams and businesses in the US, UAE and UK, with a 10-piece minimum per design, volume discounts and a free digital proof.`, '',
    '## Key pages',
    `- [Home](${SITE.url}/): overview`,
    `- [B2B wholesale](${SITE.url}/b2b): minimums, volume discounts, process`,
    `- [Portfolio](${SITE.url}/portfolio): hoodies, sweatshirts and T-shirts we make`,
    `- [Hoodies](${SITE.url}/custom/hoodies), [T-shirts](${SITE.url}/custom/t-shirts), [Sweatshirts](${SITE.url}/custom/sweatshirts), [Polos](${SITE.url}/custom/polos)`,
    `- [Private label](${SITE.url}/private-label)`,
    `- [Fabric guide](${SITE.url}/fabric-guide): GSM, fabrics, care and market recommendations`,
    `- [About](${SITE.url}/about)`,
    `- [Get a quote](${SITE.url}/quote)`,
    ...MARKETS.map(m => `- [${m.name}](${SITE.url}/markets/${m.slug}): ${m.transit}`), '',
    '## Products', ...PRODUCTS.map(p => `- ${p.name}: ${p.note}`), '',
    '## Volume discounts', ...TIERS.map(x => `- ${x.qty} pieces: ${x.off} off`), '',
    '## FAQ', ...B2B_FAQ.map(([q, a]) => `- ${q} ${a}`), '',
  ].join('\n');
  return new Response(t, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
