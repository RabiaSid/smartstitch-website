import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, PROCESS, MARKETS, HOME_FAQ } from '@/data/content';
import LeadForm from '@/components/LeadForm';
import LookTeaser from '@/components/LookTeaser';
import { FeaturesStrip, Diptych, Steps, Gallery, Faq, FaqJsonLd } from '@/components/Shell';
import { CountUp, Fx } from '@/components/Fx';

const WORDS = ['T-shirts', 'Polos', 'Hoodies', 'Streetwear', 'Performance wear', 'Long sleeves', 'Private label'];

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <>
      <FaqJsonLd items={HOME_FAQ} />
      <Fx />
      <section className="hero big"><div className="wrap grid">
        <div>
          <h1 className="rise">Your brand, <span>stitched in Karachi</span> and shipped worldwide</h1>
          <p className="lead rise d1">Order samples from one piece and bulk from 50 pieces per design. Hoodies, sweatshirts, T-shirts and more for distributors, brands and businesses in the US, UAE and UK, with a free digital proof before we cut.</p>
          <div className="btns rise d2"><Link href="/quote" className="btn">Get a quote</Link><Link href="/b2b" className="btn ghost">See B2B pricing</Link></div>
        </div>
        <div className="fan rise d1" aria-hidden="false">
          <div className="fp p1"><Image src="/images/tee-duo.webp" alt="Models wearing white custom T-shirts" width={1400} height={934} priority sizes="420px" /></div>
          <div className="fp p2"><Image src="/images/street-gold.webp" alt="Model in custom gold streetwear tee" width={800} height={1200} sizes="240px" /></div>
          <div className="fp p3"><Image src="/images/pima-blue.webp" alt="Blue Pima cotton tee" width={800} height={1200} sizes="240px" /></div>
          <div className="badge a"><b>50 pieces</b>minimum per design</div>
          <div className="badge b"><b>Free proof</b>before we cut</div>
        </div>
      </div></section>

      <div className="marq" aria-hidden="true"><div>{[0, 1].map(k => <span key={k}>{WORDS.map(t => <span key={t}>{t} <i>✦</i></span>)}</span>)}</div></div>

      <section className="stats"><div className="wrap">
        <div><b><CountUp to={50} /></b><span>pieces minimum per design</span></div>
        <div><b><CountUp to={1} /></b><span>piece minimum for samples</span></div>
        <div><b><CountUp to={24} suffix="h" /></b><span>quote turnaround</span></div>
        <div><b><CountUp to={3} /></b><span>markets: US, UAE, UK</span></div>
      </div></section>

      <FeaturesStrip />

      <section className="sec"><div className="wrap">
        <div className="head"><h2>What we make</h2><p className="lead">Six core lines. Each comes in custom colors, sizes and decoration.</p></div>
        <div className="bento">
          {PRODUCTS.map((p, i) => (
            <Link href="/quote" key={p.name} className={`tile${p.wide ? ' wide' : ''}${i === 1 ? ' tall' : ''}`}>
              <Image src={`/images/${p.img}.webp`} alt={p.name} width={p.w} height={p.h} sizes="(max-width:900px) 50vw, 25vw" />
              <div className="cap"><b>{p.name}</b><span>{p.note}</span></div>
            </Link>
          ))}
        </div>
      </div></section>

      <section className="banner" style={{ backgroundImage: 'url(/images/polo-golf.webp)' }}>
        <div className="wrap"><h2>Premium fabric.<br />Your logo. Delivered on time.</h2>
          <p className="lead">Embroidery on piqué polos, screen print on 180 GSM cotton, sublimation on performance blends. We match the method to the fabric.</p>
          <div className="btns"><Link href="/fabric-guide" className="btn">Explore fabrics</Link></div></div>
      </section>

      <Diptych />

      <Gallery />

      <LookTeaser />

      <section className="sec alt"><div className="wrap flow">
        <div className="flow-pic"><Image src="/images/vneck.webp" alt="Model wearing a black V-neck tee" width={800} height={1200} sizes="(max-width:900px) 100vw, 420px" />
          <div className="badge a"><b>Free proof</b>approve before we cut</div></div>
        <div><div className="head"><h2>From brief to delivery in five steps</h2><p className="lead">You see the design before production starts and you know the price before you commit.</p></div>
          <Steps items={PROCESS} /></div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="head"><h2>Ship to your market</h2><p className="lead">Each market has its own fabric picks, transit times and customs notes.</p></div>
        <div className="mkts">{MARKETS.map(m => (
          <Link key={m.slug} href={`/markets/${m.slug}`} className="mk">
            <Image src={`/images/${m.img}.webp`} alt="" width={m.w} height={m.h} sizes="(max-width:900px) 100vw, 380px" />
            <div className="mk-cap"><b>{m.name}</b><span>{m.transit}</span><em>View market page</em></div>
          </Link>
        ))}</div>
      </div></section>

      <section className="sec"><div className="wrap two"><div><h2>Quick answers</h2></div><Faq items={HOME_FAQ} /></div></section>

      <section className="sec dark photo" id="quote" style={{ backgroundImage: 'url(/images/backdrop.webp)' }}><div className="wrap two">
        <div><h2>Tell us what you need</h2><p className="lead">Share quantity, product and destination. Artwork can follow by email. We reply with a quote within 24 hours.</p>
          <ul className="checks inv" style={{ marginTop: 24 }}><li>No obligation to ask for a quote</li><li>Bulk from 50 pieces, samples from one</li><li>Free digital proof before production</li></ul></div>
        <LeadForm source="home" />
      </div></section>
    </>
  );
}
