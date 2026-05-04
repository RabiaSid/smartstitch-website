'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductsHero }       from '@/components/ui/ProductsHero/products-hero';
import { ProductsBulkBanner } from '@/components/ui/ProductsBulkBanner/products-bulk-banner';
import { ProductFilters }     from '@/components/ui/ProductFilters/product-filters';
import { ProductCard }        from '@/components/ui/ProductCard/product-card';
import { ProductsB2BCTA }     from '@/components/ui/ProductsB2BCTA/products-b2b-cta';
import type { Product }       from '@/components/ui/ProductCard/product-card';

// ── Mock Data ─────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Classic Essential Tee', category: 'Basic',
    fabric: '100% Cotton', basePrice: 8.50, originalPrice: 12,
    tag: 'Best Seller', rating: 4.9, reviews: 342, moq: 1,
    colors: [
      { name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#111111' },
      { name: 'Navy',  hex: '#0A1F44' }, { name: 'Grey',  hex: '#6B7280' },
    ],
    sizes: ['XS','S','M','L','XL','XXL'], emoji: '👕',
    description: 'Our most popular tee — soft, breathable, perfect for custom printing.',
    inStock: true,
  },
  {
    id: '2', name: 'Premium Pima Cotton', category: 'Premium',
    fabric: '100% Pima Cotton', basePrice: 14.00, originalPrice: 18,
    tag: 'Premium', rating: 4.8, reviews: 198, moq: 1,
    colors: [
      { name: 'Royal Blue', hex: '#1E5EFF' }, { name: 'Gold',     hex: '#D4AF37' },
      { name: 'Forest',     hex: '#2D6A4F' }, { name: 'Burgundy', hex: '#6B1F2A' },
    ],
    sizes: ['S','M','L','XL','XXL','XXXL'], emoji: '👔',
    description: 'Luxury Pima cotton with ultra-smooth finish.',
    inStock: true,
  },
  {
    id: '3', name: 'Sport Performance', category: 'Sport',
    fabric: 'Polyester Blend', basePrice: 11.00,
    tag: 'New', rating: 4.7, reviews: 87, moq: 10,
    colors: [
      { name: 'Black', hex: '#111111' }, { name: 'Red',  hex: '#C1121F' },
      { name: 'Navy',  hex: '#0A1F44' }, { name: 'Sky',  hex: '#5B8CFF' },
    ],
    sizes: ['XS','S','M','L','XL','XXL'], emoji: '🎽',
    description: 'Moisture-wicking performance fabric.',
    inStock: true,
  },
  {
    id: '4', name: 'Oversized Streetwear', category: 'Streetwear',
    fabric: '100% Cotton', basePrice: 13.50,
    tag: 'Trending', rating: 4.9, reviews: 256, moq: 1,
    colors: [
      { name: 'Grey',     hex: '#6B7280' }, { name: 'White',    hex: '#FFFFFF' },
      { name: 'Gold',     hex: '#D4AF37' }, { name: 'Charcoal', hex: '#374151' },
    ],
    sizes: ['S','M','L','XL','XXL','XXXL'], emoji: '🧥',
    description: 'Relaxed oversized fit for streetwear brands.',
    inStock: true,
  },
  {
    id: '5', name: 'V-Neck Essential', category: 'Basic',
    fabric: '100% Cotton', basePrice: 9.50,
    rating: 4.6, reviews: 124, moq: 1,
    colors: [
      { name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#111111' },
      { name: 'Navy',  hex: '#0A1F44' }, { name: 'Beige', hex: '#D4B896' },
    ],
    sizes: ['XS','S','M','L','XL'], emoji: '👕',
    description: 'Classic V-neck silhouette, breathable cotton.',
    inStock: true,
  },
  {
    id: '6', name: 'Polo Club Edition', category: 'Polo',
    fabric: 'Piqué Cotton', basePrice: 16.00, originalPrice: 20,
    tag: 'Premium', rating: 4.8, reviews: 89, moq: 5,
    colors: [
      { name: 'Navy',       hex: '#0A1F44' }, { name: 'White',  hex: '#FFFFFF' },
      { name: 'Royal Blue', hex: '#1E5EFF' }, { name: 'Forest', hex: '#2D6A4F' },
    ],
    sizes: ['S','M','L','XL','XXL'], emoji: '👔',
    description: 'Premium piqué polo with embroidery-ready chest.',
    inStock: true,
  },
  {
    id: '7', name: 'Kids Collection', category: 'Kids',
    fabric: '100% Organic Cotton', basePrice: 6.50,
    tag: 'New', rating: 4.9, reviews: 67, moq: 1,
    colors: [
      { name: 'White', hex: '#FFFFFF' }, { name: 'Sky', hex: '#5B8CFF' },
      { name: 'Gold',  hex: '#D4AF37' }, { name: 'Red', hex: '#C1121F' },
    ],
    sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'], emoji: '🧒',
    description: 'Soft organic cotton kids tees.',
    inStock: false,
  },
  {
    id: '8', name: 'Long Sleeve Thermal', category: 'Long Sleeve',
    fabric: 'Cotton Blend', basePrice: 12.00,
    rating: 4.5, reviews: 43, moq: 5,
    colors: [
      { name: 'Black',    hex: '#111111' }, { name: 'Navy',    hex: '#0A1F44' },
      { name: 'Charcoal', hex: '#374151' }, { name: 'Grey',    hex: '#6B7280' },
    ],
    sizes: ['XS','S','M','L','XL','XXL'], emoji: '👕',
    description: 'Warm cotton-blend long sleeve for European winters.',
    inStock: true,
  },
];

