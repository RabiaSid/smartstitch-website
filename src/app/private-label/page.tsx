import EdHero from '@/components/EdHero';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PROCESS, TIERS } from '@/data/content';
import LeadForm from '@/components/LeadForm';
import { Faq, FaqJsonLd } from '@/components/Shell';
import { BreadcrumbJsonLd } from '@/components/Schema';

const FAQ: [string, string][] = [
  ['What is private label clothing?', 'Garments made by us and sold under your brand name, with your labels, tags and packaging.'],
  ['What is the minimum order for private label?', 'Ten pieces per design, with volume discounts at 50, 100 and 500 pieces.'],
  ['Can I use my own design and fit?', 'Yes. Send a sketch, tech pack or reference garment and we will quote and propose a sample.'],
  ['What branding can you add?', 'Woven neck labels, printed labels, hang tags and custom packaging, in the same order as your garments.'],
  ['Will I see a sample before bulk production?', 'Yes. A free digital proof is sent for approval before we cut.'],
];

export const metadata: Metadata = {
  title: 'Private label clothing manufacturer, 10-piece minimum',
  description: 'Launch your own apparel brand. Custom labels, hang tags and packaging on hoodies, T-shirts and sweatshirts, from 10 pieces per design.',
  alternates: { canonical: '/private-label' },
};

export default function PrivateLabel() {
  return (
    <div className="ed-page">
      <FaqJsonLd items={FAQ} />
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Private label', '/private-label']]} />
      <EdHero small="Private label clothing manufacturer" word="Private label" lead="Launch your own brand without a large first order. We cut, sew, label and pack hoodies, T-shirts, sweatshirts and polos under your name, from 10 pieces per design."
        img={{ src: '/images/street-gold.webp', alt: 'Private label streetwear made by SmartStitch', w: 800, h: 1200 }} box={{ label: 'Start your brand', href: '#quote' }}
        marquee="PRIVATE LABEL ✦ YOUR LABELS ✦ YOUR TAGS ✦ YOUR PACKAGING"
        actions={<Link href="/portfolio" className="btn ghost">See our work</Link>} />

      <section className="sec alt"><div className="wrap cards">
        <div className="card glow"><h3>Your labels</h3><p>Woven or printed neck labels and care labels with your brand name.</p></div>
        <div className="card glow"><h3>Your tags and packaging</h3><p>Hang tags and custom packaging, packed to your spec for retail or shipping.</p></div>
        <div className="card glow"><h3>Your fit and fabric</h3><p>Pick from our fabrics or share your own fit block. We advise on GSM and print compatibility.</p></div>
      </div></section>

      <section className="sec"><div className="wrap two">
        <div><h2>How it works</h2><p className="lead">From brief to delivery in five steps.</p></div>
        <ol className="checks">{PROCESS.map(([t, d]) => <li key={t}><b>{t}.</b> {d}</li>)}</ol>
      </div></section>

      <section className="sec alt"><div className="wrap two">
        <div><h2>Volume pricing</h2><p className="lead">Discounts apply per design.</p></div>
        <div className="tbl"><table><thead><tr><th>Pieces per design</th><th>Discount</th></tr></thead>
          <tbody>{TIERS.map(t => <tr key={t.qty}><td>{t.qty}</td><td><span className="tag best">{t.off} off</span></td></tr>)}</tbody></table></div>
      </div></section>

      <section className="sec"><div className="wrap two"><div><h2>Private label questions</h2></div><Faq items={FAQ} /></div></section>

      <section className="sec dark photo" id="quote" style={{ backgroundImage: 'url(/images/backdrop.webp)' }}><div className="wrap two">
        <div><h2>Tell us about your brand</h2><p className="lead">We reply within 24 hours.</p></div>
        <LeadForm source="private-label" />
      </div></section>
    </div>
  );
}
