import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader } from '@/components/Shell';
import { SiteJsonLd } from '@/components/Schema';
import Analytics from '@/components/Analytics';
import WhatsAppButton from '@/components/WhatsAppButton';
import { SITE } from '@/data/content';
import './globals.css';

const display = Fraunces({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-display', display: 'swap' });
const body = Manrope({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'SmartStitch | Custom apparel manufacturer for US, UAE and UK brands', template: '%s | SmartStitch' },
  description: 'Custom T-shirts, polos and hoodies made in Karachi. 10-piece minimum, volume discounts, free digital proof and DHL Express delivery to the US, UAE and UK.',
  openGraph: { siteName: 'SmartStitch', type: 'website' },
  twitter: { card: 'summary_large_image' },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body><SiteJsonLd /><Loader /><Header /><main>{children}</main><Footer /><WhatsAppButton /><Analytics /></body>
    </html>
  );
}
