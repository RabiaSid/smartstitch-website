import EdHero from '@/components/EdHero';
import { BreadcrumbJsonLd } from '@/components/Schema';
import type { Metadata } from 'next';
import Image from 'next/image';
import { TIERS, PROCESS, BRIEF_CHECKLIST, B2B_FAQ, FACTS } from '@/data/content';
import LeadForm from '@/components/LeadForm';
import { Faq, FaqJsonLd, Steps } from '@/components/Shell';

export const metadata: Metadata = {
  title: 'B2B wholesale custom apparel',
  description: 'Wholesale custom T-shirts, polos and hoodies. 50-piece minimum, volume pricing, free digital proof and air and sea freight to the US, UAE and UK.',
  alternates: { canonical: '/b2b' },
};

export default function B2B() {
  return (
    <div className="ed-page">
      <BreadcrumbJsonLd trail={[['Home','/'],['B2B wholesale','/b2b']]} />
      <FaqJsonLd items={B2B_FAQ} />
      <EdHero small="Wholesale custom apparel, 50-piece minimum" word="Wholesale" lead="Factory-direct pricing from Karachi, per-piece pricing that improves with quantity, and one invoice for mixed orders."
        img={{ src: '/images/street-charcoal.webp', alt: 'Model in charcoal streetwear', w: 800, h: 1000 }} box={{ label: 'Get a quote', href: '#quote' }} marquee="WHOLESALE ✦ VOLUME PRICING ✦ AIR AND SEA FREIGHT ✦ FREE PROOF"
        actions={<a href="#pricing" className="btn ghost">See volume pricing</a>} />
      <div className="wrap"><div className="facts">{FACTS.map(f => <div key={f.k}><b>{f.k}</b><span>{f.v}</span></div>)}</div></div>

      <section className="sec" id="pricing"><div className="wrap">
        <div className="head"><h2>Volume pricing</h2><p className="lead">The per-piece price falls as the quantity per design grows. Your exact price is agreed once your order is confirmed.</p></div>
        <div className="tbl"><table><thead><tr><th>Pieces per design</th><th>Tier</th><th>Per-piece pricing</th></tr></thead>
          <tbody>{TIERS.map(t => <tr key={t.qty}><td>{t.qty}</td><td>{t.name}</td><td><span className="tag best">{t.off}</span></td></tr>)}</tbody></table></div>
      </div></section>

      <section className="sec alt"><div className="wrap two">
        <div><h2>How an order runs</h2><div style={{ marginTop: 20 }}><Steps items={PROCESS} /></div></div>
        <div><h2>What to send for an exact quote</h2><ul className="checks" style={{ marginTop: 20 }}>{BRIEF_CHECKLIST.map(c => <li key={c}>{c}</li>)}</ul>
          <h3 style={{ marginTop: 36 }}>Shipping and paperwork</h3>
          <p className="lead" style={{ fontSize: '1rem' }}>Orders ship by air or sea freight with a commercial invoice. We work on DAP and FOB terms.</p></div>
      </div></section>

      <section className="sec"><div className="wrap two"><div><h2>Questions buyers ask</h2></div><Faq items={B2B_FAQ} /></div></section>

      <section className="sec dark photo" id="quote" style={{ backgroundImage: 'url(/images/backdrop.webp)' }}><div className="wrap two">
        <div><h2>Request a B2B quote</h2><p className="lead">We reply within 24 hours.</p></div>
        <LeadForm source="b2b" />
      </div></section>
    </div>
  );
}
