'use client';

import Link from 'next/link';

export function ProductsBulkBanner() {
  return (
    <div className="bg-gold py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-white text-sm font-medium">
        <span>🎉 Bulk Discounts:</span>
        <span>10+ shirts → <strong>10% off</strong></span>
        <span>50+ shirts → <strong>20% off</strong></span>
        <span>100+ shirts → <strong>30% off</strong></span>
        <Link href="/b2b" className="underline underline-offset-2 hover:no-underline">
          B2B Quote →
        </Link>
      </div>
    </div>
  );
}

export default ProductsBulkBanner;