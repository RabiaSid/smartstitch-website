'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────
interface ProductFiltersProps {
  search:        string;
  setSearch:     (v: string) => void;
  sort:          string;
  setSort:       (v: string) => void;
  category:      string;
  setCategory:   (v: string) => void;
  maxPrice:      number;
  setMaxPrice:   (v: number) => void;
  showFilter:    boolean;
  setShowFilter: (v: boolean | ((prev: boolean) => boolean)) => void;
  activeFilters: string[];
  resultCount:   number;
}

const CATEGORIES   = ['All','Basic','Premium','Sport','Streetwear','Polo','Kids','Long Sleeve'];
const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated' },
];

// ── Component ─────────────────────────────────────────────────────
export function ProductFilters({
  search, setSearch, sort, setSort,
  category, setCategory, maxPrice, setMaxPrice,
  showFilter, setShowFilter, activeFilters, resultCount,
}: ProductFiltersProps) {

  const resetAll = () => { setCategory('All'); setMaxPrice(25); setSearch(''); };

  return (
    <div>
      {/* Search + Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-silver" />
          <input
            type="text"
            placeholder="Search by name or fabric..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent text-sm text-neutral-text placeholder:text-neutral-silver"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-silver hover:text-navy transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-navy text-sm text-neutral-text cursor-pointer"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-silver pointer-events-none" />
        </div>

        <button
          onClick={() => setShowFilter(f => !f)}
          className={cn(
            'flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-medium transition-all',
            showFilter ? 'bg-navy text-white border-navy' : 'bg-white border-gray-200 text-neutral-text hover:border-navy'
          )}
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilters.length > 0 && (
            <span className="w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center font-bold">
              {activeFilters.length}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white rounded-3xl p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy-darkest mb-3">
                  Max Price: <span className="text-navy">€{maxPrice}</span>
                </label>
                <input
                  type="range" min={5} max={25} step={0.5}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-navy"
                />
                <div className="flex justify-between text-xs text-neutral-silver mt-1">
                  <span>€5</span><span>€25</span>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={resetAll}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-neutral-silver hover:text-navy hover:border-navy transition-all"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              category === cat
                ? 'bg-navy-darkest text-white shadow-navy'
                : 'bg-white text-neutral-text border border-gray-200 hover:border-navy hover:text-navy'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map(f => (
            <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-soft text-navy-darkest text-xs font-medium rounded-full">
              {f}
              <button onClick={() => {
                if (f === category) setCategory('All');
                if (f.startsWith('Max')) setMaxPrice(25);
                if (f.startsWith('"')) setSearch('');
              }}>
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Result count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-neutral-silver">
          Showing <span className="font-semibold text-navy-darkest">{resultCount}</span> products
        </p>
      </div>
    </div>
  );
}

export default ProductFilters;