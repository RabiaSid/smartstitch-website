'use client';

import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────
const footerLinks = {
  Shop: [
    { label: 'All Products',    href: '/products' },
    { label: 'Customize',       href: '/customize' },
    { label: 'Bulk / B2B',      href: '/b2b' },
    { label: 'New Arrivals',    href: '/products?tag=new' },
  ],
  Company: [
    { label: 'About Us',        href: '/about' },
    { label: 'Contact',         href: '/contact' },
    { label: 'How It Works',    href: '/#how-it-works' },
    { label: 'Quality Promise', href: '/quality' },
  ],
  Support: [
    { label: 'FAQ',             href: '/faq' },
    { label: 'Shipping Info',   href: '/shipping' },
    { label: 'Returns Policy',  href: '/returns' },
    { label: 'Size Guide',      href: '/size-guide' },
  ],
};

const contactInfo = [
  { icon: Mail,   text: 'hello@smartstitch.online' },
  { icon: Phone,  text: '+92 300 0000000' },
  { icon: MapPin, text: 'Karachi, Pakistan' },
];

const markets = ['🇩🇪 Germany', '🇬🇧 UK', '🇫🇷 France', '🇳🇱 Netherlands', '🇦🇪 UAE', '🇸🇦 Saudi Arabia', '🇰🇼 Kuwait', '🇶🇦 Qatar'];

const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

const paymentMethods = ['Stripe', 'Tabby', 'Wire'];

// ── Component ─────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-neutral-jet text-white">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-display text-3xl font-bold mb-3">
              Smart<span className="text-gold">Stitch</span>
            </div>
            <p className="text-gold text-sm mb-4 italic">Wear Your Identity</p>
            <p className="text-neutral-silver text-sm leading-relaxed mb-6 max-w-xs">
              Premium custom T-shirts manufactured in Pakistan, shipped worldwide. Quality you can trust, prices that make sense.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              {contactInfo.map((c) => (
                <div key={c.text} className="flex items-center gap-3 text-neutral-silver text-sm">
                  <c.icon size={15} className="text-gold flex-shrink-0" />
                  {c.text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gold/20 flex items-center justify-center text-neutral-silver hover:text-gold transition-all duration-200"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-silver hover:text-gold text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Markets strip */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 text-neutral-silver text-xs">
          {markets.map((m) => (
            <span key={m} className="hover:text-gold transition-colors cursor-default">{m}</span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-silver text-xs">
          <p>© 2026 SmartStitch. All rights reserved.</p>
          <div className="flex gap-5">
            {legalLinks.map((l) => (
              <Link key={l} href="#" className="hover:text-gold transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span>Payments:</span>
            {paymentMethods.map((p) => (
              <span key={p} className="px-2 py-0.5 bg-white/10 rounded text-xs">{p}</span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;