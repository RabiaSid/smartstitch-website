import Link from 'next/link';
import Image from 'next/image';
import { MARKETS, SITE } from '@/data/content';

const Icon = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const MAIL = 'M4 6h16v12H4zM4 7l8 6 8-6';
const PIN = 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z';
const IG = 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01';
const LI = 'M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v2c.8-1.4 2.2-2.2 4-2.2 3 0 4 2 4 5V20h-4v-5.5c0-1.4-.5-2.3-1.8-2.3S14 13.200 14 14.700V20h-4z';
const FB = 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z';
const TH = 'M12 3a9 9 0 1 0 6.4 15.3M16 12a4 4 0 1 1-4-4c2.4 0 4 1.7 4 4v1.5a1.6 1.6 0 0 0 3.2 0V12';
const XX = 'M4 4l16 16M20 4L4 20';
const CHAT = 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z';

const COLS: [string, [string, string][]][] = [
  ['Company', [['About', '/about'], ['Portfolio', '/portfolio'], ['B2B pricing', '/b2b'], ['Fabric guide', '/fabric-guide'], ['Contact', '/contact'], ['Get a quote', '/quote'], ['Request a sample', '/samples'], ['Privacy policy', '/privacy']]],
  ['Markets', MARKETS.map(m => [`Custom apparel for ${m.short}`, `/markets/${m.slug}`] as [string, string])],
  ['Products', [['Hoodies', '/custom/hoodies'], ['Sweatshirts', '/custom/sweatshirts'], ['T-shirts', '/custom/t-shirts'], ['Polos', '/custom/polos'], ['Private label', '/private-label']]],
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-glow" aria-hidden="true" />
      <div className="wrap ft-main">
        <div className="ft-brand">
          <Image src="/images/logo-white.webp" alt="SmartStitch" width={640} height={366} style={{ height: 92, width: 'auto' }} />
          <p>Custom T-shirts, polos and hoodies manufactured in Karachi and shipped worldwide. Quality you can trust, prices that make sense.</p>
          <ul className="ft-contact">
            {SITE.email && <li><Icon d={MAIL} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>}
            {SITE.whatsapp && <li><Icon d={CHAT} /><a href={`https://wa.me/${SITE.whatsapp}`}>WhatsApp</a></li>}
            <li><Icon d={PIN} />{SITE.city}</li>
          </ul>
          <div className="ft-social">
            {[[SITE.instagram, IG, 'Instagram'], [SITE.facebook, FB, 'Facebook'], [SITE.threads, TH, 'Threads'], [SITE.linkedin, LI, 'LinkedIn'], [SITE.x, XX, 'X']].filter(([u]) => u).map(([u, d, n]) => (
              <a key={n} href={u} target="_blank" rel="noopener noreferrer" aria-label={n}><Icon d={d} /></a>
            ))}
          </div>
        </div>
        {COLS.map(([title, links]) => (
          <div key={title} className="ft-col">
            <h3>{title}</h3>
            <ul>{links.map(([l, h]) => <li key={l}><Link href={h}>{l}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="ft-markets"><div className="wrap">
        <span>We ship to</span>
        {MARKETS.map(m => <Link key={m.slug} href={`/markets/${m.slug}`}><b>{m.short}</b>{m.name}</Link>)}
      </div></div>
      <div className="ft-word" aria-hidden="true">SmartStitch</div>
      <div className="ft-bottom"><div className="wrap">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <div className="ft-pills"><span>Shipping: DHL Express</span><span>Min. order: 10 pieces</span></div>
      </div></div>
    </footer>
  );
}