// ── Page ──────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [search,     setSearch]     = useState('');
  const [category,   setCategory]   = useState('All');
  const [sort,       setSort]       = useState('featured');
  const [showFilter, setShowFilter] = useState(false);
  const [maxPrice,   setMaxPrice]   = useState(25);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      const matchCat    = category === 'All' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.fabric.toLowerCase().includes(search.toLowerCase());
      const matchPrice  = p.basePrice <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    });
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.basePrice - b.basePrice);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.basePrice - a.basePrice);
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort, maxPrice]);

  const activeFilters = [
    category !== 'All' && category,
    maxPrice < 25 && `Max €${maxPrice}`,
    search && `"${search}"`,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-neutral-smoke">

      {/* Hero */}
      <ProductsHero />

      {/* Bulk discount strip */}
      <ProductsBulkBanner />

      {/* Products section */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Filters */}
        <ProductFilters
          search={search}         setSearch={setSearch}
          sort={sort}             setSort={setSort}
          category={category}     setCategory={setCategory}
          maxPrice={maxPrice}     setMaxPrice={setMaxPrice}
          showFilter={showFilter} setShowFilter={setShowFilter}
          activeFilters={activeFilters}
          resultCount={filtered.length}
        />

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display text-2xl font-bold text-navy-darkest mb-2">No products found</h3>
              <p className="text-neutral-silver mb-6">Try changing your filters or search term</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); setMaxPrice(25); }}
                className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-dark transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* B2B CTA */}
        <ProductsB2BCTA />
      </div>
    </div>
  );
}
// 'use client';

// import { useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import {
//   Search, Star, ShoppingBag, Heart,
//   SlidersHorizontal, X, ChevronDown
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // ─────────────────────────────────────────────
// // TYPES
// // ─────────────────────────────────────────────
// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   fabric: string;
//   basePrice: number;
//   originalPrice?: number;
//   tag?: string;
//   rating: number;
//   reviews: number;
//   colors: { name: string; hex: string }[];
//   sizes: string[];
//   emoji: string;
//   description: string;
//   inStock: boolean;
//   moq: number;
// }

