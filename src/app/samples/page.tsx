import type { Metadata } from 'next';
import Link from 'next/link';
import EdHero from '@/components/EdHero';
import LeadForm from '@/components/LeadForm';
import { Faq, FaqJsonLd } from '@/components/Shell';
import { BreadcrumbJsonLd } from '@/components/Schema';

const FAQ: [string, string][] = [
  ['Can I order a sample before a bulk order?', 'Yes. Tell us the product, fabric and decoration you want to test and we will confirm the sample price and timeline by email.'],
  ['Is the sample free?', 'We send a free digital proof for every order. Physical samples are quoted individually, and the cost can be credited against your bulk order. Confirm the terms with our team.'],
  ['How long does a sample take?', 'Our team will confirm the timeline for your product when they reply, usually within 24 hours.'],
  ['Can I use my own design?', 'Yes. Send your logo or artwork, or a reference garment, and we will match it as closely as possible.'],
];

export const metadata: Metadata = {
  title: 'Request a custom apparel sample',
  description: 'Check our fabric, fit and print quality before you place a bulk order. Request a custom hoodie, T-shirt, sweatshirt or polo sample from SmartStitch.',
  alternates: { canonical: '/samples' },
};

const STEPS: [string, string][] = [
  ['Tell us what to test', 'Product, fabric, size and the decoration method you are considering.'],
  ['We confirm and send a proof', 'Our team replies within 24 hours with the sample cost and lead time, then you approve a digital proof.'],
  ['Check it, then scale up', 'Review the fabric, fit and print in hand, then place your full order.'],
];

export default function Samples() {
  return (
    <div className="ed-page">
      <FaqJsonLd items={FAQ} />
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Samples', '/samples']]} />
      <EdHero small="Request a custom apparel" word="SAMPLE" lead="See the fabric, fit and print in your hands before you commit to a bulk order."
        marquee="FREE DIGITAL PROOF ✦ REAL FABRIC ✦ REAL PRINT ✦ THEN SCALE UP"
        actions={<Link href="/portfolio" className="btn ghost">See our work</Link>} />

      <section className="sec"><div className="wrap">
        <h2>How samples work</h2>
        <div className="ed-cols" style={{ marginTop: 24 }}>
          {STEPS.map(([t, d], i) => (
            <div className="ed-col" key={t}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div></section>

      <section className="sec"><div className="wrap two">
        <div><h2>Request your sample</h2><p className="lead">Share what you want to test. The more detail you give, the faster we can quote it.</p></div>
        <LeadForm source="sample-request" badge="Sample request" title="Tell us what to sample" cta="Request my sample"
          done="Thank you. Our team will email the sample details within 24 hours." />
      </div></section>

      <section className="sec alt"><div className="wrap two"><div><h2>Sample questions</h2></div><Faq items={FAQ} /></div></section>
    </div>
  );
}
