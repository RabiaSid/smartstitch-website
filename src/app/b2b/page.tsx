import { BreadcrumbJsonLd } from '@/components/Schema';
import type { Metadata } from 'next';
import Image from 'next/image';
import { TIERS, PROCESS, BRIEF_CHECKLIST, B2B_FAQ, FACTS } from '@/data/content';
import LeadForm from '@/components/LeadForm';
import { Faq, FaqJsonLd, Steps } from '@/components/Shell';

export const metadata: Metadata = {
  title: 'B2B wholesale custom apparel',
  description: 'Wholesale custom T-shirts, polos and hoodies. 10-piece minimum, volume discounts up to 30%, free digital proof and DHL Express to the US, UAE and UK.',
  alternates: { canonical: '/b2b' },
};

export default function B2B() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['Home','/'],['B2B wholesale','/b2b']]} />
      <FaqJsonLd items={B2B_FAQ} />
      <section className="hero"><div className="wrap grid">
        <div><h1>Wholesale custom apparel with a <span>10-piece minimum</span></h1>
          <p className="lead">Factory-direct pricing from Karachi, volume discounts that start at 10 pieces, and one invoice for mixed orders.</p>
          <div className="btns"><a href="#quote" className="btn">Get a quote</a><a href="#pricing" className="btn ghost">See discounts</a></div></div>
        <div className="photo"><Image src="/images/street-charcoal.webp" alt="Model in charcoal streetwear" width={800} height={1000} priority sizes="(max-width:900px) 100vw, 480px" /></div>
      </div></section>
      <div className="wrap"><div className="facts">{FACTS.map(f => <div key={f.k}><b>{f.k}</b><span>{f.v}</span></div>)}</div></div>

      <section className="sec" id="pricing"><div className="wrap">
        <div className="head"><h2>Volume discounts</h2><p className="lead">Discounts apply per design. You get the exact price in your quote.</p></div>
        <div className="tbl"><table><thead><tr><th>Pieces per design</th><th>Tier</th><th>Discount</th></tr></thead>
          <tbody>{TIERS.map(t => <tr key={t.qty}><td>{t.qty}</td><td>{t.name}</td><td><span className="tag best">{t.off} off</span></td></tr>)}</tbody></table></div>
      </div></section>

      <section className="sec alt"><div className="wrap two">
        <div><h2>How an order runs</h2><div style={{ marginTop: 20 }}><Steps items={PROCESS} /></div></div>
        <div><h2>What to send for an exact quote</h2><ul className="checks" style={{ marginTop: 20 }}>{BRIEF_CHECKLIST.map(c => <li key={c}>{c}</li>)}</ul>
          <h3 style={{ marginTop: 36 }}>Shipping and paperwork</h3>
          <p className="lead" style={{ fontSize: '1rem' }}>Every order ships by DHL Express with tracking, a commercial invoice, HS codes and country of origin.</p></div>
      </div></section>

      <section className="sec"><div className="wrap two"><div><h2>Questions buyers ask</h2></div><Faq items={B2B_FAQ} /></div></section>

      <section className="sec dark photo" id="quote" style={{ backgroundImage: 'url(/images/backdrop.webp)' }}><div className="wrap two">
        <div><h2>Request a B2B quote</h2><p className="lead">We reply within 24 hours.</p></div>
        <LeadForm source="b2b" />
      </div></section>
    </>
  );
}