// // ─────────────────────────────────────────────
// // MOCK DATA
// // ─────────────────────────────────────────────
// const PRODUCTS: Product[] = [
//   {
//     id: '1', name: 'Classic Essential Tee', category: 'Basic',
//     fabric: '100% Cotton', basePrice: 8.50, originalPrice: 12,
//     tag: 'Best Seller', rating: 4.9, reviews: 342, moq: 1,
//     colors: [
//       { name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#111111' },
//       { name: 'Navy',  hex: '#0A1F44' }, { name: 'Grey',  hex: '#6B7280' },
//     ],
//     sizes: ['XS','S','M','L','XL','XXL'], emoji: '👕',
//     description: 'Our most popular tee — soft, breathable, perfect for custom printing.',
//     inStock: true,
//   },
//   {
//     id: '2', name: 'Premium Pima Cotton', category: 'Premium',
//     fabric: '100% Pima Cotton', basePrice: 14.00, originalPrice: 18,
//     tag: 'Premium', rating: 4.8, reviews: 198, moq: 1,
//     colors: [
//       { name: 'Royal Blue', hex: '#1E5EFF' }, { name: 'Gold',     hex: '#D4AF37' },
//       { name: 'Forest',     hex: '#2D6A4F' }, { name: 'Burgundy', hex: '#6B1F2A' },
//     ],
//     sizes: ['S','M','L','XL','XXL','XXXL'], emoji: '👔',
//     description: 'Luxury Pima cotton with ultra-smooth finish. Ideal for high-end merchandise.',
//     inStock: true,
//   },
//   {
//     id: '3', name: 'Sport Performance', category: 'Sport',
//     fabric: 'Polyester Blend', basePrice: 11.00,
//     tag: 'New', rating: 4.7, reviews: 87, moq: 10,
//     colors: [
//       { name: 'Black', hex: '#111111' }, { name: 'Red',  hex: '#C1121F' },
//       { name: 'Navy',  hex: '#0A1F44' }, { name: 'Sky',  hex: '#5B8CFF' },
//     ],
//     sizes: ['XS','S','M','L','XL','XXL'], emoji: '🎽',
//     description: 'Moisture-wicking performance fabric. Perfect for sports teams and events.',
//     inStock: true,
//   },
//   {
//     id: '4', name: 'Oversized Streetwear', category: 'Streetwear',
//     fabric: '100% Cotton', basePrice: 13.50,
//     tag: 'Trending', rating: 4.9, reviews: 256, moq: 1,
//     colors: [
//       { name: 'Grey',     hex: '#6B7280' }, { name: 'White',    hex: '#FFFFFF' },
//       { name: 'Gold',     hex: '#D4AF37' }, { name: 'Charcoal', hex: '#374151' },
//     ],
//     sizes: ['S','M','L','XL','XXL','XXXL'], emoji: '🧥',
//     description: 'Relaxed oversized fit for streetwear brands and modern fashion labels.',
//     inStock: true,
//   },
//   {
//     id: '5', name: 'V-Neck Essential', category: 'Basic',
//     fabric: '100% Cotton', basePrice: 9.50,
//     rating: 4.6, reviews: 124, moq: 1,
//     colors: [
//       { name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#111111' },
//       { name: 'Navy',  hex: '#0A1F44' }, { name: 'Beige', hex: '#D4B896' },
//     ],
//     sizes: ['XS','S','M','L','XL'], emoji: '👕',
//     description: 'Classic V-neck silhouette, breathable cotton for casual and semi-formal looks.',
//     inStock: true,
//   },
//   {
//     id: '6', name: 'Polo Club Edition', category: 'Polo',
//     fabric: 'Piqué Cotton', basePrice: 16.00, originalPrice: 20,
//     tag: 'Premium', rating: 4.8, reviews: 89, moq: 5,
//     colors: [
//       { name: 'Navy',       hex: '#0A1F44' }, { name: 'White',  hex: '#FFFFFF' },
//       { name: 'Royal Blue', hex: '#1E5EFF' }, { name: 'Forest', hex: '#2D6A4F' },
//     ],
//     sizes: ['S','M','L','XL','XXL'], emoji: '👔',
//     description: 'Premium piqué polo with embroidery-ready chest for corporate events.',
//     inStock: true,
//   },
//   {
//     id: '7', name: 'Kids Collection', category: 'Kids',
//     fabric: '100% Organic Cotton', basePrice: 6.50,
//     tag: 'New', rating: 4.9, reviews: 67, moq: 1,
//     colors: [
//       { name: 'White', hex: '#FFFFFF' }, { name: 'Sky', hex: '#5B8CFF' },
//       { name: 'Gold',  hex: '#D4AF37' }, { name: 'Red', hex: '#C1121F' },
//     ],
//     sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'], emoji: '🧒',
//     description: 'Soft organic cotton kids tees — safe and perfect for family or school events.',
//     inStock: false,
//   },
//   {
//     id: '8', name: 'Long Sleeve Thermal', category: 'Long Sleeve',
//     fabric: 'Cotton Blend', basePrice: 12.00,
//     rating: 4.5, reviews: 43, moq: 5,
//     colors: [
//       { name: 'Black',    hex: '#111111' }, { name: 'Navy',    hex: '#0A1F44' },
//       { name: 'Charcoal', hex: '#374151' }, { name: 'Grey',    hex: '#6B7280' },
//     ],
//     sizes: ['XS','S','M','L','XL','XXL'], emoji: '👕',
//     description: 'Warm cotton-blend long sleeve — ideal for European winter seasons.',
//     inStock: true,
//   },
// ];

// const CATEGORIES = ['All','Basic','Premium','Sport','Streetwear','Polo','Kids','Long Sleeve'];

