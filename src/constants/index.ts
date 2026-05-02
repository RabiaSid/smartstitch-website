export const SIZES       = ['XS','S','M','L','XL','XXL','XXXL'] as const;
export const BULK_DISCOUNTS = [
  { minQty: 10, discount: 10, label: '10+ shirts — 10% off' },
  { minQty: 50, discount: 20, label: '50+ shirts — 20% off' },
  { minQty: 100, discount: 30, label: '100+ shirts — 30% off' },
];
export const SHIRT_COLORS = [
  { name: 'White',        hex: '#FFFFFF' }, { name: 'Black',       hex: '#111111' },
  { name: 'Navy',         hex: '#0A1F44' }, { name: 'Royal Blue',  hex: '#1E5EFF' },
  { name: 'Sky Blue',     hex: '#5B8CFF' }, { name: 'Forest Green',hex: '#2D6A4F' },
  { name: 'Red',          hex: '#C1121F' }, { name: 'Burgundy',    hex: '#6B1F2A' },
  { name: 'Grey',         hex: '#6B7280' }, { name: 'Gold',        hex: '#D4AF37' },
];
export const NAV_LINKS = [
  { label: 'Shop',      href: '/products'  },
  { label: 'Customize', href: '/customize' },
  { label: 'B2B',       href: '/b2b'       },
  { label: 'About',     href: '/about'     },
];
export const ORDER_STATUSES: Record<string,{label:string;color:string}> = {
  pending:       { label: 'Pending',       color: 'silver' },
  confirmed:     { label: 'Confirmed',     color: 'blue'   },
  processing:    { label: 'Processing',    color: 'blue'   },
  printing:      { label: 'Printing',      color: 'gold'   },
  quality_check: { label: 'Quality Check', color: 'gold'   },
  packed:        { label: 'Packed',        color: 'gold'   },
  shipped:       { label: 'Shipped',       color: 'green'  },
  delivered:     { label: 'Delivered',     color: 'green'  },
  cancelled:     { label: 'Cancelled',     color: 'red'    },
  refunded:      { label: 'Refunded',      color: 'red'    },
};
