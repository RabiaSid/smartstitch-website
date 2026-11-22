import type { Metadata } from 'next';
import Link from 'next/link';
import EdHero from '@/components/EdHero';
import { SITE } from '@/data/content';
import { BreadcrumbJsonLd } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Contact SmartStitch',
  description: 'Contact SmartStitch, a custom apparel manufacturer in Karachi. Email, WhatsApp or send a quote request.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <div className="ed-page">
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Contact', '/contact']]} />
      <EdHero small="We reply within 24 hours" word="Contact" lead="The fastest way to get pricing is a quote request." />
      <section className="sec"><div className="wrap">
        <div className="cards" style={{ marginTop: 28 }}>
          <div className="card glow"><h3>Get a quote</h3><p>Tell us the product, quantity and artwork.</p><p style={{ marginTop: 14 }}><Link href="/quote" className="btn">Request a quote</Link></p></div>
          {SITE.email && <div className="card glow"><h3>Email</h3><p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div>}
          {SITE.whatsapp && <div className="card glow"><h3>WhatsApp</h3><p><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat with us</a></p></div>}
          <div className="card glow"><h3>Where we are</h3><p>{SITE.city}. We ship worldwide by air and sea freight.</p></div>
        </div>
      </div></section>
    </div>
  );
}
