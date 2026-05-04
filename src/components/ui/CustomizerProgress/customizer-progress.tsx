'use client';

import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STEPS } from '../CustomizerSteps/customizer-types';

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function CustomizerProgress({ currentStep, onStepClick }: Props) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3 overflow-x-auto scrollbar-hide gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onStepClick(s.id)}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <div className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all',
                currentStep === s.id
                  ? 'bg-navy-darkest text-white'
                  : currentStep > s.id
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-neutral-silver hover:bg-navy-soft hover:text-navy'
              )}>
                {currentStep > s.id
                  ? <Check size={13} />
                  : <s.icon size={13} />
                }
                {s.label}
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomizerProgress;