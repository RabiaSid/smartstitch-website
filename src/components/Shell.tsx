import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/data/content';

export function Faq({ items }: { items: [string, string][] }) {
  return <div className="faq">{items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
}

export function FaqJsonLd({ items }: { items: [string, string][] }) {
  const j = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />;
}

export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        <Image src="/images/logo-white.webp" alt="" width={640} height={366} priority style={{ height: 96, width: 'auto' }} />
        <div className="bar"><i /></div>
      </div>
    </div>
  );
}

// Navy call-to-action band (from the old site's B2BCTA)
export function CtaBand({ title = 'Need 50+ pieces?', text = 'Get a B2B quote with volume pricing and a free digital proof before production.' }: { title?: string; text?: string }) {
  const second = SITE.whatsapp ? { href: `https://wa.me/${SITE.whatsapp}`, label: 'WhatsApp us' } : SITE.email ? { href: `mailto:${SITE.email}`, label: 'Email us' } : { href: '/b2b', label: 'See B2B pricing' };
  return (
    <section className="sec"><div className="wrap"><div className="cta-band">
      <div><h2>{title}</h2><p>{text}</p></div>
      <div className="btns" style={{ marginTop: 0 }}>
        <Link href="/quote" className="btn gold">Get B2B quote</Link>
        <a href={second.href} className="btn ghost">{second.label}</a>
      </div>
    </div></div></section>
  );
}

export function FeaturesStrip() {
  const I = (d: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
  const F = [
    [I('M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'), 'Air and sea freight', 'Shipped worldwide with DAP and FOB terms', '#60A5FA'],
    [I('M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z'), 'Free digital proof', 'Approve the design before we cut a single piece', '#D4AF37'],
    [I('M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z M9 12l2 2 4-4'), 'Quality checked', 'Every order inspected for stitching, print and size', '#34D399'],
    [I('M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z'), 'Quote in 24 hours', 'A clear price breakdown for your quantity', '#C4B5FD'],
  ] as const;
  return (
    <section className="feat"><div className="wrap feat-grid">
      {F.map(([ic, t, d, c]) => (
        <div key={t} className="feat-card glow"><span style={{ color: c }}>{ic}</span><div><b>{t}</b><p>{d}</p></div></div>
      ))}
    </div></section>
  );
}

export function Diptych() {
  const P = [
    { img: 'street-gold', w: 800, h: 1200, label: 'Essentials', text: '180 GSM ring-spun cotton tees and streetwear. The starting point for most brands.', cta: 'Quote essentials' },
    { img: 'polo-golf', w: 1200, h: 800, label: 'Premium', text: 'Pima cotton and piqué polos with embroidery. For retail lines and uniforms.', cta: 'Quote premium' },
  ];
  return (
    <section className="dip">{P.map(p => (
      <div key={p.label} className="dip-p">
        <Image src={`/images/${p.img}.webp`} alt={`${p.label} custom apparel`} width={p.w} height={p.h} sizes="(max-width:900px) 100vw, 50vw" />
        <div className="dip-cap"><h3>{p.label}</h3><p>{p.text}</p><Link href="/quote" className="pill">{p.cta}</Link></div>
      </div>
    ))}</section>
  );
}

const idx = (i: number) => ({ '--i': i } as React.CSSProperties);

export function Steps({ items }: { items: string[][] }) {
  return <ol className="steps">{items.map(([t, d], i) => <li key={t} style={idx(i)}><div><b>{t}</b><span>{d}</span></div></li>)}</ol>;
}

export function HlList({ items }: { items: string[][] }) {
  return <ul className={`hl-list n${items.length}`}>{items.map(([t, d], i) => <li key={t} style={idx(i)}><b>{t}</b><span>{d}</span></li>)}</ul>;
}

const GAL = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10'];
export function Gallery() {
  return (
    <section className="gal" aria-label="Sample colors and styles">
      <div className="wrap head"><h2>Every color, every kind of brand</h2><p className="lead">Tees, Pima, performance and streetwear, in the colors your customers ask for.</p></div>
      <div className="gal-track"><div>{[0, 1].map(k => GAL.map(g => (
        <Image key={`${k}-${g}`} src={`/images/${g}.webp`} alt="" width={360} height={520} sizes="200px" unoptimized aria-hidden={k === 1} />
      )))}</div></div>
    </section>
  );
}
