import EdHero from '@/components/EdHero';
import { BreadcrumbJsonLd } from '@/components/Schema';
import { Faq, FaqJsonLd, CtaBand } from '@/components/Shell';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES } from '@/data/guides';
import { SITE } from '@/data/content';

export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map(g => ({ slug: g.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = GUIDES.find(x => x.slug === params.slug);
  if (!g) return {};
  return { title: g.title, description: g.desc, alternates: { canonical: `/guides/${g.slug}` }, openGraph: { type: 'article', title: g.title, description: g.desc } };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = GUIDES.find(x => x.slug === params.slug);
  if (!g) notFound();
  const others = GUIDES.filter(x => x.slug !== g.slug).slice(0, 3);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.desc,
    datePublished: g.date, dateModified: g.date, mainEntityOfPage: `${SITE.url}/guides/${g.slug}`,
    author: { '@type': 'Organization', name: 'SmartStitch' }, publisher: { '@type': 'Organization', name: 'SmartStitch' },
  };
  return (
    <div className="ed-page">
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Guides', '/guides'], [g.title, `/guides/${g.slug}`]]} />
      <FaqJsonLd items={g.faq} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <EdHero small={g.title} word={g.word} lead={g.lead} marquee={`${g.read} read ✦ SmartStitch guide ✦ Made in Karachi`} />
      <section className="sec"><div className="wrap"><article className="prose">
        {g.sections.map(s => (
          <div key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((t, i) => <p key={i}>{t}</p>)}
            {s.list && <ul>{s.list.map(t => <li key={t}>{t}</li>)}</ul>}
          </div>
        ))}
      </article></div></section>
      <section className="sec alt"><div className="wrap two"><div><h2>Quick answers</h2></div><Faq items={g.faq} /></div></section>
      <section className="sec"><div className="wrap">
        <h2>More guides</h2>
        <div className="gd-list" style={{ marginTop: 20 }}>
          {others.map(o => <Link key={o.slug} href={`/guides/${o.slug}`} className="gd-item"><i>→</i><div><h3>{o.title}</h3><span>{o.read} read</span></div></Link>)}
        </div>
      </div></section>
      <CtaBand title="Ready to order?" text="Tell us the product and quantity. We reply with a quote and a free digital proof." />
    </div>
  );
}
