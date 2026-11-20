import EdHero from '@/components/EdHero';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/Schema';
import Link from 'next/link';
import { CtaBand } from '@/components/Shell';

export const metadata: Metadata = { title: 'About', description: 'SmartStitch is a Karachi-based custom apparel manufacturer serving brands and businesses in the US, UAE and UK.', alternates: { canonical: '/about' } };

export default function About() {
  return (
    <div className="ed-page">
      <BreadcrumbJsonLd trail={[['Home','/'],['About','/about']]} />
      <EdHero small="A manufacturer that explains what it makes" word="About" lead="SmartStitch is a Karachi-based apparel manufacturer. We produce custom T-shirts, polos and hoodies for brands and businesses that want a small first order, honest fabric advice and a clear price."
        img={{ src: '/images/hero-store.webp', alt: 'Apparel on rails in a clothing store', w: 1800, h: 1202 }} box={{ label: 'Our promise', href: '#details' }} marquee="KARACHI ✦ MADE FOR EXPORT ✦ LOW MINIMUMS ✦ FABRIC TRANSPARENCY" />
      <section className="sec" id="details"><div className="wrap ed-cols">
        <div className="ed-col"><i>01</i><h3>Low minimums</h3><p>Ten pieces per design, so you can test a product before you commit to a large run.</p></div>
        <div className="ed-col"><i>02</i><h3>Fabric transparency</h3><p>We publish GSM, composition, print compatibility and care for every fabric, so you choose with facts.</p></div>
        <div className="ed-col"><i>03</i><h3>Built for export</h3><p>Commercial invoices, HS codes and DHL Express tracking come with every order to the US, UAE and UK.</p></div>
      </div></section>
      <CtaBand title="Start with a small order" text="Send a brief and we will quote it within 24 hours." />
    </div>
  );
}
