import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/Schema';
import Link from 'next/link';
import Image from 'next/image';
import { CtaBand } from '@/components/Shell';

export const metadata: Metadata = { title: 'About', description: 'SmartStitch is a Karachi-based custom apparel manufacturer serving brands and businesses in the US, UAE and UK.', alternates: { canonical: '/about' } };

export default function About() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['Home','/'],['About','/about']]} />
      <section className="hero"><div className="wrap grid">
        <div><h1>A manufacturer that explains what it makes</h1>
          <p className="lead">SmartStitch is a Karachi-based apparel manufacturer. We produce custom T-shirts, polos and hoodies for brands and businesses that want a small first order, honest fabric advice and a clear price.</p></div>
        <div className="photo"><Image src="/images/hero-store.webp" alt="Apparel on rails in a clothing store" width={1800} height={1202} priority sizes="(max-width:900px) 100vw, 560px" /></div>
      </div></section>
      <section className="sec"><div className="wrap ed-cols">
        <div className="ed-col"><i>01</i><h3>Low minimums</h3><p>Ten pieces per design, so you can test a product before you commit to a large run.</p></div>
        <div className="ed-col"><i>02</i><h3>Fabric transparency</h3><p>We publish GSM, composition, print compatibility and care for every fabric, so you choose with facts.</p></div>
        <div className="ed-col"><i>03</i><h3>Built for export</h3><p>Commercial invoices, HS codes and DHL Express tracking come with every order to the US, UAE and UK.</p></div>
      </div></section>
      <CtaBand title="Start with a small order" text="Send a brief and we will quote it within 24 hours." />
    </>
  );
}