// const SORT_OPTIONS = [
//   { value: 'featured',   label: 'Featured' },
//   { value: 'price-asc',  label: 'Price: Low → High' },
//   { value: 'price-desc', label: 'Price: High → Low' },
//   { value: 'rating',     label: 'Top Rated' },
// ];

// const TAG_COLORS: Record<string, string> = {
//   'Best Seller': 'bg-yellow-50 text-yellow-700 border-yellow-200',
//   'Premium':     'bg-purple-50 text-purple-700 border-purple-200',
//   'New':         'bg-emerald-50 text-emerald-700 border-emerald-200',
//   'Trending':    'bg-blue-50 text-blue-700 border-blue-200',
// };

// // ─────────────────────────────────────────────
// // PRODUCT CARD
// // ─────────────────────────────────────────────
// function ProductCard({ product, index }: { product: Product; index: number }) {
//   const [selectedColor, setSelectedColor] = useState(0);
//   const [wishlisted, setWishlisted]       = useState(false);
//   const [hovered, setHovered]             = useState(false);

//   const bgHex = product.colors[selectedColor]?.hex ?? '#DCE7FF';

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 28 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ y: -6 }}
//       onHoverStart={() => setHovered(true)}
//       onHoverEnd={() => setHovered(false)}
//       className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
//     >
//       {/* Image */}
//       <div
//         className="relative h-56 flex items-center justify-center overflow-hidden transition-colors duration-500"
//         style={{
//           background: `linear-gradient(135deg, ${bgHex}25 0%, ${bgHex}50 100%)`,
//         }}
//       >
//         <motion.div
//           className="text-8xl select-none pointer-events-none"
//           animate={hovered
//             ? { scale: 1.1, y: -8, rotate: [-2, 2, -1, 0] }
//             : { scale: 1,   y: 0,  rotate: 0 }
//           }
//           transition={{ duration: 0.4 }}
//         >
//           {product.emoji}
//         </motion.div>

//         {/* Out of stock */}
//         {!product.inStock && (
//           <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center">
//             <span className="px-4 py-1.5 bg-neutral-jet text-white text-xs font-semibold rounded-full tracking-wider">
//               Out of Stock
//             </span>
//           </div>
//         )}

//         {/* Tag */}
//         {product.tag && (
//           <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${TAG_COLORS[product.tag]}`}>
//             {product.tag}
//           </span>
//         )}

//         {/* Wishlist */}
//         <button
//           onClick={() => setWishlisted(w => !w)}
//           className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
//         >
//           <Heart
//             size={14}
//             className={wishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-silver'}
//           />
//         </button>

//         {/* Hover CTAs */}
//         <AnimatePresence>
//           {hovered && product.inStock && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.2 }}
//               className="absolute bottom-3 left-3 right-3 flex gap-2"
//             >
//               <Link
//                 href={`/customize?product=${product.id}`}
//                 className="flex-1 py-2 bg-navy-darkest hover:bg-navy-dark text-white text-xs font-semibold rounded-xl text-center transition-colors"
//               >
//                 🎨 Customize
//               </Link>
//               <Link
//                 href={`/products/${product.id}`}
//                 className="flex-1 py-2 bg-gold hover:bg-gold-dark text-white text-xs font-semibold rounded-xl text-center transition-colors"
//               >
//                 Details
//               </Link>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Info */}
//       <div className="p-5 flex flex-col flex-1">
//         {/* Category + fabric */}
//         <div className="flex items-center justify-between mb-1.5">
//           <span className="text-xs font-semibold text-navy uppercase tracking-wider">
//             {product.category}
//           </span>
//           <span className="text-xs text-neutral-silver">{product.fabric}</span>
//         </div>

//         {/* Name */}
//         <h3 className="font-display font-semibold text-navy-darkest text-base mb-2 group-hover:text-navy transition-colors leading-snug">
//           {product.name}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1.5 mb-3">
//           <div className="flex gap-0.5">
//             {Array(5).fill(0).map((_, i) => (
//               <Star
//                 key={i} size={12}
//                 className={
//                   i < Math.floor(product.rating)
//                     ? 'fill-gold text-gold'
//                     : 'text-gray-200 fill-gray-200'
//                 }
//               />
//             ))}
//           </div>
//           <span className="text-xs text-neutral-silver">
//             {product.rating} ({product.reviews})
//           </span>
//         </div>

