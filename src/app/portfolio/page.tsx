import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LOOKS, MAKE_LIST } from '@/data/content';
import { CtaBand } from '@/components/Shell';
import { BreadcrumbJsonLd } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Portfolio: hoodies, sweatshirts and tees',
  description: 'A look at custom hoodies, sweatshirts and T-shirts we make for streetwear and private-label brands. 50-piece minimum, free digital proof.',
  alternates: { canonical: '/portfolio' },
};

const FILTERS = [['all', 'All'], ['hoodies', 'Hoodies'], ['sweatshirts', 'Sweatshirts'], ['tees', 'T-shirts']] as const;
const count = (c: string) => (c === 'all' ? LOOKS.length : LOOKS.filter(l => l.cat === c).length);

export default function Portfolio() {
  return (
    <div className="pf">
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Portfolio', '/portfolio']]} />

      <section className="pf-hero">
        <div className="wrap">
          <p className="pf-kicker"><span>Lookbook</span><span>Made in Karachi</span><span>Vol. 01</span></p>
          <h1 className="pf-title" aria-label="Hoodies, sweatshirts and tees">
            <span>Hoodies</span><span className="o">Sweatshirts</span><span>&amp; Tees</span>
          </h1>
          <div className="pf-sub">
            <p>Cut, sewn and decorated for brands that care how a garment feels. Samples from one piece, bulk from 50 pieces per design.</p>
            <Link href="/quote" className="btn gold">Start your drop</Link>
          </div>
        </div>
      </section>

      <div className="pf-marq" aria-hidden="true"><div>
        {Array.from({ length: 2 }).map((_, k) => <span key={k}>HOODIES ✦ SWEATSHIRTS ✦ T-SHIRTS ✦ SCREEN PRINT ✦ EMBROIDERY ✦ DTG ✦ PRIVATE LABEL ✦ </span>)}
      </div></div>

      <section className="pf-grid-sec">
        <div className="wrap pf-wrap">
          {FILTERS.map(([id], i) => <input key={id} type="radio" name="pf" id={`f-${id}`} className="pf-radio" defaultChecked={i === 0} />)}
          <div className="pf-bar" role="tablist" aria-label="Filter by category">
            {FILTERS.map(([id, label]) => <label key={id} htmlFor={`f-${id}`}>{label}<sup>{String(count(id)).padStart(2, '0')}</sup></label>)}
          </div>

          <div className="pf-grid">
            {LOOKS.map(l => (
              <Link key={l.id} href="/quote" className="pf-item" data-cat={l.cat} aria-label={`${l.name}: get a quote`}>
                <Image src={`/images/${l.img}.webp`} alt={`${l.name}, custom ${l.cat === 'tees' ? 't-shirt' : l.cat.slice(0, -1)} by SmartStitch`} width={l.w} height={l.h} sizes="(max-width:700px) 50vw, (max-width:1100px) 33vw, 360px" />
                <span className="pf-no">{l.id}</span>
                <span className="pf-info">
                  <b>{l.name}</b>
                  <em>{l.fit}</em>
                  <em>{l.deco}</em>
                  <i>Make this →</i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-make">
        <div className="wrap">
          <h2>What we make for you</h2>
          <div className="pf-cols">
            {MAKE_LIST.map((m, i) => (
              <div key={m.cat} className="pf-col">
                <span className="pf-num">0{i + 1}</span>
                <h3>{m.cat}</h3>
                <p>{m.note}</p>
                <ul>{m.tags.map(t => <li key={t}>{t}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Have a design? Send it over." text="Tell us the piece, quantity and artwork. We reply with pricing and a free digital proof before production." />
    </div>
  );
}
