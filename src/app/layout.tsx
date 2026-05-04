import type { Metadata } from 'next';
// import { Playfair_Display, DM_Sans } from 'next/font/google';

import { Tenor_Sans, Lato, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/Providers';
import ConditionalLayout from '@/components/layout/conditional-layout';
import '@/styles/globals.css';

// ── Fonts ─────────────────────────────────────────────────────────
// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   variable: '--font-display',
//   display: 'swap',
// });
// const dmSans = DM_Sans({
//   subsets: ['latin'],
//   variable: '--font-body',
//   display: 'swap',
// });

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// ── Metadata ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'SmartStitch — Wear Your Identity',
    template: '%s | SmartStitch',
  },
  description: 'Premium custom T-shirts manufactured in Pakistan, shipped to Europe & Middle East.',
  metadataBase: new URL('https://smartstitch.online'),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  alternates: {
    canonical: 'https://smartstitch.online',
  },
  openGraph: {
    title: 'SmartStitch — Wear Your Identity',
    description: 'Premium custom T-shirts shipped to Europe & Middle East.',
    url: 'https://smartstitch.online',
    siteName: 'SmartStitch',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Root Layout ───────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
    <html lang="en" className={`${tenorSans.variable} ${lato.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased">
        <Providers>
          <ConditionalLayout>
            <main>{children}</main>
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
// import type { Metadata } from 'next';
// import { Playfair_Display, DM_Sans } from 'next/font/google';
// import { Providers } from '@/components/Providers';
// import '@/styles/globals.css';
// import Navbar from '@/components/layout/navbar';

// const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
// const dmSans   = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

// export const metadata: Metadata = {
//   title: { default: 'SmartStitch — Wear Your Identity', template: '%s | SmartStitch' },
//   description: 'Premium custom T-shirts shipped to Europe and Middle East.',
//   metadataBase: new URL('https://smartstitch.online'),
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
//       <body className="font-body antialiased">
//         <Providers>
//           <Navbar />        
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }