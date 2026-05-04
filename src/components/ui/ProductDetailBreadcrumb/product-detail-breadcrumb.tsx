'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props { productName: string; }

export function ProductDetailBreadcrumb({ productName }: Props) {
  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-neutral-silver">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-navy transition-colors">Products</Link>
            <span>/</span>
            <span className="text-navy-darkest font-medium">{productName}</span>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-neutral-silver hover:text-navy transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>
      </div>
    </>
  );
}

export default ProductDetailBreadcrumb;