import type { Metadata } from 'next';
import { SITE } from '@/data/content';
import EdHero from '@/components/EdHero';
import { BreadcrumbJsonLd } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How SmartStitch collects, uses and protects the information you send us.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Privacy Policy', '/privacy']]} />
      <div className="ed-page">
      <EdHero small="Privacy Policy" word="PRIVACY" lead="How SmartStitch collects, uses and protects the information you send us." />
      <section className="sec"><div className="wrap legal" style={{ maxWidth: 780 }}>
        <p>Last updated: November 2026. This page explains what {SITE.name} ({SITE.url.replace('https://', '')}) does with the information you share with us.</p>

        <h2>What we collect</h2>
        <ul>
          <li>Details you enter in our quote form: company name, your name, email, phone or WhatsApp number, order quantity, product type, delivery country and design notes.</li>
          <li>Basic technical data such as IP address and browser type, used to prevent spam and abuse.</li>
          <li>Anonymous usage data from analytics tools, if enabled (for example Google Analytics, Meta Pixel and Microsoft Clarity), which may use cookies.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To reply to your quote request and discuss your order.</li>
          <li>To improve the website and our service.</li>
          <li>To protect the site from spam and misuse.</li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2>Where it is stored</h2>
        <p>Quote requests are stored in a secured cloud database and sent to our team by email. We keep them for as long as needed to handle your enquiry and our business records.</p>

        <h2>Sharing</h2>
        <p>We share data only with service providers that help us run the site and communicate with you (hosting, database, email, analytics), or when the law requires it.</p>

        <h2>Your choices</h2>
        <p>You can ask us to access, correct or delete your information at any time. You can also block cookies in your browser settings.</p>

        <h2>Contact</h2>
        <p>{SITE.email ? <>Email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</> : <>Use the quote form on this site to reach us.</>} We are based in {SITE.city}.</p>
      </div></section>
      </div>
    </>
  );
}
