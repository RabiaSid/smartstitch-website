import Link from 'next/link';
import Image from 'next/image';

const PICKS = [
  { img: 'street-charcoal', w: 720, h: 900, label: 'Hoodies' },
  { img: 'thermal', w: 720, h: 1080, label: 'Sweatshirts' },
  { img: 'g4', w: 360, h: 520, label: 'T-shirts' },
];

export default function LookTeaser() {
  return (
    <section className="lt">
      <div className="wrap lt-grid">
        <div className="lt-copy">
          <p className="lt-kicker">Lookbook / Vol. 01</p>
          <h2>Hoodies, sweatshirts <span>&amp; tees</span></h2>
          <p>See the pieces we cut, sew and decorate for streetwear and private-label brands.</p>
          <Link href="/portfolio" className="btn gold">View the portfolio</Link>
        </div>
        <div className="lt-imgs">
          {PICKS.map((p, i) => (
            <Link key={p.img} href="/portfolio" className={`lt-img i${i}`} aria-label={`${p.label}: view portfolio`}>
              <Image src={`/images/${p.img}.webp`} alt={`Custom ${p.label.toLowerCase()} by SmartStitch`} width={p.w} height={p.h} sizes="(max-width:900px) 33vw, 220px" />
              <span>{p.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
