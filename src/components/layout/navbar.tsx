'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, User, Search, ChevronDown } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { toggleCart } from '@/store/slices/cartSlice';
import { toggleNav, closeNav } from '@/store/slices/uiSlice';
import { cn } from '@/lib/utils';
import Logo from '@/assets/logo-white.webp'
import MiniLogo from '@/assets/mini-logo-white.webp'

const NAV_LINKS = [
  { label: 'Shop', href: '/products' },
  { label: 'Customize', href: '/customize' },
  { label: 'B2B', href: '/b2b' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { isNavOpen } = useAppSelector(s => s.ui);
  const { cart } = useAppSelector(s => s.cart);
  const { isAuthenticated, user } = useAppSelector(s => s.auth);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { dispatch(closeNav()); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-navy-darkest/95 backdrop-blur-md shadow-lg shadow-navy-darkest/20'
            : 'bg-navy-darkest'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              {/* <span className="font-display text-2xl font-bold text-white tracking-tight">
                Smart<span className="text-gold">Stitch</span>
              </span>
              <span className="hidden sm:block text-xs text-navy-soft border-l border-navy-dark pl-3 leading-tight">
                Wear Your<br />Identity
              </span> */}
              <Image
                src={MiniLogo}
                alt="SmartStitch"
                width={200}
                height={60}
                className="h-10 lg:h-14 w-auto object-contain"
              />
              <span className="hidden sm:block text-xs text-navy-soft border-l border-navy-dark pl-5 leading-tight">
                Wear Your<br />Identity
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-gold bg-white/5'
                      : 'text-navy-soft hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">

              {/* Search */}
              <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-navy-soft hover:text-white hover:bg-white/5 transition-all">
                <Search size={18} />
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <Link
                  href="/account/orders"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-navy-soft hover:text-white hover:bg-white/5 transition-all text-sm"
                >
                  <User size={16} />
                  <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-navy-soft hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  <User size={16} />
                  Login
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative flex items-center justify-center w-9 h-9 rounded-lg text-navy-soft hover:text-white hover:bg-white/5 transition-all"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} />
                {cart.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs font-bold rounded-full flex items-center justify-center leading-none">
                    {cart.totalItems > 9 ? '9+' : cart.totalItems}
                  </span>
                )}
              </button>

              {/* Customize CTA — desktop */}
              <Link
                href="/customize"
                className="hidden lg:flex items-center gap-2 ml-2 px-4 py-2 bg-gold hover:bg-gold-dark text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/25"
              >
                Design Now
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => dispatch(toggleNav())}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-navy-soft hover:text-white hover:bg-white/5 transition-all ml-1"
                aria-label="Toggle menu"
              >
                {isNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Nav ── */}
        <div className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 border-t border-navy-dark/50',
          isNavOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <nav className="px-4 py-4 space-y-1 bg-navy-darkest">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  pathname === link.href
                    ? 'text-gold bg-white/5'
                    : 'text-navy-soft hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-navy-dark/50 space-y-1">
              {isAuthenticated ? (
                <Link href="/account/orders" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-navy-soft hover:text-white hover:bg-white/5 transition-all">
                  <User size={16} /> My Orders
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-navy-soft hover:text-white hover:bg-white/5 transition-all">
                  <User size={16} /> Login / Register
                </Link>
              )}
              <Link href="/customize" className="flex items-center justify-center gap-2 mx-4 py-3 bg-gold hover:bg-gold-dark text-white text-sm font-semibold rounded-xl transition-all">
                🎨 Design Your Shirt
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer — page content neeche se start ho */}
      <div className="h-16 lg:h-20" />
    </>
  );
}