//         {/* Colors */}
//         <div className="flex items-center gap-1.5 mb-4">
//           {product.colors.map((c, i) => (
//             <button
//               key={c.hex}
//               onClick={() => setSelectedColor(i)}
//               title={c.name}
//               className={cn(
//                 'w-5 h-5 rounded-full border-2 transition-all hover:scale-125',
//                 selectedColor === i
//                   ? 'border-navy-darkest scale-125 shadow-sm'
//                   : 'border-transparent'
//               )}
//               style={{
//                 backgroundColor: c.hex,
//                 boxShadow: c.hex === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined,
//               }}
//             />
//           ))}
//           <span className="text-xs text-neutral-silver ml-1">+8 colors</span>
//         </div>

//         {/* Price + CTA */}
//         <div className="flex items-end justify-between mt-auto">
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="font-display font-bold text-navy-darkest text-xl">
//                 €{product.basePrice.toFixed(2)}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-neutral-silver text-sm line-through">
//                   €{product.originalPrice}
//                 </span>
//               )}
//             </div>
//             <p className="text-xs text-neutral-silver mt-0.5">
//               {product.moq > 1 ? `Min. ${product.moq} pcs` : 'No minimum'}
//             </p>
//           </div>

//           <Link
//             href={`/customize?product=${product.id}`}
//             className={cn(
//               'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all',
//               product.inStock
//                 ? 'bg-navy text-white hover:bg-navy-dark hover:-translate-y-0.5 hover:shadow-navy'
//                 : 'bg-gray-100 text-neutral-silver pointer-events-none'
//             )}
//           >
//             <ShoppingBag size={13} />
//             {product.inStock ? 'Order Now' : 'Notify Me'}
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────
// export default function ProductsPage() {
//   const [search,     setSearch]     = useState('');
//   const [category,   setCategory]   = useState('All');
//   const [sort,       setSort]       = useState('featured');
//   const [showFilter, setShowFilter] = useState(false);
//   const [maxPrice,   setMaxPrice]   = useState(25);

//   // Filter + sort
//   const filtered = useMemo(() => {
//     let list = PRODUCTS.filter(p => {
//       const matchCat    = category === 'All' || p.category === category;
//       const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
//                           p.fabric.toLowerCase().includes(search.toLowerCase());
//       const matchPrice  = p.basePrice <= maxPrice;
//       return matchCat && matchSearch && matchPrice;
//     });

//     if (sort === 'price-asc')  list = [...list].sort((a, b) => a.basePrice - b.basePrice);
//     if (sort === 'price-desc') list = [...list].sort((a, b) => b.basePrice - a.basePrice);
//     if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);

//     return list;
//   }, [search, category, sort, maxPrice]);

//   const activeFilters = [
//     category !== 'All' && category,
//     maxPrice < 25 && `Max €${maxPrice}`,
//     search && `"${search}"`,
//   ].filter(Boolean) as string[];

//   return (
//     <div className="min-h-screen bg-neutral-smoke">

//       {/* ── Page Header ── */}
//       <div className="bg-navy-darkest py-14 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-gold text-sm font-medium uppercase tracking-widest mb-3"
//           >
//             Our Collection
//           </motion.p>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="font-display text-4xl lg:text-5xl font-bold text-white mb-4"
//           >
//             Premium T-Shirts
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-navy-soft text-base max-w-xl mx-auto"
//           >
//             Custom printed and shipped across Europe & Middle East.
//             Minimum order: 1 piece.
//           </motion.p>
//         </div>
//       </div>

//       {/* ── Bulk discount strip ── */}
//       <div className="bg-gold py-3 px-4">
//         <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-white text-sm font-medium">
//           <span>🎉 Bulk Discounts:</span>
//           <span>10+ shirts → <strong>10% off</strong></span>
//           <span>50+ shirts → <strong>20% off</strong></span>
//           <span>100+ shirts → <strong>30% off</strong></span>
//           <Link href="/b2b" className="underline underline-offset-2 hover:no-underline">
//             B2B Quote →
//           </Link>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

//         {/* ── Search + Controls ── */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-6">

//           {/* Search */}
//           <div className="relative flex-1">
//             <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
//             <input
//               type="text"
//               placeholder="Search by name or fabric..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent text-sm text-neutral-text placeholder:text-neutral-silver"
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch('')}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-silver hover:text-navy transition-colors"
//               >
//                 <X size={14} />
//               </button>
//             )}
//           </div>

