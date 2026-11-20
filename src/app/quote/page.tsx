import { BreadcrumbJsonLd } from '@/components/Schema';
import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { BRIEF_CHECKLIST } from '@/data/content';

export const metadata: Metadata = { title: 'Request a quote', description: 'Send your brief and get a custom apparel quote within 24 hours. Minimum 10 pieces per design.', alternates: { canonical: '/quote' } };

export default function Quote() {
  return (
    <>
    <BreadcrumbJsonLd trail={[['Home','/'],['Get a quote','/quote']]} />
    <section className="sec"><div className="wrap two">
      <div>
        <h1>Request a quote</h1>
        <p className="lead">A detailed brief gets you a faster, more accurate price. Include as much of this as you have:</p>
        <ul className="checks" style={{ marginTop: 22 }}>{BRIEF_CHECKLIST.map(c => <li key={c}>{c}</li>)}</ul>
      </div>
      <LeadForm source="quote-page" />
    </div></section>
    </>
  );
}
