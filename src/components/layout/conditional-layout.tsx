'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './footer';

// ── Routes jahan Navbar/Footer NAHI chahiye ───────────────────────
const HIDE_LAYOUT_ROUTES = [
  '/login',
  '/register',
  '/onboarding',
  '/customize', // fullscreen 3D editor
];

// prefix match ke liye (e.g. /admin/*)
const HIDE_LAYOUT_PREFIXES = [
  '/admin',
  '/dashboard',
];

function shouldHideLayout(pathname: string): boolean {
  if (HIDE_LAYOUT_ROUTES.includes(pathname)) return true;
  if (HIDE_LAYOUT_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  return false;
}

// ── Component ─────────────────────────────────────────────────────
export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = shouldHideLayout(pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}