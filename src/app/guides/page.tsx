import EdHero from '@/components/EdHero';
import { BreadcrumbJsonLd } from '@/components/Schema';
import { CtaBand } from '@/components/Shell';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Custom apparel guides for buyers',
  description: 'Practical guides on ordering custom T-shirts, polos and hoodies in bulk: embroidery vs print, GSM, tech packs and shipping to the US, UAE and UK.',
  alternates: { canonical: '/guides' },
};

export default function Guides() {
  return (
    <div className="ed-page">
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Guides', '/guides']]} />
      <EdHero small="Custom apparel buyer" word="GUIDES" lead="Straight answers for brands, teams and businesses ordering custom apparel in bulk. Written by the team that makes it in Karachi." marquee="ORDERING ✦ EMBROIDERY ✦ GSM ✦ TECH PACKS ✦ SHIPPING" />
      <section className="sec"><div className="wrap">
        <div className="gd-list">
          {GUIDES.map((g, i) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="gd-item">
              <i>{String(i + 1).padStart(2, '0')}</i>
              <div><h2>{g.title}</h2><p>{g.desc}</p><span>{g.read} read</span></div>
            </Link>
          ))}
        </div>
      </div></section>
      <CtaBand title="Have an order in mind?" text="Tell us the product and quantity. We reply with a quote and a free digital proof." />
    </div>
  );
}
