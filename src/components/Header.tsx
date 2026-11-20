'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'B2B pricing', href: '/b2b' },
  { label: 'Markets', href: '/markets/us' },
  { label: 'Fabric guide', href: '/fabric-guide' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={`nb${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nb-row">
        <Link href="/" className="nb-brand" aria-label="SmartStitch home">
          <Image src="/images/mini-logo-white.webp" alt="SmartStitch" width={480} height={257} priority style={{ height: 52, width: 'auto' }} />
          <span className="nb-tag">Wear Your<br />Identity</span>
        </Link>
        <nav className="nb-links" aria-label="Main">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className={path === l.href || (l.label === 'Markets' && path.startsWith('/markets')) ? 'on' : ''}>{l.label}</Link>
          ))}
        </nav>
        <div className="nb-actions">
          <Link href="/quote" className="nb-cta">Get a quote</Link>
          <button className="nb-burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <i /><i /><i />
          </button>
        </div>
      </div>
      <div className={`nb-mobile${open ? ' open' : ''}`}>
        <nav className="wrap" aria-label="Mobile">
          {LINKS.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          <Link href="/quote" className="nb-cta">Get a quote</Link>
        </nav>
      </div>
    </header>
  );
}