//           {/* Sort */}
//           <div className="relative">
//             <select
//               value={sort}
//               onChange={e => setSort(e.target.value)}
//               className="appearance-none pl-4 pr-10 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy text-sm text-neutral-text cursor-pointer"
//             >
//               {SORT_OPTIONS.map(o => (
//                 <option key={o.value} value={o.value}>{o.label}</option>
//               ))}
//             </select>
//             <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-silver pointer-events-none" />
//           </div>

//           {/* Filter toggle */}
//           <button
//             onClick={() => setShowFilter(f => !f)}
//             className={cn(
//               'flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-medium transition-all',
//               showFilter
//                 ? 'bg-navy text-white border-navy'
//                 : 'bg-white border-gray-200 text-neutral-text hover:border-navy'
//             )}
//           >
//             <SlidersHorizontal size={15} />
//             Filters
//             {activeFilters.length > 0 && (
//               <span className="w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center font-bold">
//                 {activeFilters.length}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* ── Filter Panel ── */}
//         <AnimatePresence>
//           {showFilter && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.25 }}
//               className="overflow-hidden mb-6"
//             >
//               <div className="bg-white rounded-3xl p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">

//                 {/* Max price */}
//                 <div>
//                   <label className="block text-sm font-semibold text-navy-darkest mb-3">
//                     Max Price: <span className="text-navy">€{maxPrice}</span>
//                   </label>
//                   <input
//                     type="range" min={5} max={25} step={0.5}
//                     value={maxPrice}
//                     onChange={e => setMaxPrice(Number(e.target.value))}
//                     className="w-full accent-navy"
//                   />
//                   <div className="flex justify-between text-xs text-neutral-silver mt-1">
//                     <span>€5</span><span>€25</span>
//                   </div>
//                 </div>

//                 {/* Reset */}
//                 <div className="flex items-end">
//                   <button
//                     onClick={() => { setCategory('All'); setMaxPrice(25); setSearch(''); }}
//                     className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-neutral-silver hover:text-navy hover:border-navy transition-all"
//                   >
//                     Reset all filters
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ── Category tabs ── */}
//         <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
//           {CATEGORIES.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setCategory(cat)}
//               className={cn(
//                 'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
//                 category === cat
//                   ? 'bg-navy-darkest text-white shadow-navy'
//                   : 'bg-white text-neutral-text border border-gray-200 hover:border-navy hover:text-navy'
//               )}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* ── Active filters ── */}
//         {activeFilters.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             {activeFilters.map(f => (
//               <span
//                 key={f}
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-soft text-navy-darkest text-xs font-medium rounded-full"
//               >
//                 {f}
//                 <button
//                   onClick={() => {
//                     if (f === category) setCategory('All');
//                     if (f.startsWith('Max')) setMaxPrice(25);
//                     if (f.startsWith('"')) setSearch('');
//                   }}
//                 >
//                   <X size={11} />
//                 </button>
//               </span>
//             ))}
//           </div>
//         )}

//         {/* ── Results count ── */}
//         <div className="flex items-center justify-between mb-6">
//           <p className="text-sm text-neutral-silver">
//             Showing <span className="font-semibold text-navy-darkest">{filtered.length}</span> products
//           </p>
//         </div>

//         {/* ── Products grid ── */}
//         <AnimatePresence mode="popLayout">
//           {filtered.length > 0 ? (
//             <motion.div
//               layout
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//             >
//               {filtered.map((p, i) => (
//                 <ProductCard key={p.id} product={p} index={i} />
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-24"
//             >
//               <div className="text-6xl mb-4">🔍</div>
//               <h3 className="font-display text-2xl font-bold text-navy-darkest mb-2">
//                 No products found
//               </h3>
//               <p className="text-neutral-silver mb-6">
//                 Try changing your filters or search term
//               </p>
//               <button
//                 onClick={() => { setSearch(''); setCategory('All'); setMaxPrice(25); }}
//                 className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-dark transition-colors"
//               >
//                 Clear Filters
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ── B2B CTA ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="mt-16 rounded-3xl bg-navy-darkest p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
//         >
//           <div className="text-center lg:text-left">
//             <h2 className="font-display text-3xl font-bold text-white mb-3">
//               Need 50+ Shirts?
//             </h2>
//             <p className="text-navy-soft max-w-md">
//               Get a custom B2B quote with bulk pricing, dedicated account manager,
//               and priority production slot.
//             </p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
//             <Link
//               href="/b2b"
//               className="px-8 py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30 text-center"
//             >
//               Get B2B Quote
//             </Link>
//             <Link
//               href="/contact"
//               className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all text-center"
//             >
//               WhatsApp Us
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }