'use client';

import { useRef, useCallback } from 'react';
import { Check, Upload, X, Info, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SHIRT_COLORS, PRINT_TYPES, FONTS, SIZES, BASE_PRICE,
  type Pricing,
} from './customizer-types';

// ═══════════════════════════════════════════════
// STEP 1 — Color
// ═══════════════════════════════════════════════
interface StepColorProps {
  selected: string;
  onSelect: (hex: string, name: string) => void;
}

export function StepColor({ selected, onSelect }: StepColorProps) {
  return (
    <div>
      <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Choose Color</h3>
      <p className="text-neutral-silver text-sm mb-5">Click a color to apply it instantly</p>

      <div className="grid grid-cols-6 gap-3">
        {SHIRT_COLORS.map(c => (
          <button key={c.hex} onClick={() => onSelect(c.hex, c.name)} title={c.name} className="group flex flex-col items-center gap-1.5">
            <div
              className={cn(
                'w-10 h-10 rounded-full border-4 transition-all hover:scale-110',
                selected === c.hex ? 'border-navy-darkest scale-110 shadow-lg' : 'border-transparent hover:border-gray-300'
              )}
              style={{ backgroundColor: c.hex, boxShadow: c.hex === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined }}
            />
            <span className="text-xs text-neutral-silver group-hover:text-navy-darkest transition-colors leading-tight text-center">
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* Custom hex */}
      <div className="mt-6 p-4 bg-neutral-smoke rounded-2xl">
        <label className="text-sm font-medium text-navy-darkest block mb-2">Custom Color (Hex)</label>
        <div className="flex gap-3 items-center">
          <input
            type="color" value={selected}
            onChange={e => onSelect(e.target.value, 'Custom')}
            className="w-10 h-10 rounded-xl cursor-pointer border-2 border-gray-200"
          />
          <input
            type="text" value={selected}
            onChange={e => onSelect(e.target.value, 'Custom')}
            placeholder="#000000"
            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// STEP 2 — Design Upload
// ═══════════════════════════════════════════════
interface StepDesignProps {
  printType:     string;
  setPrintType:  (v: string) => void;
  designFile:    File | null;
  setDesignFile: (f: File | null) => void;
  embroidery:    boolean;
  setEmbroidery: (v: boolean) => void;
}

export function StepDesign({ printType, setPrintType, designFile, setDesignFile, embroidery, setEmbroidery }: StepDesignProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setDesignFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setDesignFile(file);
  }, []);

  return (
    <div className="space-y-6">
      {/* Print position */}
      <div>
        <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Print Position</h3>
        <p className="text-neutral-silver text-sm mb-4">Where should your design be printed?</p>
        <div className="grid grid-cols-2 gap-3">
          {PRINT_TYPES.map(pt => (
            <button
              key={pt.id}
              onClick={() => setPrintType(pt.id)}
              className={cn(
                'flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left',
                printType === pt.id ? 'border-navy bg-navy-soft' : 'border-gray-200 hover:border-navy-light bg-white'
              )}
            >
              <span className="text-2xl">{pt.icon}</span>
              <div>
                <div className="font-semibold text-navy-darkest text-sm">{pt.label}</div>
                <div className="text-xs text-neutral-silver">
                  {pt.price === 0 ? 'No extra cost' : `+€${pt.price}/piece`}
                </div>
              </div>
              {printType === pt.id && <Check size={16} className="ml-auto text-navy" />}
            </button>
          ))}
        </div>
      </div>

      {/* Upload area */}
      {printType !== 'none' && (
        <div>
          <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Upload Design</h3>
          <p className="text-neutral-silver text-sm mb-4">PNG, SVG, or PDF — max 10MB</p>
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className={cn(
              'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all',
              designFile
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-gray-300 hover:border-navy bg-neutral-smoke hover:bg-navy-soft/30'
            )}
          >
            {designFile ? (
              <div className="space-y-2">
                <div className="text-3xl">✅</div>
                <p className="font-semibold text-emerald-700 text-sm">{designFile.name}</p>
                <p className="text-xs text-neutral-silver">{(designFile.size / 1024).toFixed(0)} KB — Click to change</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload size={28} className="mx-auto text-neutral-silver" />
                <div>
                  <p className="font-semibold text-navy-darkest text-sm">Drop your file here</p>
                  <p className="text-xs text-neutral-silver mt-1">or click to browse</p>
                </div>
                <p className="text-xs text-neutral-silver">PNG • SVG • PDF • Max 10MB</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept=".png,.svg,.pdf,.jpg" onChange={handleFile} className="hidden" />
          </div>
          {designFile && (
            <button onClick={() => setDesignFile(null)} className="mt-2 text-xs text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
              <X size={12} /> Remove file
            </button>
          )}
        </div>
      )}

      {/* Embroidery toggle */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl">
        <div>
          <div className="font-semibold text-navy-darkest text-sm">Add Embroidery Logo</div>
          <div className="text-xs text-neutral-silver">Stitched logo — premium finish (+€4/piece)</div>
        </div>
        <button
          onClick={() => setEmbroidery(!embroidery)}
          className={cn('w-12 h-6 rounded-full transition-all relative', embroidery ? 'bg-navy' : 'bg-gray-200')}
        >
          <div className={cn('w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm', embroidery ? 'left-6' : 'left-0.5')} />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// STEP 3 — Text
// ═══════════════════════════════════════════════
interface StepTextProps {
  customText:    string;
  setCustomText: (v: string) => void;
  textColor:     string;
  setTextColor:  (v: string) => void;
  textFont:      string;
  setTextFont:   (v: string) => void;
}

export function StepText({ customText, setCustomText, textColor, setTextColor, textFont, setTextFont }: StepTextProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Add Custom Text</h3>
        <p className="text-neutral-silver text-sm mb-4">Add a name, slogan, or message</p>
        <textarea
          value={customText}
          onChange={e => setCustomText(e.target.value)}
          placeholder="e.g. SmartStitch Team 2026"
          maxLength={50}
          rows={3}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy text-sm resize-none placeholder:text-neutral-silver"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-neutral-silver">Optional — leave blank for no text</span>
          <span className="text-xs text-neutral-silver">{customText.length}/50</span>
        </div>
      </div>

      {customText && (
        <>
          {/* Font */}
          <div>
            <label className="text-sm font-semibold text-navy-darkest block mb-3">Font Style</label>
            <div className="grid grid-cols-2 gap-2">
              {FONTS.map(f => (
                <button
                  key={f}
                  onClick={() => setTextFont(f)}
                  className={cn(
                    'px-4 py-3 rounded-xl border-2 text-sm transition-all text-left',
                    textFont === f ? 'border-navy bg-navy-soft text-navy-darkest' : 'border-gray-200 hover:border-navy-light text-neutral-text'
                  )}
                  style={{ fontFamily: f }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Text color */}
          <div>
            <label className="text-sm font-semibold text-navy-darkest block mb-3">Text Color</label>
            <div className="flex gap-2 flex-wrap">
              {['#FFFFFF','#111111','#0A1F44','#D4AF37','#1E5EFF','#C1121F','#2D6A4F'].map(c => (
                <button
                  key={c}
                  onClick={() => setTextColor(c)}
                  className={cn('w-9 h-9 rounded-full border-4 transition-all hover:scale-110', textColor === c ? 'border-navy-darkest scale-110' : 'border-transparent')}
                  style={{ backgroundColor: c, boxShadow: c === '#FFFFFF' ? 'inset 0 0 0 1px #ddd' : undefined }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="p-5 bg-neutral-smoke rounded-2xl text-center">
            <p className="text-xs text-neutral-silver mb-2">Text Preview</p>
            <p className="text-2xl font-semibold" style={{ fontFamily: textFont, color: textColor }}>
              {customText}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// STEP 4 — Size & Quantity
// ═══════════════════════════════════════════════
const SIZE_MEASUREMENTS: Record<string, string> = {
  XS: 'Chest 32-34"', S: 'Chest 35-37"', M: 'Chest 38-40"',
  L: 'Chest 41-43"', XL: 'Chest 44-46"', XXL: 'Chest 47-49"', XXXL: 'Chest 50-52"',
};

interface StepSizeProps {
  size:        string;
  setSize:     (v: string) => void;
  quantity:    number;
  setQuantity: (v: number | ((prev: number) => number)) => void;
}

export function StepSize({ size, setSize, quantity, setQuantity }: StepSizeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Select Size</h3>
        <p className="text-neutral-silver text-sm mb-4">For bulk orders with multiple sizes, contact our B2B team</p>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                'flex flex-col items-center py-3 px-2 rounded-2xl border-2 transition-all',
                size === s ? 'border-navy bg-navy text-white' : 'border-gray-200 hover:border-navy text-neutral-text hover:text-navy'
              )}
            >
              <span className="font-bold text-sm">{s}</span>
              <span className="text-xs mt-0.5 opacity-70 text-center leading-tight">
                {SIZE_MEASUREMENTS[s]?.split(' ')[1]}
              </span>
            </button>
          ))}
        </div>
        {size && (
          <p className="mt-3 text-sm text-navy flex items-center gap-1.5">
            <Info size={14} /> {SIZE_MEASUREMENTS[size]}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="font-semibold text-navy-darkest text-sm block mb-3">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <Minus size={16} className="text-neutral-text" />
            </button>
            <input
              type="number" min={1} value={quantity}
              onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-16 text-center font-bold text-navy-darkest border-none outline-none py-3 text-base"
            />
            <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <Plus size={16} className="text-neutral-text" />
            </button>
          </div>
          <div className="text-sm text-neutral-silver">pieces</div>
        </div>

        {/* Quick qty */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {[1, 10, 25, 50, 100, 250].map(q => (
            <button
              key={q}
              onClick={() => setQuantity(q)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                quantity === q ? 'bg-navy text-white border-navy' : 'bg-white border-gray-200 text-neutral-silver hover:border-navy hover:text-navy'
              )}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// STEP 5 — Order Summary
// ═══════════════════════════════════════════════
interface StepOrderProps {
  color:      string;
  colorName:  string;
  size:       string;
  quantity:   number;
  printType:  string;
  embroidery: boolean;
  customText: string;
  designFile: File | null;
  pricing:    Pricing;
}

export function StepOrder({ color, colorName, size, quantity, printType, embroidery, customText, designFile, pricing }: StepOrderProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display font-semibold text-navy-darkest text-lg mb-1">Order Summary</h3>
        <p className="text-neutral-silver text-sm mb-5">Review your customization before adding to cart</p>
      </div>

      {/* Config summary */}
      <div className="space-y-3">
        {[
          { label: 'Color',      value: colorName,    dot: color },
          { label: 'Size',       value: size },
          { label: 'Quantity',   value: `${quantity} pieces` },
          { label: 'Print',      value: PRINT_TYPES.find(p => p.id === printType)?.label ?? 'None' },
          { label: 'Embroidery', value: embroidery ? 'Yes (+€4/pc)' : 'No' },
          { label: 'Text',       value: customText || 'None' },
          { label: 'Design',     value: designFile ? designFile.name : 'None' },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-neutral-silver">{item.label}</span>
            <div className="flex items-center gap-2">
              {item.dot && <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: item.dot }} />}
              <span className="text-sm font-semibold text-navy-darkest">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="bg-navy-darkest rounded-2xl p-5 space-y-3">
        <h4 className="font-semibold text-white text-sm mb-4">Price Breakdown</h4>
        {[
          { label: `Base price (${quantity} × €${BASE_PRICE})`, value: `€${(BASE_PRICE * quantity).toFixed(2)}` },
          { label: 'Print cost',  value: pricing.printCost > 0 ? `€${pricing.printCost.toFixed(2)}` : '—', hide: pricing.printCost === 0 },
          { label: 'Embroidery',  value: pricing.embroideryCost > 0 ? `€${pricing.embroideryCost.toFixed(2)}` : '—', hide: pricing.embroideryCost === 0 },
          { label: 'Subtotal',    value: `€${pricing.subtotal.toFixed(2)}`, bold: true },
          { label: `Bulk discount (${pricing.discountPct}%)`, value: `-€${pricing.discount.toFixed(2)}`, green: true, hide: pricing.discount === 0 },
          { label: 'Shipping (DHL)', value: pricing.shipping === 0 ? 'FREE 🎉' : `€${pricing.shipping.toFixed(2)}` },
        ].map(row => !row.hide && (
          <div key={row.label} className="flex items-center justify-between">
            <span className={cn('text-xs', row.bold ? 'text-white font-semibold' : 'text-navy-soft')}>{row.label}</span>
            <span className={cn('text-xs font-semibold', row.green ? 'text-emerald-400' : row.bold ? 'text-white' : 'text-navy-soft')}>{row.value}</span>
          </div>
        ))}

        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
          <span className="font-display font-bold text-white">TOTAL</span>
          <span className="font-display font-bold text-gold text-2xl">€{pricing.total.toFixed(2)}</span>
        </div>

        {pricing.discountPct > 0 && (
          <div className="text-center">
            <span className="text-xs text-emerald-400">🎉 You saved €{pricing.discount.toFixed(2)} with bulk discount!</span>
          </div>
        )}
      </div>
    </div>
  );
}