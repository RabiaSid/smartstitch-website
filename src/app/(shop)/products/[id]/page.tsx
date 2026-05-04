'use client';

import { useState }                    from 'react';
import { useParams }                   from 'next/navigation';
import { ProductDetailBreadcrumb }     from '@/components/ui/ProductDetailBreadcrumb/product-detail-breadcrumb';
import { ProductDetailVisual }         from '@/components/ui/ProductDetailVisual/product-detail-visual';
import { ProductDetailInfo }           from '@/components/ui/ProductDetailInfo/product-detail-info';
import { ProductDetailTabs }           from '@/components/ui/ProductDetailTabs/product-detail-tabs';
import { PRODUCTS }                    from '@/components/ui/ProductDetailVisual/product-types';

export default function ProductDetailPage() {
  const params  = useParams();
  const id      = params?.id as string;
  const product = PRODUCTS[id] ?? PRODUCTS['1'];

  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="min-h-screen bg-neutral-smoke">

      {/* Breadcrumb */}
      <ProductDetailBreadcrumb productName={product.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Left — visual */}
          <ProductDetailVisual
            product={product}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />

          {/* Right — info, size, qty, CTA */}
          <ProductDetailInfo product={product} />
        </div>

        {/* Tabs — details + reviews */}
        <ProductDetailTabs product={product} />

      </div>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import {
//   Star, ShoppingBag, Heart, ArrowLeft,
//   Truck, Shield, RotateCcw, ChevronDown,
//   Check, Minus, Plus, Share2
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // ─────────────────────────────────────────────
// // MOCK DATA (same as products page)
// // ─────────────────────────────────────────────
// const PRODUCTS: Record<string, any> = {
//   '1': {
//     id: '1', name: 'Classic Essential Tee', category: 'Basic',
//     fabric: '100% Cotton', weight: '180 GSM',
//     basePrice: 8.50, originalPrice: 12,
//     tag: 'Best Seller', rating: 4.9, reviews: 342, moq: 1,
//     colors: [
//       { name: 'White',    hex: '#FFFFFF' },
//       { name: 'Black',    hex: '#111111' },
//       { name: 'Navy',     hex: '#0A1F44' },
//       { name: 'Grey',     hex: '#6B7280' },
//       { name: 'Sky Blue', hex: '#5B8CFF' },
//       { name: 'Red',      hex: '#C1121F'  },
//     ],
//     sizes: ['XS','S','M','L','XL','XXL'],
//     emoji: '👕',
//     description: 'Our most popular tee — soft, breathable, and perfect for everyday wear and custom printing. Made from 100% ring-spun cotton for a premium feel that lasts wash after wash.',
//     features: [
//       'Ring-spun 100% cotton — ultra soft',
//       'Pre-shrunk fabric — maintains shape',
//       'Seamless double-needle collar',
//       'Quarter-turned to eliminate center crease',
//       'Taped neck and shoulders',
//     ],
//     printOptions: ['Screen Print', 'DTG Print', 'Embroidery', 'Sublimation'],
//     inStock: true,
//     deliveryEU: '5-7 business days',
//     deliveryME: '7-10 business days',
//     reviews_list: [
//       { name: 'Marcus W.', country: '🇩🇪', rating: 5, text: 'Excellent quality, ordered 100 pieces for our company event. Very happy!', date: 'Apr 2026' },
//       { name: 'Fatima R.', country: '🇦🇪', rating: 5, text: 'Fast delivery to Dubai. The print quality is outstanding.', date: 'Mar 2026' },
//       { name: 'Sophie L.', country: '🇫🇷', rating: 4, text: 'Great fabric, true to size. Will order again.', date: 'Mar 2026' },
//     ],
//   },
//   '2': {
//     id: '2', name: 'Premium Pima Cotton', category: 'Premium',
//     fabric: '100% Pima Cotton', weight: '200 GSM',
//     basePrice: 14.00, originalPrice: 18,
//     tag: 'Premium', rating: 4.8, reviews: 198, moq: 1,
//     colors: [
//       { name: 'Royal Blue', hex: '#1E5EFF' },
//       { name: 'Gold',       hex: '#D4AF37' },
//       { name: 'Forest',     hex: '#2D6A4F' },
//       { name: 'Burgundy',   hex: '#6B1F2A' },
//     ],
//     sizes: ['S','M','L','XL','XXL','XXXL'],
//     emoji: '👔',
//     description: 'Luxury Pima cotton with an ultra-smooth finish. Ideal for high-end brand merchandise and premium corporate gifting.',
//     features: [
//       '100% Pima cotton — silky smooth',
//       'Heavier 200 GSM weight',
//       'Retail-quality finish',
//       'Perfect for embroidery',
//       'Shrink and fade resistant',
//     ],
//     printOptions: ['Embroidery', 'Screen Print', 'DTG Print'],
//     inStock: true,
//     deliveryEU: '5-7 business days',
//     deliveryME: '7-10 business days',
//     reviews_list: [
//       { name: 'Ahmed K.', country: '🇸🇦', rating: 5, text: 'Premium quality as described. Perfect for our brand.', date: 'Apr 2026' },
//       { name: 'Clara M.', country: '🇳🇱', rating: 5, text: 'Feels incredible, our clients loved it.', date: 'Mar 2026' },
//     ],
//   },
//   '3': {
//     id: '3', name: 'Sport Performance', category: 'Sport',
//     fabric: 'Polyester Blend', weight: '160 GSM',
//     basePrice: 11.00, originalPrice: null,
//     tag: 'New', rating: 4.7, reviews: 87, moq: 10,
//     colors: [
//       { name: 'Black', hex: '#111111' },
//       { name: 'Red',   hex: '#C1121F' },
//       { name: 'Navy',  hex: '#0A1F44' },
//       { name: 'Sky',   hex: '#5B8CFF' },
//     ],
//     sizes: ['XS','S','M','L','XL','XXL'],
//     emoji: '🎽',
//     description: 'Moisture-wicking performance fabric. Perfect for sports teams, gyms, and corporate wellness events.',
//     features: [
//       'Moisture-wicking polyester blend',
//       'Lightweight 160 GSM',
//       'UV protection UPF 30+',
//       'Anti-odor treatment',
//       'Quick-dry technology',
//     ],
//     printOptions: ['Sublimation', 'Screen Print'],
//     inStock: true,
//     deliveryEU: '5-7 business days',
//     deliveryME: '7-10 business days',
//     reviews_list: [
//       { name: 'Lars B.', country: '🇸🇪', rating: 5, text: 'Our football team loves these. Great quality.', date: 'Apr 2026' },
//     ],
//   },
// };

// // Bulk discount tiers
// const BULK_TIERS = [
//   { min: 1,   max: 9,   discount: 0,  label: '1-9 pcs'   },
//   { min: 10,  max: 49,  discount: 10, label: '10-49 pcs'  },
//   { min: 50,  max: 99,  discount: 20, label: '50-99 pcs'  },
//   { min: 100, max: 999, discount: 30, label: '100+ pcs'   },
// ];

// function getDiscount(qty: number) {
//   return BULK_TIERS.find(t => qty >= t.min && qty <= t.max)?.discount ?? 0;
// }

// // ─────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────
// export default function ProductDetailPage() {
//   const params  = useParams();
//   const id      = params?.id as string;
//   const product = PRODUCTS[id] ?? PRODUCTS['1'];

//   const [selectedColor, setSelectedColor] = useState(0);
//   const [selectedSize,  setSelectedSize]  = useState('M');
//   const [quantity,      setQuantity]      = useState(1);
//   const [wishlisted,    setWishlisted]    = useState(false);
//   const [activeTab,     setActiveTab]     = useState<'details'|'reviews'>('details');
//   const [hovered3D,     setHovered3D]     = useState(false);
//   const [addedToCart,   setAddedToCart]   = useState(false);

//   const discount     = getDiscount(quantity);
//   const unitPrice    = product.basePrice * (1 - discount / 100);
//   const totalPrice   = unitPrice * quantity;
//   const savings      = (product.basePrice - unitPrice) * quantity;
//   const bgHex        = product.colors[selectedColor]?.hex ?? '#DCE7FF';

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-smoke">

//       {/* ── Breadcrumb ── */}
//       <div className="bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-2 text-sm text-neutral-silver">
//             <Link href="/" className="hover:text-navy transition-colors">Home</Link>
//             <span>/</span>
//             <Link href="/products" className="hover:text-navy transition-colors">Products</Link>
//             <span>/</span>
//             <span className="text-navy-darkest font-medium">{product.name}</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

//         {/* ── Back button ── */}
//         <Link
//           href="/products"
//           className="inline-flex items-center gap-2 text-sm text-neutral-silver hover:text-navy transition-colors mb-8 group"
//         >
//           <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
//           Back to Products
//         </Link>

//         {/* ── Main Grid ── */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

//           {/* ── LEFT: Product Visual ── */}
//           <div className="space-y-4">

//             {/* Main 3D-like display */}
//             <motion.div
//               className="relative rounded-3xl overflow-hidden h-96 lg:h-[500px] flex items-center justify-center cursor-pointer"
//               style={{
//                 background: `linear-gradient(135deg, ${bgHex}20 0%, ${bgHex}45 50%, ${bgHex}25 100%)`,
//               }}
//               onHoverStart={() => setHovered3D(true)}
//               onHoverEnd={() => setHovered3D(false)}
//             >
//               {/* Decorative rings */}
//               <div
//                 className="absolute inset-8 rounded-full border-2 opacity-10 transition-colors duration-500"
//                 style={{ borderColor: bgHex }}
//               />
//               <div
//                 className="absolute inset-16 rounded-full border opacity-5 transition-colors duration-500"
//                 style={{ borderColor: bgHex }}
//               />

//               {/* Emoji shirt — animated */}
//               <motion.div
//                 className="text-[160px] lg:text-[200px] select-none"
//                 animate={hovered3D
//                   ? { scale: 1.1, rotate: [-3, 3, -2, 0], y: -10 }
//                   : { scale: 1,   rotate: 0,              y: 0    }
//                 }
//                 transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
//               >
//                 {product.emoji}
//               </motion.div>

//               {/* Tag */}
//               {product.tag && (
//                 <div className="absolute top-5 left-5 px-3 py-1.5 bg-gold text-white text-xs font-bold rounded-full">
//                   {product.tag}
//                 </div>
//               )}

//               {/* Share + Wishlist */}
//               <div className="absolute top-5 right-5 flex gap-2">
//                 <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform text-neutral-silver hover:text-navy">
//                   <Share2 size={15} />
//                 </button>
//                 <button
//                   onClick={() => setWishlisted(w => !w)}
//                   className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
//                 >
//                   <Heart size={15} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-silver'} />
//                 </button>
//               </div>

//               {/* Color name label */}
//               <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-navy-darkest">
//                 {product.colors[selectedColor]?.name}
//               </div>
//             </motion.div>

//             {/* Color swatches */}
//             <div className="flex items-center gap-3 flex-wrap">
//               {product.colors.map((c: any, i: number) => (
//                 <button
//                   key={c.hex}
//                   onClick={() => setSelectedColor(i)}
//                   title={c.name}
//                   className={cn(
//                     'w-9 h-9 rounded-full border-4 transition-all hover:scale-110',
//                     selectedColor === i
//                       ? 'border-navy-darkest scale-110 shadow-lg'
//                       : 'border-transparent hover:border-gray-300'
//                   )}
//                   style={{
//                     backgroundColor: c.hex,
//                     boxShadow: c.hex === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined,
//                   }}
//                 />
//               ))}
//               <span className="text-xs text-neutral-silver ml-1">
//                 {product.colors.length} colors available
//               </span>
//             </div>

//             {/* Fabric + weight badges */}
//             <div className="flex gap-3">
//               <span className="px-3 py-1.5 bg-navy-soft text-navy-darkest text-xs font-medium rounded-full">
//                 {product.fabric}
//               </span>
//               <span className="px-3 py-1.5 bg-gold-cream text-gold-dark text-xs font-medium rounded-full">
//                 {product.weight}
//               </span>
//               <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
//                 ✓ {product.inStock ? 'In Stock' : 'Out of Stock'}
//               </span>
//             </div>
//           </div>

//           {/* ── RIGHT: Product Info ── */}
//           <div className="space-y-6">

//             {/* Name + rating */}
//             <div>
//               <p className="text-navy font-semibold text-sm uppercase tracking-wider mb-2">
//                 {product.category}
//               </p>
//               <h1 className="font-display text-3xl lg:text-4xl font-bold text-navy-darkest mb-3 leading-tight">
//                 {product.name}
//               </h1>
//               <div className="flex items-center gap-3">
//                 <div className="flex gap-0.5">
//                   {Array(5).fill(0).map((_: any, i: number) => (
//                     <Star
//                       key={i} size={16}
//                       className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'}
//                     />
//                   ))}
//                 </div>
//                 <span className="font-semibold text-navy-darkest">{product.rating}</span>
//                 <span className="text-neutral-silver text-sm">({product.reviews} reviews)</span>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="p-5 bg-white rounded-2xl border border-gray-100">
//               <div className="flex items-end gap-3 mb-2">
//                 <span className="font-display text-4xl font-bold text-navy-darkest">
//                   €{unitPrice.toFixed(2)}
//                 </span>
//                 {product.originalPrice && (
//                   <span className="text-neutral-silver text-lg line-through mb-1">
//                     €{product.originalPrice}
//                   </span>
//                 )}
//                 <span className="text-sm text-neutral-silver mb-1">/ piece</span>
//               </div>

//               {discount > 0 && (
//                 <div className="flex items-center gap-2">
//                   <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
//                     {discount}% BULK DISCOUNT
//                   </span>
//                   <span className="text-emerald-600 text-sm font-medium">
//                     Save €{savings.toFixed(2)} total
//                   </span>
//                 </div>
//               )}

//               <p className="text-xs text-neutral-silver mt-2">
//                 {product.moq > 1 ? `Minimum order: ${product.moq} pieces` : 'No minimum order'}
//               </p>
//             </div>

//             {/* Size selector */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="font-semibold text-navy-darkest text-sm">Select Size</label>
//                 <button className="text-xs text-navy underline underline-offset-2">Size Guide</button>
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {product.sizes.map((size: string) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={cn(
//                       'px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all',
//                       selectedSize === size
//                         ? 'border-navy-darkest bg-navy-darkest text-white'
//                         : 'border-gray-200 text-neutral-text hover:border-navy hover:text-navy'
//                     )}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity */}
//             <div>
//               <label className="font-semibold text-navy-darkest text-sm block mb-3">
//                 Quantity
//               </label>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
//                   <button
//                     onClick={() => setQuantity(q => Math.max(product.moq, q - 1))}
//                     className="px-4 py-3 hover:bg-gray-50 transition-colors text-neutral-text"
//                   >
//                     <Minus size={16} />
//                   </button>
//                   <input
//                     type="number"
//                     value={quantity}
//                     onChange={e => setQuantity(Math.max(product.moq, Number(e.target.value)))}
//                     className="w-16 text-center font-semibold text-navy-darkest border-none outline-none py-3 text-sm"
//                   />
//                   <button
//                     onClick={() => setQuantity(q => q + 1)}
//                     className="px-4 py-3 hover:bg-gray-50 transition-colors text-neutral-text"
//                   >
//                     <Plus size={16} />
//                   </button>
//                 </div>

//                 {/* Total */}
//                 <div className="flex-1 p-3 bg-navy-soft rounded-xl text-center">
//                   <div className="text-xs text-navy-dark mb-0.5">Total</div>
//                   <div className="font-display font-bold text-navy-darkest text-xl">
//                     €{totalPrice.toFixed(2)}
//                   </div>
//                 </div>
//               </div>

//               {/* Bulk discount tiers */}
//               <div className="flex gap-2 mt-3 flex-wrap">
//                 {BULK_TIERS.map(tier => (
//                   <button
//                     key={tier.label}
//                     onClick={() => setQuantity(tier.min)}
//                     className={cn(
//                       'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
//                       quantity >= tier.min && quantity <= tier.max
//                         ? 'bg-navy-darkest text-white border-navy-darkest'
//                         : 'bg-white border-gray-200 text-neutral-silver hover:border-navy hover:text-navy'
//                     )}
//                   >
//                     {tier.label}
//                     {tier.discount > 0 && (
//                       <span className="ml-1 text-gold font-bold">-{tier.discount}%</span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Action buttons */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <motion.button
//                 onClick={handleAddToCart}
//                 whileTap={{ scale: 0.97 }}
//                 className={cn(
//                   'flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all',
//                   addedToCart
//                     ? 'bg-emerald-500 text-white'
//                     : 'bg-navy-darkest hover:bg-navy-dark text-white hover:-translate-y-0.5 hover:shadow-navy'
//                 )}
//               >
//                 <AnimatePresence mode="wait">
//                   {addedToCart ? (
//                     <motion.span
//                       key="added"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center gap-2"
//                     >
//                       <Check size={18} /> Added to Cart!
//                     </motion.span>
//                   ) : (
//                     <motion.span
//                       key="add"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="flex items-center gap-2"
//                     >
//                       <ShoppingBag size={18} /> Add to Cart
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </motion.button>

//               <Link
//                 href={`/customize?product=${product.id}`}
//                 className="flex-1 flex items-center justify-center gap-2 py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-gold text-base"
//               >
//                 🎨 Customize
//               </Link>
//             </div>

//             {/* Trust badges */}
//             <div className="grid grid-cols-3 gap-3 pt-2">
//               {[
//                 { icon: Truck,      text: `EU: ${product.deliveryEU}` },
//                 { icon: Shield,     text: 'Quality Guaranteed' },
//                 { icon: RotateCcw,  text: 'Easy Returns' },
//               ].map(({ icon: Icon, text }) => (
//                 <div
//                   key={text}
//                   className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-gray-100 text-center"
//                 >
//                   <Icon size={18} className="text-navy" />
//                   <span className="text-xs text-neutral-silver leading-tight">{text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Tabs: Details + Reviews ── */}
//         <div className="bg-white rounded-3xl overflow-hidden shadow-card">

//           {/* Tab headers */}
//           <div className="flex border-b border-gray-100">
//             {(['details', 'reviews'] as const).map(tab => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={cn(
//                   'flex-1 py-4 text-sm font-semibold capitalize transition-all',
//                   activeTab === tab
//                     ? 'text-navy-darkest border-b-2 border-navy-darkest'
//                     : 'text-neutral-silver hover:text-navy'
//                 )}
//               >
//                 {tab === 'reviews' ? `Reviews (${product.reviews})` : 'Product Details'}
//               </button>
//             ))}
//           </div>

//           <div className="p-8">
//             <AnimatePresence mode="wait">

//               {/* Details tab */}
//               {activeTab === 'details' && (
//                 <motion.div
//                   key="details"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="grid grid-cols-1 md:grid-cols-2 gap-10"
//                 >
//                   <div>
//                     <h3 className="font-display font-semibold text-navy-darkest text-lg mb-4">
//                       Description
//                     </h3>
//                     <p className="text-neutral-text text-sm leading-relaxed mb-6">
//                       {product.description}
//                     </p>
//                     <h3 className="font-display font-semibold text-navy-darkest text-lg mb-4">
//                       Features
//                     </h3>
//                     <ul className="space-y-2.5">
//                       {product.features.map((f: string) => (
//                         <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-text">
//                           <Check size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
//                           {f}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div>
//                     <h3 className="font-display font-semibold text-navy-darkest text-lg mb-4">
//                       Print Options
//                     </h3>
//                     <div className="flex flex-wrap gap-2 mb-8">
//                       {product.printOptions.map((p: string) => (
//                         <span
//                           key={p}
//                           className="px-3 py-2 bg-navy-soft text-navy-darkest text-xs font-medium rounded-xl"
//                         >
//                           {p}
//                         </span>
//                       ))}
//                     </div>

//                     <h3 className="font-display font-semibold text-navy-darkest text-lg mb-4">
//                       Delivery Times
//                     </h3>
//                     <div className="space-y-3">
//                       {[
//                         { region: '🇪🇺 Europe',       time: product.deliveryEU },
//                         { region: '🇦🇪 Middle East',  time: product.deliveryME },
//                       ].map(d => (
//                         <div
//                           key={d.region}
//                           className="flex items-center justify-between p-3 bg-neutral-smoke rounded-xl"
//                         >
//                           <span className="text-sm font-medium text-navy-darkest">{d.region}</span>
//                           <span className="text-sm text-neutral-silver">{d.time}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Reviews tab */}
//               {activeTab === 'reviews' && (
//                 <motion.div
//                   key="reviews"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="space-y-6"
//                 >
//                   {/* Rating summary */}
//                   <div className="flex items-center gap-6 p-6 bg-neutral-smoke rounded-2xl mb-8">
//                     <div className="text-center">
//                       <div className="font-display text-6xl font-bold text-navy-darkest">
//                         {product.rating}
//                       </div>
//                       <div className="flex gap-0.5 justify-center mt-1">
//                         {Array(5).fill(0).map((_: any, i: number) => (
//                           <Star key={i} size={16} className="fill-gold text-gold" />
//                         ))}
//                       </div>
//                       <div className="text-xs text-neutral-silver mt-1">
//                         {product.reviews} reviews
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       {[5,4,3,2,1].map(stars => (
//                         <div key={stars} className="flex items-center gap-2 mb-1.5">
//                           <span className="text-xs text-neutral-silver w-4">{stars}</span>
//                           <Star size={10} className="fill-gold text-gold" />
//                           <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <div
//                               className="h-full bg-gold rounded-full"
//                               style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : '5%' }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Review list */}
//                   {product.reviews_list.map((r: any, i: number) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, y: 15 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.1 }}
//                       className="p-5 border border-gray-100 rounded-2xl"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-navy-darkest flex items-center justify-center text-white text-sm font-bold">
//                             {r.name[0]}
//                           </div>
//                           <div>
//                             <div className="font-semibold text-navy-darkest text-sm">
//                               {r.name} {r.country}
//                             </div>
//                             <div className="flex gap-0.5 mt-0.5">
//                               {Array(r.rating).fill(0).map((_: any, i: number) => (
//                                 <Star key={i} size={11} className="fill-gold text-gold" />
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                         <span className="text-xs text-neutral-silver">{r.date}</span>
//                       </div>
//                       <p className="text-sm text-neutral-text leading-relaxed">{r.text}</p>
//                       <span className="inline-flex items-center gap-1 mt-3 text-xs text-emerald-600 font-medium">
//                         <Check size={11} /> Verified Purchase
//                       </span>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }