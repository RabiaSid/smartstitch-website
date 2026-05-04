'use client';

import { useState }                from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link                        from 'next/link';
import { ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn }                      from '@/lib/utils';

import { CustomizerProgress } from '@/components/ui/CustomizerProgress/customizer-progress';
import { CustomizerPreview }  from '@/components/ui/CustomizerPreview/customizer-preview';
import {
  StepColor, StepDesign, StepText, StepSize, StepOrder,
} from '@/components/ui/CustomizerSteps/customizer-steps';
import { STEPS, calcPrice, BASE_PRICE } from '@/components/ui/CustomizerSteps/customizer-types';

// ── Page ──────────────────────────────────────────────────────────
export default function CustomizePage() {
  const [step,        setStep]       = useState(1);
  const [color,       setColor]      = useState('#1E5EFF');
  const [colorName,   setColorName]  = useState('Royal Blue');
  const [printType,   setPrintType]  = useState('front');
  const [designFile,  setDesignFile] = useState<File | null>(null);
  const [embroidery,  setEmbroidery] = useState(false);
  const [customText,  setCustomText] = useState('');
  const [textColor,   setTextColor]  = useState('#FFFFFF');
  const [textFont,    setTextFont]   = useState('DM Sans');
  const [size,        setSize]       = useState('L');
  const [quantity,    setQuantity]   = useState(1);
  const [rotating,    setRotating]   = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const pricing    = calcPrice(BASE_PRICE, quantity, printType, embroidery);
  const isLastStep = step === STEPS.length;

  const handleColorSelect = (hex: string, name: string) => { setColor(hex); setColorName(name); };
  const handleAddToCart   = () => { setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2500); };

  return (
    <div className="min-h-screen bg-neutral-smoke">

      {/* Page header */}
      <div className="bg-navy-darkest py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold text-xs font-medium uppercase tracking-widest mb-1">Live Customizer</p>
          <h1 className="font-display text-3xl font-bold text-white">Design Your T-Shirt</h1>
        </div>
      </div>

      {/* Step progress */}
      <CustomizerProgress currentStep={step} onStepClick={setStep} />

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT — 3D Preview */}
          <CustomizerPreview
            color={color}
            colorName={colorName}
            rotating={rotating}
            quantity={quantity}
            pricing={pricing}
            onToggleRotate={() => setRotating(r => !r)}
          />

          {/* RIGHT — Step panel */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {step === 1 && <StepColor selected={color} onSelect={handleColorSelect} />}
                {step === 2 && (
                  <StepDesign
                    printType={printType}   setPrintType={setPrintType}
                    designFile={designFile} setDesignFile={setDesignFile}
                    embroidery={embroidery} setEmbroidery={setEmbroidery}
                  />
                )}
                {step === 3 && (
                  <StepText
                    customText={customText} setCustomText={setCustomText}
                    textColor={textColor}   setTextColor={setTextColor}
                    textFont={textFont}     setTextFont={setTextFont}
                  />
                )}
                {step === 4 && (
                  <StepSize
                    size={size}         setSize={setSize}
                    quantity={quantity} setQuantity={setQuantity}
                  />
                )}
                {step === 5 && (
                  <StepOrder
                    color={color}           colorName={colorName}
                    size={size}             quantity={quantity}
                    printType={printType}   embroidery={embroidery}
                    customText={customText} designFile={designFile}
                    pricing={pricing}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
              {step > 1 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-neutral-text hover:border-navy hover:text-navy transition-all"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              )}

              {!isLastStep ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy hover:bg-navy-dark text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-navy text-sm"
                >
                  Next: {STEPS[step]?.label}
                  <ChevronRight size={16} />
                </button>
              ) : (
                <div className="flex-1 flex flex-col gap-3">
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all',
                      addedToCart
                        ? 'bg-emerald-500 text-white'
                        : 'bg-navy-darkest hover:bg-navy-dark text-white hover:shadow-navy'
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.span key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                          <Check size={18} /> Added to Cart!
                        </motion.span>
                      ) : (
                        <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                          <ShoppingBag size={18} /> Add to Cart — €{pricing.total.toFixed(2)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-gold text-base"
                  >
                    Proceed to Checkout →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useState, useRef, Suspense, useCallback } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import * as THREE from 'three';
// import {
//   Upload, Type, Palette, Ruler, ShoppingBag,
//   RotateCcw, ChevronRight, ChevronLeft, Check,
//   Minus, Plus, X, Info, ZoomIn, ZoomOut
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // ─────────────────────────────────────────────
// // CONSTANTS
// // ─────────────────────────────────────────────
// const SHIRT_COLORS = [
//   { name: 'White',        hex: '#FFFFFF' },
//   { name: 'Black',        hex: '#111111' },
//   { name: 'Navy',         hex: '#0A1F44' },
//   { name: 'Royal Blue',   hex: '#1E5EFF' },
//   { name: 'Sky Blue',     hex: '#5B8CFF' },
//   { name: 'Forest Green', hex: '#2D6A4F' },
//   { name: 'Red',          hex: '#C1121F' },
//   { name: 'Burgundy',     hex: '#6B1F2A' },
//   { name: 'Grey',         hex: '#6B7280' },
//   { name: 'Charcoal',     hex: '#374151' },
//   { name: 'Gold',         hex: '#D4AF37' },
//   { name: 'Beige',        hex: '#D4B896' },
// ];

// const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

// const PRINT_TYPES = [
//   { id: 'none',  label: 'No Print',    price: 0,  icon: '⬜' },
//   { id: 'front', label: 'Front Only',  price: 5,  icon: '👕' },
//   { id: 'back',  label: 'Back Only',   price: 5,  icon: '🔙' },
//   { id: 'both',  label: 'Front + Back',price: 8,  icon: '✌️' },
// ];

// const FONTS = ['DM Sans', 'Playfair Display', 'Georgia', 'Arial', 'Courier New', 'Impact'];

// const STEPS = [
//   { id: 1, label: 'Color',    icon: Palette },
//   { id: 2, label: 'Design',   icon: Upload  },
//   { id: 3, label: 'Text',     icon: Type    },
//   { id: 4, label: 'Size',     icon: Ruler   },
//   { id: 5, label: 'Order',    icon: ShoppingBag },
// ];

// // ─────────────────────────────────────────────
// // 3D SHIRT MESH
// // ─────────────────────────────────────────────
// function ShirtMesh({ color, rotating }: { color: string; rotating: boolean }) {
//   const groupRef = useRef<THREE.Group>(null!);
//   const mat      = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05 });

//   useFrame((state) => {
//     if (!groupRef.current) return;
//     if (rotating) {
//       groupRef.current.rotation.y += 0.008;
//     }
//     // gentle float
//     groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.08;
//   });

//   return (
//     <group ref={groupRef} scale={1.1}>
//       {/* Body */}
//       <mesh castShadow receiveShadow material={mat}>
//         <boxGeometry args={[2, 2.5, 0.14]} />
//       </mesh>

//       {/* Left sleeve */}
//       <mesh position={[-1.38, 0.5, 0]} rotation={[0, 0, -0.42]} material={mat} castShadow>
//         <boxGeometry args={[0.9, 0.52, 0.13]} />
//       </mesh>

//       {/* Right sleeve */}
//       <mesh position={[1.38, 0.5, 0]} rotation={[0, 0, 0.42]} material={mat} castShadow>
//         <boxGeometry args={[0.9, 0.52, 0.13]} />
//       </mesh>

//       {/* Collar */}
//       <mesh position={[0, 1.38, 0]}>
//         <cylinderGeometry args={[0.36, 0.4, 0.16, 32, 1, true]} />
//         <meshStandardMaterial color={color} roughness={0.7} side={THREE.DoubleSide} />
//       </mesh>

//       {/* Gold logo mark */}
//       <mesh position={[0, 0.4, 0.075]}>
//         <torusGeometry args={[0.18, 0.035, 16, 32]} />
//         <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
//       </mesh>

//       {/* Subtle fold lines */}
//       <mesh position={[0, -0.3, 0.072]}>
//         <boxGeometry args={[1.6, 0.012, 0.01]} />
//         <meshStandardMaterial color={color} roughness={1} transparent opacity={0.3} />
//       </mesh>
//     </group>
//   );
// }

// // ─────────────────────────────────────────────
// // 3D CANVAS SCENE
// // ─────────────────────────────────────────────
// function ShirtScene({ color, rotating }: { color: string; rotating: boolean }) {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 5.5], fov: 45 }}
//       gl={{ antialias: true, alpha: true }}
//       shadows
//     >
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
//       <pointLight position={[-3, 2, 3]} color="#D4AF37" intensity={0.5} />
//       <pointLight position={[3, -2, 2]} color="#5B8CFF" intensity={0.4} />

//       <Suspense fallback={null}>
//         <ShirtMesh color={color} rotating={rotating} />
//         <Environment preset="studio" />
//       </Suspense>

//       <OrbitControls
//         enablePan={false}
//         enableZoom={true}
//         minDistance={3}
//         maxDistance={8}
//         minPolarAngle={Math.PI / 4}
//         maxPolarAngle={Math.PI / 1.6}
//         autoRotate={false}
//       />
//     </Canvas>
//   );
// }

// // ─────────────────────────────────────────────
// // PRICE CALCULATION
// // ─────────────────────────────────────────────
// function calcPrice(basePrice: number, qty: number, printType: string, embroidery: boolean) {
//   const printCosts: Record<string, number> = { none: 0, front: 5, back: 5, both: 8 };
//   const printCost      = printCosts[printType] * qty;
//   const embroideryCost = embroidery ? 4 * qty : 0;
//   const subtotal       = (basePrice * qty) + printCost + embroideryCost;
//   const discountPct    = qty >= 100 ? 30 : qty >= 50 ? 20 : qty >= 10 ? 10 : 0;
//   const discount       = (subtotal * discountPct) / 100;
//   const shipping       = subtotal - discount > 200 ? 0 : 18;
//   const total          = subtotal - discount + shipping;

//   return { printCost, embroideryCost, subtotal, discountPct, discount, shipping, total };
// }

// // ─────────────────────────────────────────────
// // STEP COMPONENTS
// // ─────────────────────────────────────────────

// // Step 1 — Color
// function StepColor({ selected, onSelect }: { selected: string; onSelect: (hex: string, name: string) => void }) {
//   return (
//     <div>
//       <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Choose Color</h3>
//       <p className="text-neutral-silver text-sm mb-5">Click a color to apply it to your shirt instantly</p>
//       <div className="grid grid-cols-6 gap-3">
//         {SHIRT_COLORS.map(c => (
//           <button
//             key={c.hex}
//             onClick={() => onSelect(c.hex, c.name)}
//             title={c.name}
//             className="group flex flex-col items-center gap-1.5"
//           >
//             <div className={cn(
//               'w-10 h-10 rounded-full border-4 transition-all hover:scale-110',
//               selected === c.hex
//                 ? 'border-navy-darkest scale-110 shadow-lg'
//                 : 'border-transparent hover:border-gray-300'
//             )}
//               style={{
//                 backgroundColor: c.hex,
//                 boxShadow: c.hex === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined,
//               }}
//             />
//             <span className="text-xs text-neutral-silver group-hover:text-navy-darkest transition-colors leading-tight text-center">
//               {c.name}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* Custom hex input */}
//       <div className="mt-6 p-4 bg-neutral-smoke rounded-2xl">
//         <label className="text-sm font-medium text-navy-darkest block mb-2">Custom Color (Hex)</label>
//         <div className="flex gap-3 items-center">
//           <input
//             type="color"
//             value={selected}
//             onChange={e => onSelect(e.target.value, 'Custom')}
//             className="w-10 h-10 rounded-xl cursor-pointer border-2 border-gray-200"
//           />
//           <input
//             type="text"
//             value={selected}
//             onChange={e => onSelect(e.target.value, 'Custom')}
//             placeholder="#000000"
//             className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-navy"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // Step 2 — Design Upload
// function StepDesign({
//   printType, setPrintType, designFile, setDesignFile, embroidery, setEmbroidery
// }: any) {
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setDesignFile(file);
//   };

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (file) setDesignFile(file);
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Print Position</h3>
//         <p className="text-neutral-silver text-sm mb-4">Where should your design be printed?</p>
//         <div className="grid grid-cols-2 gap-3">
//           {PRINT_TYPES.map(pt => (
//             <button
//               key={pt.id}
//               onClick={() => setPrintType(pt.id)}
//               className={cn(
//                 'flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left',
//                 printType === pt.id
//                   ? 'border-navy bg-navy-soft'
//                   : 'border-gray-200 hover:border-navy-light bg-white'
//               )}
//             >
//               <span className="text-2xl">{pt.icon}</span>
//               <div>
//                 <div className="font-semibold text-navy-darkest text-sm">{pt.label}</div>
//                 <div className="text-xs text-neutral-silver">
//                   {pt.price === 0 ? 'No extra cost' : `+€${pt.price}/piece`}
//                 </div>
//               </div>
//               {printType === pt.id && <Check size={16} className="ml-auto text-navy" />}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Upload area */}
//       {printType !== 'none' && (
//         <div>
//           <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Upload Design</h3>
//           <p className="text-neutral-silver text-sm mb-4">PNG, SVG, or PDF — max 10MB</p>

//           <div
//             onDrop={handleDrop}
//             onDragOver={e => e.preventDefault()}
//             onClick={() => fileRef.current?.click()}
//             className={cn(
//               'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all',
//               designFile
//                 ? 'border-emerald-400 bg-emerald-50'
//                 : 'border-gray-300 hover:border-navy bg-neutral-smoke hover:bg-navy-soft/30'
//             )}
//           >
//             {designFile ? (
//               <div className="space-y-2">
//                 <div className="text-3xl">✅</div>
//                 <p className="font-semibold text-emerald-700 text-sm">{designFile.name}</p>
//                 <p className="text-xs text-neutral-silver">
//                   {(designFile.size / 1024).toFixed(0)} KB — Click to change
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <Upload size={28} className="mx-auto text-neutral-silver" />
//                 <div>
//                   <p className="font-semibold text-navy-darkest text-sm">Drop your file here</p>
//                   <p className="text-xs text-neutral-silver mt-1">or click to browse</p>
//                 </div>
//                 <p className="text-xs text-neutral-silver">PNG • SVG • PDF • Max 10MB</p>
//               </div>
//             )}
//             <input ref={fileRef} type="file" accept=".png,.svg,.pdf,.jpg" onChange={handleFile} className="hidden" />
//           </div>

//           {designFile && (
//             <button
//               onClick={() => setDesignFile(null)}
//               className="mt-2 text-xs text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
//             >
//               <X size={12} /> Remove file
//             </button>
//           )}
//         </div>
//       )}

//       {/* Embroidery toggle */}
//       <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl">
//         <div>
//           <div className="font-semibold text-navy-darkest text-sm">Add Embroidery Logo</div>
//           <div className="text-xs text-neutral-silver">Stitched logo — premium finish (+€4/piece)</div>
//         </div>
//         <button
//           onClick={() => setEmbroidery(!embroidery)}
//           className={cn(
//             'w-12 h-6 rounded-full transition-all relative',
//             embroidery ? 'bg-navy' : 'bg-gray-200'
//           )}
//         >
//           <div className={cn(
//             'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm',
//             embroidery ? 'left-6' : 'left-0.5'
//           )} />
//         </button>
//       </div>
//     </div>
//   );
// }

// // Step 3 — Text
// function StepText({ customText, setCustomText, textColor, setTextColor, textFont, setTextFont }: any) {
//   return (
//     <div className="space-y-5">
//       <div>
//         <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Add Custom Text</h3>
//         <p className="text-neutral-silver text-sm mb-4">Add a name, slogan, or message to your shirt</p>

//         <textarea
//           value={customText}
//           onChange={e => setCustomText(e.target.value)}
//           placeholder="e.g. SmartStitch Team 2026"
//           maxLength={50}
//           rows={3}
//           className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy text-sm resize-none placeholder:text-neutral-silver"
//         />
//         <div className="flex justify-between mt-1">
//           <span className="text-xs text-neutral-silver">Optional — leave blank for no text</span>
//           <span className="text-xs text-neutral-silver">{customText.length}/50</span>
//         </div>
//       </div>

//       {customText && (
//         <>
//           {/* Font picker */}
//           <div>
//             <label className="text-sm font-semibold text-navy-darkest block mb-3">Font Style</label>
//             <div className="grid grid-cols-2 gap-2">
//               {FONTS.map(f => (
//                 <button
//                   key={f}
//                   onClick={() => setTextFont(f)}
//                   className={cn(
//                     'px-4 py-3 rounded-xl border-2 text-sm transition-all text-left',
//                     textFont === f
//                       ? 'border-navy bg-navy-soft text-navy-darkest'
//                       : 'border-gray-200 hover:border-navy-light text-neutral-text'
//                   )}
//                   style={{ fontFamily: f }}
//                 >
//                   {f}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Text color */}
//           <div>
//             <label className="text-sm font-semibold text-navy-darkest block mb-3">Text Color</label>
//             <div className="flex gap-2 flex-wrap">
//               {['#FFFFFF','#111111','#0A1F44','#D4AF37','#1E5EFF','#C1121F','#2D6A4F'].map(c => (
//                 <button
//                   key={c}
//                   onClick={() => setTextColor(c)}
//                   className={cn(
//                     'w-9 h-9 rounded-full border-4 transition-all hover:scale-110',
//                     textColor === c ? 'border-navy-darkest scale-110' : 'border-transparent'
//                   )}
//                   style={{
//                     backgroundColor: c,
//                     boxShadow: c === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined,
//                   }}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Preview */}
//           <div className="p-5 bg-neutral-smoke rounded-2xl text-center">
//             <p className="text-xs text-neutral-silver mb-2">Text Preview</p>
//             <p
//               className="text-2xl font-semibold"
//               style={{ fontFamily: textFont, color: textColor }}
//             >
//               {customText}
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // Step 4 — Size & Quantity
// function StepSize({ size, setSize, quantity, setQuantity }: any) {
//   const SIZE_MEASUREMENTS: Record<string, string> = {
//     XS: 'Chest 32-34"', S: 'Chest 35-37"', M: 'Chest 38-40"',
//     L: 'Chest 41-43"', XL: 'Chest 44-46"', XXL: 'Chest 47-49"', XXXL: 'Chest 50-52"',
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Select Size</h3>
//         <p className="text-neutral-silver text-sm mb-4">For bulk orders with multiple sizes, contact our B2B team</p>
//         <div className="grid grid-cols-4 gap-2">
//           {SIZES.map(s => (
//             <button
//               key={s}
//               onClick={() => setSize(s)}
//               className={cn(
//                 'flex flex-col items-center py-3 px-2 rounded-2xl border-2 transition-all',
//                 size === s
//                   ? 'border-navy bg-navy text-white'
//                   : 'border-gray-200 hover:border-navy text-neutral-text hover:text-navy'
//               )}
//             >
//               <span className="font-bold text-sm">{s}</span>
//               <span className="text-xs mt-0.5 opacity-70 text-center leading-tight">
//                 {SIZE_MEASUREMENTS[s]?.split(' ')[1]}
//               </span>
//             </button>
//           ))}
//         </div>
//         {size && (
//           <p className="mt-3 text-sm text-navy flex items-center gap-1.5">
//             <Info size={14} /> {SIZE_MEASUREMENTS[size]}
//           </p>
//         )}
//       </div>

//       {/* Quantity */}
//       <div>
//         <label className="font-semibold text-navy-darkest text-sm block mb-3">Quantity</label>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
//             <button
//               onClick={() => setQuantity((q: number) => Math.max(1, q - 1))}
//               className="px-4 py-3 hover:bg-gray-50 transition-colors"
//             >
//               <Minus size={16} className="text-neutral-text" />
//             </button>
//             <input
//               type="number" min={1} value={quantity}
//               onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
//               className="w-16 text-center font-bold text-navy-darkest border-none outline-none py-3 text-base"
//             />
//             <button
//               onClick={() => setQuantity((q: number) => q + 1)}
//               className="px-4 py-3 hover:bg-gray-50 transition-colors"
//             >
//               <Plus size={16} className="text-neutral-text" />
//             </button>
//           </div>
//           <div className="text-sm text-neutral-silver">pieces</div>
//         </div>

//         {/* Quick qty buttons */}
//         <div className="flex gap-2 mt-3 flex-wrap">
//           {[1, 10, 25, 50, 100, 250].map(q => (
//             <button
//               key={q}
//               onClick={() => setQuantity(q)}
//               className={cn(
//                 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
//                 quantity === q
//                   ? 'bg-navy text-white border-navy'
//                   : 'bg-white border-gray-200 text-neutral-silver hover:border-navy hover:text-navy'
//               )}
//             >
//               {q}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Step 5 — Order Summary
// function StepOrder({
//   color, colorName, size, quantity, printType,
//   embroidery, customText, designFile, pricing
// }: any) {
//   const BASE_PRICE = 8.50;

//   return (
//     <div className="space-y-5">
//       <div>
//         <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Order Summary</h3>
//         <p className="text-neutral-silver text-sm mb-5">Review your customization before adding to cart</p>
//       </div>

//       {/* Config summary */}
//       <div className="space-y-3">
//         {[
//           { label: 'Color',    value: colorName,          dot: color },
//           { label: 'Size',     value: size },
//           { label: 'Quantity', value: `${quantity} pieces` },
//           { label: 'Print',    value: PRINT_TYPES.find(p => p.id === printType)?.label ?? 'None' },
//           { label: 'Embroidery', value: embroidery ? 'Yes (+€4/pc)' : 'No' },
//           { label: 'Text',     value: customText || 'None' },
//           { label: 'Design',   value: designFile ? designFile.name : 'None' },
//         ].map(item => (
//           <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100">
//             <span className="text-sm text-neutral-silver">{item.label}</span>
//             <div className="flex items-center gap-2">
//               {item.dot && (
//                 <div
//                   className="w-4 h-4 rounded-full border border-gray-200"
//                   style={{ backgroundColor: item.dot }}
//                 />
//               )}
//               <span className="text-sm font-semibold text-navy-darkest">{item.value}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Price breakdown */}
//       <div className="bg-navy-darkest rounded-2xl p-5 space-y-3">
//         <h4 className="font-semibold text-white text-sm mb-4">Price Breakdown</h4>

//         {[
//           { label: `Base price (${quantity} × €${BASE_PRICE})`, value: `€${(BASE_PRICE * quantity).toFixed(2)}` },
//           { label: `Print cost`, value: pricing.printCost > 0 ? `€${pricing.printCost.toFixed(2)}` : '—', hide: pricing.printCost === 0 },
//           { label: `Embroidery`, value: pricing.embroideryCost > 0 ? `€${pricing.embroideryCost.toFixed(2)}` : '—', hide: pricing.embroideryCost === 0 },
//           { label: `Subtotal`, value: `€${pricing.subtotal.toFixed(2)}`, bold: true },
//           { label: `Bulk discount (${pricing.discountPct}%)`, value: pricing.discount > 0 ? `-€${pricing.discount.toFixed(2)}` : '—', green: true, hide: pricing.discount === 0 },
//           { label: `Shipping (DHL)`, value: pricing.shipping === 0 ? 'FREE 🎉' : `€${pricing.shipping.toFixed(2)}` },
//         ].map(row => !row.hide && (
//           <div key={row.label} className="flex items-center justify-between">
//             <span className={cn('text-xs', row.bold ? 'text-white font-semibold' : 'text-navy-soft')}>{row.label}</span>
//             <span className={cn('text-xs font-semibold', row.green ? 'text-emerald-400' : row.bold ? 'text-white' : 'text-navy-soft')}>
//               {row.value}
//             </span>
//           </div>
//         ))}

//         <div className="border-t border-white/10 pt-3 flex items-center justify-between">
//           <span className="font-display font-bold text-white">TOTAL</span>
//           <span className="font-display font-bold text-gold text-2xl">€{pricing.total.toFixed(2)}</span>
//         </div>

//         {pricing.discountPct > 0 && (
//           <div className="text-center">
//             <span className="text-xs text-emerald-400">
//               🎉 You saved €{pricing.discount.toFixed(2)} with bulk discount!
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // MAIN CUSTOMIZE PAGE
// // ─────────────────────────────────────────────
// export default function CustomizePage() {
//   // State
//   const [step,        setStep]       = useState(1);
//   const [color,       setColor]      = useState('#1E5EFF');
//   const [colorName,   setColorName]  = useState('Royal Blue');
//   const [printType,   setPrintType]  = useState('front');
//   const [designFile,  setDesignFile] = useState<File | null>(null);
//   const [embroidery,  setEmbroidery] = useState(false);
//   const [customText,  setCustomText] = useState('');
//   const [textColor,   setTextColor]  = useState('#FFFFFF');
//   const [textFont,    setTextFont]   = useState('DM Sans');
//   const [size,        setSize]       = useState('L');
//   const [quantity,    setQuantity]   = useState(1);
//   const [rotating,    setRotating]   = useState(true);
//   const [addedToCart, setAddedToCart] = useState(false);

//   const BASE_PRICE = 8.50;
//   const pricing = calcPrice(BASE_PRICE, quantity, printType, embroidery);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 2500);
//   };

//   const handleColorSelect = (hex: string, name: string) => {
//     setColor(hex);
//     setColorName(name);
//   };

//   const isLastStep = step === STEPS.length;

//   return (
//     <div className="min-h-screen bg-neutral-smoke">

//       {/* ── Page header ── */}
//       <div className="bg-navy-darkest py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <p className="text-gold text-xs font-medium uppercase tracking-widest mb-1">Live Customizer</p>
//           <h1 className="font-display text-3xl font-bold text-white">Design Your T-Shirt</h1>
//         </div>
//       </div>

//       {/* ── Step progress bar ── */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center py-3 overflow-x-auto scrollbar-hide gap-1">
//             {STEPS.map((s, i) => (
//               <button
//                 key={s.id}
//                 onClick={() => setStep(s.id)}
//                 className="flex items-center gap-2 flex-shrink-0"
//               >
//                 <div className={cn(
//                   'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all',
//                   step === s.id
//                     ? 'bg-navy-darkest text-white'
//                     : step > s.id
//                       ? 'bg-emerald-100 text-emerald-700'
//                       : 'bg-gray-100 text-neutral-silver hover:bg-navy-soft hover:text-navy'
//                 )}>
//                   {step > s.id
//                     ? <Check size={13} />
//                     : <s.icon size={13} />
//                   }
//                   {s.label}
//                 </div>
//                 {i < STEPS.length - 1 && (
//                   <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Main layout ── */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//           {/* ── LEFT: 3D Preview ── */}
//           <div className="lg:sticky lg:top-28 h-fit">
//             <div className="bg-navy-darkest rounded-3xl overflow-hidden" style={{ height: 480 }}>
//               <ShirtScene color={color} rotating={rotating} />
//             </div>

//             {/* Controls */}
//             <div className="flex items-center justify-between mt-3 px-1">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setRotating(r => !r)}
//                   className={cn(
//                     'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all border',
//                     rotating
//                       ? 'bg-navy text-white border-navy'
//                       : 'bg-white text-neutral-silver border-gray-200 hover:border-navy'
//                   )}
//                 >
//                   <RotateCcw size={12} />
//                   {rotating ? 'Stop Rotation' : 'Auto Rotate'}
//                 </button>
//                 <span className="text-xs text-neutral-silver">Drag to rotate • Scroll to zoom</span>
//               </div>

//               {/* Color preview */}
//               <div className="flex items-center gap-2">
//                 <div
//                   className="w-6 h-6 rounded-full border-2 border-white shadow"
//                   style={{ backgroundColor: color }}
//                 />
//                 <span className="text-xs font-medium text-navy-darkest">{colorName}</span>
//               </div>
//             </div>

//             {/* Quick price preview */}
//             <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-neutral-silver">Estimated Total</p>
//                 <p className="font-display font-bold text-navy-darkest text-2xl">
//                   €{pricing.total.toFixed(2)}
//                 </p>
//               </div>
//               {pricing.discountPct > 0 && (
//                 <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
//                   {pricing.discountPct}% OFF
//                 </span>
//               )}
//               <div className="text-right">
//                 <p className="text-xs text-neutral-silver">Per piece</p>
//                 <p className="font-semibold text-navy text-lg">
//                   €{(pricing.total / quantity).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ── RIGHT: Step Panel ── */}
//           <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-card">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={step}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.25 }}
//               >
//                 {step === 1 && (
//                   <StepColor selected={color} onSelect={handleColorSelect} />
//                 )}
//                 {step === 2 && (
//                   <StepDesign
//                     printType={printType} setPrintType={setPrintType}
//                     designFile={designFile} setDesignFile={setDesignFile}
//                     embroidery={embroidery} setEmbroidery={setEmbroidery}
//                   />
//                 )}
//                 {step === 3 && (
//                   <StepText
//                     customText={customText} setCustomText={setCustomText}
//                     textColor={textColor} setTextColor={setTextColor}
//                     textFont={textFont} setTextFont={setTextFont}
//                   />
//                 )}
//                 {step === 4 && (
//                   <StepSize
//                     size={size} setSize={setSize}
//                     quantity={quantity} setQuantity={setQuantity}
//                   />
//                 )}
//                 {step === 5 && (
//                   <StepOrder
//                     color={color} colorName={colorName}
//                     size={size} quantity={quantity}
//                     printType={printType} embroidery={embroidery}
//                     customText={customText} designFile={designFile}
//                     pricing={pricing}
//                   />
//                 )}
//               </motion.div>
//             </AnimatePresence>

//             {/* ── Navigation buttons ── */}
//             <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
//               {step > 1 && (
//                 <button
//                   onClick={() => setStep(s => s - 1)}
//                   className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-neutral-text hover:border-navy hover:text-navy transition-all"
//                 >
//                   <ChevronLeft size={16} /> Back
//                 </button>
//               )}

//               {!isLastStep ? (
//                 <button
//                   onClick={() => setStep(s => s + 1)}
//                   className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy hover:bg-navy-dark text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-navy text-sm"
//                 >
//                   Next: {STEPS[step]?.label}
//                   <ChevronRight size={16} />
//                 </button>
//               ) : (
//                 <div className="flex-1 flex flex-col gap-3">
//                   <motion.button
//                     onClick={handleAddToCart}
//                     whileTap={{ scale: 0.97 }}
//                     className={cn(
//                       'w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all',
//                       addedToCart
//                         ? 'bg-emerald-500 text-white'
//                         : 'bg-navy-darkest hover:bg-navy-dark text-white hover:shadow-navy'
//                     )}
//                   >
//                     <AnimatePresence mode="wait">
//                       {addedToCart ? (
//                         <motion.span
//                           key="done"
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           className="flex items-center gap-2"
//                         >
//                           <Check size={18} /> Added to Cart!
//                         </motion.span>
//                       ) : (
//                         <motion.span
//                           key="add"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           className="flex items-center gap-2"
//                         >
//                           <ShoppingBag size={18} /> Add to Cart — €{pricing.total.toFixed(2)}
//                         </motion.span>
//                       )}
//                     </AnimatePresence>
//                   </motion.button>

//                   <Link
//                     href="/checkout"
//                     className="w-full flex items-center justify-center gap-2 py-4 bg-gold hover:bg-gold-dark text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-gold text-base"
//                   >
//                     Proceed to Checkout →
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }