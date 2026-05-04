'use client';

import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShirtScene } from '../CustomizerScene/customizer-scene';
import type { Pricing } from '../CustomizerSteps/customizer-types';

// ── Types ─────────────────────────────────────────────────────────
interface Props {
  color:          string;
  colorName:      string;
  rotating:       boolean;
  quantity:       number;
  pricing:        Pricing;
  onToggleRotate: () => void;
}

// ── Component ─────────────────────────────────────────────────────
export function CustomizerPreview({
  color,
  colorName,
  rotating,
  quantity,
  pricing,
  onToggleRotate,
}: Props) {
  const perPiece = (pricing.total / quantity).toFixed(2);

  return (
    <div className="lg:sticky lg:top-28 h-fit space-y-3">

      {/* ── 3D Canvas ── */}
      <div
        className="w-full rounded-3xl overflow-hidden bg-navy-darkest"
        style={{ height: 480 }}
      >
        <ShirtScene color={color} rotating={rotating} />
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between px-1">

        {/* Left: rotate toggle + hint */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleRotate}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all',
              rotating
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-neutral-silver border-gray-200 hover:border-navy hover:text-navy'
            )}
          >
            <RotateCcw size={12} />
            {rotating ? 'Stop Rotation' : 'Auto Rotate'}
          </button>

          <span className="text-xs text-neutral-silver hidden sm:block">
            Drag to rotate • Scroll to zoom
          </span>
        </div>

        {/* Right: active color swatch */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full border-2 border-white shadow-md flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-medium text-navy-darkest">{colorName}</span>
        </div>
      </div>

      {/* ── Price Preview ── */}
      <div className="p-4 bg-white rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between gap-4">

          {/* Total */}
          <div>
            <p className="text-xs text-neutral-silver mb-0.5">Estimated Total</p>
            <p className="font-display font-bold text-navy-darkest text-2xl leading-none">
              €{pricing.total.toFixed(2)}
            </p>
          </div>

          {/* Discount badge — only if applicable */}
          {pricing.discountPct > 0 && (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full whitespace-nowrap">
              {pricing.discountPct}% OFF
            </span>
          )}

          {/* Per piece */}
          <div className="text-right">
            <p className="text-xs text-neutral-silver mb-0.5">Per piece</p>
            <p className="font-semibold text-navy text-lg leading-none">
              €{perPiece}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default CustomizerPreview;