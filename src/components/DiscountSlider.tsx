'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TIERS } from '@/data/content';

const MAX = 600;
const tierOf = (q: number) => (q >= 500 ? 3 : q >= 100 ? 2 : q >= 50 ? 1 : 0);

export default function DiscountSlider() {
  const [q, setQ] = useState(50);
  const t = TIERS[tierOf(q)];
  const pct = ((q - 10) / (MAX - 10)) * 100;
  return (
    <div className="dslider glass">
      <div className="ds-top">
        <div><span className="ds-label">Your order</span><strong className="ds-qty">{q >= MAX ? `${MAX}+` : q} pieces</strong></div>
        <div className="ds-off" key={t.off}><span>{t.name} tier</span><strong>{t.off} off</strong></div>
      </div>
      <input type="range" min={10} max={MAX} step={5} value={q} onChange={e => setQ(Number(e.target.value))} aria-label="Order quantity" style={{ ['--p' as string]: `${pct}%` }} />
      <div className="ds-ticks">{TIERS.map((x, i) => <span key={x.qty} className={i <= tierOf(q) ? 'on' : ''}>{x.qty}<em>{x.off}</em></span>)}</div>
      <Link href="/quote" className="btn gold">Get a quote for {q >= MAX ? `${MAX}+` : q} pieces</Link>
    </div>
  );
}
