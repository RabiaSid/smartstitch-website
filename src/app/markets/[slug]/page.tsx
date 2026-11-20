import EdHero from '@/components/EdHero';
import { BreadcrumbJsonLd } from '@/components/Schema';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MARKETS, TIERS } from '@/data/content';
import LeadForm from '@/components/LeadForm';
import { Faq, FaqJsonLd } from '@/components/Shell';

export function generateStaticParams() { return MARKETS.map(m => ({ slug: m.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = MARKETS.find(x => x.slug === params.slug);
  if (!m) return {};
  return {
    title: `Custom apparel manufacturer for ${m.name} brands`,
    description: `${m.intro} ${m.transit}.`,
    alternates: { canonical: `/markets/${m.slug}` },
  };
}

export default function Market({ params }: { params: { slug: string } }) {
  const m = MARKETS.find(x => x.slug === params.slug);
  if (!m) notFound();
  return (
    <div className="ed-page">
      <FaqJsonLd items={m.faq} />
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Markets', '/markets/us'], [m.name, `/markets/${m.slug}`]]} />
      <EdHero small={`Custom apparel for ${m.name} brands`} word={m.short} lead={m.intro} img={{ src: `/images/${m.img}.webp`, alt: `Custom apparel for ${m.name}`, w: m.w, h: m.h }} box={{ label: `Get a ${m.short} quote`, href: '#quote' }}
        marquee={`${m.name.toUpperCase()} ✦ ${m.transit.toUpperCase()} ✦ 10-PIECE MINIMUM`}
        actions={<Link href="/fabric-guide" className="btn ghost">Fabric guide</Link>} />

      <section className="sec alt"><div className="wrap cards">
        <div className="card glow"><h3>Who we make for</h3><ul className="checks" style={{ marginTop: 14 }}>{m.buyers.map(b => <li key={b}>{b}</li>)}</ul></div>
        <div className="card glow"><h3>Fabrics we recommend</h3><ul className="checks" style={{ marginTop: 14 }}>{m.fabrics.map(b => <li key={b}>{b}</li>)}</ul></div>
        <div className="card glow"><h3>Shipping and customs</h3><ul className="checks" style={{ marginTop: 14 }}>{m.shipping.map(b => <li key={b}>{b}</li>)}</ul></div>
      </div></section>

      <section className="sec"><div className="wrap two">
        <div><h2>Pricing and delivery</h2><p className="lead">Priced in {m.currency}. {m.transit}, after 7–10 business days of production.</p></div>
        <div className="tbl"><table><thead><tr><th>Pieces per design</th><th>Discount</th></tr></thead>
          <tbody>{TIERS.map(t => <tr key={t.qty}><td>{t.qty}</td><td><span className="tag best">{t.off} off</span></td></tr>)}</tbody></table></div>
      </div></section>

      <section className="sec alt"><div className="wrap two"><div><h2>{m.short} buyer questions</h2></div><Faq items={m.faq} /></div></section>

      <section className="sec dark photo" id="quote" style={{ backgroundImage: 'url(/images/backdrop.webp)' }}><div className="wrap two">
        <div><h2>Request a quote for {m.name}</h2><p className="lead">We reply within 24 hours.</p></div>
        <LeadForm country={m.name} source={`market-${m.slug}`} />
      </div></section>
    </div>
  );
}
