import EdHero from '@/components/EdHero';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PRODUCT_PAGES, LOOKS, TIERS, SITE } from '@/data/content';
import LeadForm from '@/components/LeadForm';
import { Faq, FaqJsonLd } from '@/components/Shell';
import { BreadcrumbJsonLd, JsonLd } from '@/components/Schema';

export const dynamicParams = false;
export function generateStaticParams() { return PRODUCT_PAGES.map(p => ({ slug: p.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PRODUCT_PAGES.find(x => x.slug === params.slug);
  if (!p) return {};
  return { title: p.title, description: p.intro, alternates: { canonical: `/custom/${p.slug}` } };
}

export default function ProductPageView({ params }: { params: { slug: string } }) {
  const p = PRODUCT_PAGES.find(x => x.slug === params.slug);
  if (!p) notFound();
  const looks = p.looks ? LOOKS.filter(l => l.cat === p.looks).slice(0, 3) : [];
  const others = PRODUCT_PAGES.filter(x => x.slug !== p.slug);
  return (
    <div className="ed-page">
      <FaqJsonLd items={p.faq} />
      <BreadcrumbJsonLd trail={[['Home', '/'], [p.name, `/custom/${p.slug}`]]} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: p.h1, serviceType: `Custom ${p.name.toLowerCase()} manufacturing`, provider: { '@id': `${SITE.url}/#org` }, description: p.intro, url: `${SITE.url}/custom/${p.slug}` }} />

      <EdHero small={p.h1} word={p.word} lead={p.intro} img={{ src: `/images/${p.img}.webp`, alt: `Custom ${p.name.toLowerCase()} by SmartStitch`, w: p.w, h: p.h }} box={{ label: `Get a ${p.name.toLowerCase()} quote`, href: '#quote' }}
        marquee={`CUSTOM ${p.name.toUpperCase()} ✦ 50-PIECE MINIMUM ✦ FREE DIGITAL PROOF`}
        actions={<><Link href="/portfolio" className="btn ghost">See portfolio</Link></>} />

      <section className="sec" id="details"><div className="wrap ed-cols">
        <div className="ed-col"><i>01</i><h3>Fabric options</h3><ul>{p.fabrics.map(x => <li key={x}>{x}</li>)}</ul></div>
        <div className="ed-col"><i>02</i><h3>Fits</h3><ul>{p.fits.map(x => <li key={x}>{x}</li>)}</ul></div>
        <div className="ed-col"><i>03</i><h3>Decoration and labels</h3><ul>{p.deco.map(x => <li key={x}>{x}</li>)}</ul></div>
      </div></section>

      {looks.length > 0 && (
        <section className="sec"><div className="wrap">
          <div className="head"><h2>Recent {p.name.toLowerCase()} we have made</h2></div>
          <div className="cards">{looks.map(l => (
            <Link key={l.id} href="/portfolio" className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <Image src={`/images/${l.img}.webp`} alt={`${l.name} by SmartStitch`} width={l.w} height={l.h} sizes="(max-width:900px) 50vw, 260px" style={{ width: '100%', height: 'auto', aspectRatio: '3 / 4', objectFit: 'cover' }} />
            </Link>))}</div>
        </div></section>
      )}

      <section className="sec alt"><div className="wrap two">
        <div><h2>Volume pricing</h2><p className="lead">The per-piece price falls as the quantity per design grows. Your exact price is agreed once your order is confirmed.</p></div>
        <div className="tbl"><table><thead><tr><th>Pieces per design</th><th>Per-piece pricing</th></tr></thead>
          <tbody>{TIERS.map(t => <tr key={t.qty}><td>{t.qty}</td><td><span className="tag best">{t.off}</span></td></tr>)}</tbody></table></div>
      </div></section>

      <section className="sec"><div className="wrap two"><div><h2>{p.name} questions</h2></div><Faq items={p.faq} /></div></section>

      <section className="sec"><div className="wrap">
        <p className="lead">Also see: {others.map((o, i) => <span key={o.slug}>{i > 0 && ', '}<Link href={`/custom/${o.slug}`}>{o.name.toLowerCase()}</Link></span>)}, <Link href="/private-label">private label</Link>.</p>
      </div></section>

      <section className="sec dark photo" id="quote" style={{ backgroundImage: 'url(/images/backdrop.webp)' }}><div className="wrap two">
        <div><h2>Request a {p.name.toLowerCase()} quote</h2><p className="lead">We reply within 24 hours.</p></div>
        <LeadForm product={p.form} source={`product-${p.slug}`} />
      </div></section>
    </div>
  );
}
