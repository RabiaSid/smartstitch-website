// Edit business facts here. Items marked CONFIRM are placeholders carried over from the old site or estimated.
export const SITE = {
  name: 'SmartStitch',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://smartstitch.online',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '', // digits only, e.g. 923001234567
  city: 'Karachi, Pakistan',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || '',
  threads: process.env.NEXT_PUBLIC_THREADS || '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || '',
  x: process.env.NEXT_PUBLIC_X || '',
};

export const FACTS = [
  { k: '10 pieces', v: 'minimum per design' },
  { k: '7–10 days', v: 'standard production (business days)' }, // CONFIRM
  { k: 'DHL Express', v: 'tracked door-to-door delivery' },
  { k: 'Free proof', v: 'digital mockup before we cut' },
];

export const TIERS = [ // CONFIRM: old site had two different discount tables; this is the b2b page version
  { qty: '10–49', off: '10%', name: 'Starter' },
  { qty: '50–99', off: '20%', name: 'Business' },
  { qty: '100–499', off: '25%', name: 'Enterprise' },
  { qty: '500+', off: '30%', name: 'Factory' },
];

export const PRODUCTS = [
  { name: 'Classic tees', note: 'Ring-spun cotton, 180 GSM', img: 'tee-duo', w: 1400, h: 934, wide: true },
  { name: 'Pima cotton', note: 'Premium 200 GSM', img: 'pima-blue', w: 800, h: 1200 },
  { name: 'Polos', note: 'Piqué, built for embroidery', img: 'polo-golf', w: 1200, h: 800 },
  { name: 'Streetwear', note: 'Heavyweight and oversized', img: 'street-charcoal', w: 800, h: 1000 },
  { name: 'Performance', note: 'Moisture-wicking blends', img: 'sport-black', w: 800, h: 1200 },
  { name: 'Long sleeve', note: 'Thermal 240 GSM', img: 'thermal', w: 800, h: 1200 },
];

export const PROCESS = [
  ['Send your brief', 'Quantity, product, fabric, decoration and destination. A sketch or logo file is enough.'],
  ['Get a quote', 'A price breakdown with your volume discount applied, within 24 hours.'], // CONFIRM
  ['Approve the proof', 'We send a digital mockup. Change it until it is right, at no charge.'],
  ['Production', 'Cut, sew and decorate in Karachi. Standard lead time is 7–10 business days.'],
  ['Quality check and ship', 'Every order is inspected, packed to your spec and sent by DHL Express with tracking.'],
];

export const BRIEF_CHECKLIST = [
  'Product type and fabric preference',
  'Quantity per style and size breakdown',
  'Logo or artwork files (vector if you have them)',
  'Print or embroidery method, colors and placement',
  'Labels, hang tags or packaging needs',
  'Delivery country and target date',
];

export type Market = {
  slug: string; name: string; short: string; currency: string; transit: string; img: string; w: number; h: number;
  intro: string; buyers: string[]; fabrics: string[]; shipping: string[]; faq: [string, string][];
};
export const MARKETS: Market[] = [
  {
    slug: 'us', name: 'United States', short: 'US', currency: 'USD', transit: '6–9 business days via DHL Express', // CONFIRM transit
    img: 'tee-duo', w: 1400, h: 934,
    intro: 'Custom T-shirts, polos and hoodies for US brands, teams and businesses, made in Karachi with a 10-piece minimum per design.',
    buyers: ['Clothing startups and private-label brands', 'Corporate merch and onboarding kits', 'Gyms, studios and sports clubs', 'Event, campus and community orders'],
    fabrics: ['180 GSM ring-spun cotton for screen print and DTG', '200 GSM Pima for premium retail lines', 'Piqué polos for embroidered uniforms'],
    shipping: ['Commercial invoice with HS code and country of origin', 'Import duty depends on classification and current US rules, so confirm the rate with your customs broker', 'We can ship to your office, warehouse or fulfillment center'],
    faq: [
      ['What is the minimum order for the US?', 'Ten pieces per design. Volume discounts start at 10 pieces and rise at 50, 100 and 500.'],
      ['How long does delivery to the US take?', 'Production is 7–10 business days, then DHL Express transit. Rush production is available on request.'],
      ['Who pays import duty?', 'Duty is set by US customs at the time of import. Tell us your delivery terms in the quote request and we will price accordingly.'],
    ],
  },
  {
    slug: 'uae', name: 'United Arab Emirates', short: 'UAE', currency: 'AED', transit: '7–8 business days via DHL Express',
    img: 'polo-golf', w: 1200, h: 800,
    intro: 'Lightweight, breathable custom apparel for UAE companies, hospitality groups and event teams, made in Karachi.',
    buyers: ['Hospitality and restaurant uniforms', 'Corporate and facilities teams', 'Events, expos and promotions', 'Retail and brand launches'],
    fabrics: ['150–180 GSM cotton for heat and humidity', 'Piqué polos for air-conditioned offices and front-of-house', 'Performance blends for gyms and outdoor crews'],
    shipping: ['Commercial invoice that can carry your TRN', 'UAE import VAT and duty are handled at customs on arrival', 'Mixed T-shirt, polo and hoodie orders ship together'],
    faq: [
      ['Which fabric suits the UAE climate?', 'Lightweight 150–180 GSM combed or ring-spun cotton breathes best. Avoid heavy polyester blends for outdoor work.'],
      ['Can you embroider logos on polos?', 'Yes. Piqué is the best surface for embroidery, and we send a digital proof first.'],
      ['How fast can you deliver?', 'Standard production is 7–10 business days plus 7–8 days transit. Ask about rush production.'],
    ],
  },
  {
    slug: 'uk', name: 'United Kingdom', short: 'UK', currency: 'GBP', transit: '5–6 business days via DHL Express',
    img: 'thermal', w: 800, h: 1200,
    intro: 'Custom apparel for UK brands, clubs and businesses, with fabric weights chosen for British seasons.',
    buyers: ['Independent labels and private-label brands', 'Pubs, cafés and hospitality teams', 'Universities, clubs and societies', 'Corporate gifting and staff wear'],
    fabrics: ['180–200 GSM cotton for spring and summer', '240 GSM cotton-blend long sleeves for autumn and winter', 'Organic cotton on request for sustainability-led brands'],
    shipping: ['Commercial invoice with HS code and origin for customs clearance', 'UK VAT and any duty are assessed on import, so confirm with your broker', 'Delivery to your address or a UK warehouse'],
    faq: [
      ['What weight should I choose for the UK?', '180–200 GSM works year-round for tees. Use 240 GSM long sleeves for colder months.'],
      ['Do you offer organic cotton?', 'Yes, on request. Tell us the certification you need when you send the brief.'],
      ['Can I order a sample first?', 'Yes. Mention it in your brief and we will quote a sample run before bulk production.'],
    ],
  },
];

export type Fabric = {
  name: string; gsm: string; mix: string; use: string; wash: string; shrink: string;
  screen: string; dtg: string; emb: string; sub: string;
};
export const FABRICS: Fabric[] = [
  { name: 'Ring-spun cotton', gsm: '180', mix: '100% cotton', use: 'Everyday tees, merch, corporate', wash: '30°C', shrink: '2–5%', screen: 'Best', dtg: 'Best', emb: 'Good', sub: 'No' },
  { name: 'Pima cotton', gsm: '200', mix: '100% Pima', use: 'Premium retail, gifts, hospitality', wash: '30°C', shrink: '1–3%', screen: 'Best', dtg: 'Best', emb: 'Best', sub: 'No' },
  { name: 'Organic cotton', gsm: '180', mix: '100% organic', use: 'Eco-led brands, kids, sensitive skin', wash: '30°C', shrink: '3–5%', screen: 'Good', dtg: 'Best', emb: 'Good', sub: 'No' },
  { name: 'Poly-cotton blend', gsm: '160', mix: '65% polyester / 35% cotton', use: 'Sports, gyms, outdoor events', wash: '40°C', shrink: '1–2%', screen: 'Good', dtg: 'Poor', emb: 'Good', sub: 'Best' },
  { name: 'Piqué cotton', gsm: '220', mix: '100% cotton', use: 'Polos, uniforms, golf', wash: '40°C', shrink: '3–5%', screen: 'Fair', dtg: 'No', emb: 'Best', sub: 'No' },
  { name: 'Cotton-blend thermal', gsm: '240', mix: '60% cotton / 40% polyester', use: 'Long sleeves, layering, winter', wash: '40°C', shrink: '2–4%', screen: 'Good', dtg: 'Fair', emb: 'Best', sub: 'No' },
];
export const FABRIC_BY_MARKET = [
  ['United States', '180 GSM ring-spun cotton for most orders. 200 GSM Pima for premium lines.'],
  ['United Arab Emirates', '150–180 GSM cotton for heat. Piqué for indoor and front-of-house polos.'],
  ['United Kingdom', '180–200 GSM for spring and summer. 240 GSM long sleeves for winter.'],
];
export const CARE: [string, string][] = [
  ['Washing', 'Wash printed tees inside out at 30°C. Embroidered pieces tolerate 40°C. Never 60°C or above.'],
  ['Drying', 'Air dry where possible. Tumble dry low only on blends and thermal fabrics.'],
  ['Shrinkage', 'Pre-shrunk cotton loses 2–5% on the first wash. Pima and blends shrink less.'],
];
export const FABRIC_FAQ: [string, string][] = [
  ['What GSM is best for T-shirts?', '150–180 GSM is light and suits summer. 180–200 GSM is the standard for everyday wear and printing. 200 GSM and above feels premium and suits colder climates.'],
  ['What is the difference between cotton and Pima?', 'Pima uses extra-long fibers, which makes the fabric smoother, stronger and more resistant to pilling and fading. It costs more and lasts longer.'],
  ['Which fabric is best for screen printing and DTG?', '100% cotton at 160–180 GSM. High-polyester blends fade with DTG and are better suited to sublimation.'],
  ['What is ring-spun cotton?', 'Cotton fibers are twisted and thinned before spinning, which gives a softer, stronger yarn than open-end cotton.'],
  ['Which fabric suits hot climates?', 'Lightweight 150–160 GSM cotton. It breathes and absorbs sweat. Avoid heavy polyester above 35°C.'],
];
export const B2B_FAQ: [string, string][] = [
  ['What is the minimum order?', 'Ten pieces per design. Discounts step up at 50, 100 and 500 pieces.'],
  ['How long does production take?', 'Standard production is 7–10 business days. Rush production of 3–5 days is available for an additional fee.'], // CONFIRM
  ['Do you provide commercial invoices?', 'Yes. Every order ships with a commercial invoice, HS codes and country of origin for customs.'],
  ['How do I pay?', 'Bank wire or card. Credit terms may be available for verified repeat customers.'], // CONFIRM
  ['Can I mix products in one order?', 'Yes. T-shirts, polos and hoodies can ship together, with the minimum applied per design.'],
];

export const HOME_FAQ: [string, string][] = [
  ['Who is SmartStitch?', 'SmartStitch is a custom apparel manufacturer in Karachi, Pakistan. We make T-shirts, polos and hoodies for brands, teams and businesses in the US, UAE and UK, starting at 10 pieces per design.'],
  ['What is the minimum order quantity?', 'Ten pieces per design. Volume discounts start at 10 pieces and step up at 50, 100 and 500 pieces.'],
  ['Do you ship to the United States?', 'Yes. The US is our main market. Orders ship by DHL Express with a commercial invoice, HS codes and country of origin for customs.'],
  ['Can I see a design proof before production?', 'Yes. We send a free digital proof for approval before anything is printed or embroidered.'],
  ['What printing and decoration methods do you offer?', 'Screen print, DTG and embroidery, depending on the design and quantity. Tell us your artwork and we will recommend the best fit.'],
];


// Portfolio / lookbook. cat: hoodies | sweatshirts | tees. Add real hoodie photos in /public/images and list them here.
// fit + deco are what we can produce (CONFIRM details with factory before publishing).
export type Look = { id: string; cat: 'hoodies' | 'sweatshirts' | 'tees'; name: string; fit: string; deco: string; img: string; w: number; h: number };
export const LOOKS: Look[] = [
  { id: '01', cat: 'tees', name: 'Essentials Graphic Tee', fit: 'Boxy fit', deco: 'Screen print', img: 'g1', w: 360, h: 520 },
  { id: '02', cat: 'hoodies', name: 'Oversized Hoodie', fit: 'Oversized, drop shoulder', deco: 'Embroidery or screen print', img: 'street-charcoal', w: 720, h: 900 },
  { id: '03', cat: 'tees', name: 'Drop Shoulder Tee', fit: 'Oversized', deco: 'Screen print, DTG', img: 'g4', w: 360, h: 520 },
  { id: '04', cat: 'sweatshirts', name: 'Crew Sweatshirt', fit: 'Relaxed', deco: 'Embroidery', img: 'thermal', w: 720, h: 1080 },
  { id: '05', cat: 'tees', name: 'Heavy Cotton Tee', fit: 'Classic', deco: 'Embroidered chest logo', img: 'g5', w: 360, h: 520 },
  { id: '06', cat: 'sweatshirts', name: 'Graphic Crew', fit: 'Oversized', deco: 'Screen print, DTG', img: 'g9', w: 360, h: 520 },
  { id: '07', cat: 'tees', name: 'Pima Premium Tee', fit: 'Regular', deco: 'Woven label, small print', img: 'pima-blue', w: 720, h: 1080 },
  { id: '08', cat: 'tees', name: 'Street Blue Tee', fit: 'Boxy', deco: 'Chest print', img: 'g10', w: 360, h: 520 },
  { id: '09', cat: 'tees', name: 'Sand Essential Tee', fit: 'Relaxed', deco: 'Tonal embroidery', img: 'street-gold', w: 720, h: 1080 },
  { id: '10', cat: 'tees', name: 'Forest Tee', fit: 'Regular', deco: 'Screen print', img: 'g2', w: 360, h: 520 },
];

export const MAKE_LIST = [
  { cat: 'Hoodies', note: 'Heavyweight fleece, oversized and boxy cuts, hood and pocket options.', tags: ['Embroidery', 'Screen print', 'Puff and tonal print'] },
  { cat: 'Sweatshirts', note: 'Crewnecks and quarter-zips with ribbed trims, made to your fit block.', tags: ['Embroidery', 'DTG', 'Woven labels'] },
  { cat: 'T-shirts', note: 'Classic to oversized in ring-spun and Pima cotton, sample to bulk.', tags: ['Screen print', 'DTG', 'Neck labels and hang tags'] },
];

// Product landing pages (/custom/[slug]). Facts below come from the site's own data; items marked CONFIRM need factory sign-off.
export type ProductPage = {
  slug: string; name: string; word: string; h1: string; title: string; intro: string; img: string; w: number; h: number;
  form: string; looks: 'hoodies' | 'sweatshirts' | 'tees' | null;
  fabrics: string[]; fits: string[]; deco: string[]; faq: [string, string][];
};
const COMMON_DECO = ['Screen print', 'DTG (direct to garment)', 'Embroidery'];
export const PRODUCT_PAGES: ProductPage[] = [
  {
    slug: 'hoodies', word: 'Hoodies', name: 'Hoodies', h1: 'Custom hoodies manufacturer', title: 'Custom hoodies manufacturer, 10-piece minimum',
    intro: 'Heavyweight, oversized and boxy hoodies cut and sewn in Karachi with your logo, label and fit. Start from 10 pieces per design with a free digital proof.',
    img: 'street-charcoal', w: 800, h: 1000, form: 'Hoodie', looks: 'hoodies',
    fabrics: ['Fleece (weight and blend confirmed on your quote)', 'Cotton-blend options'], // CONFIRM exact GSM
    fits: ['Oversized, drop shoulder', 'Boxy', 'Classic regular'], // CONFIRM
    deco: ['Embroidery', 'Screen print', 'Woven neck labels and hang tags'],
    faq: [
      ['What is the minimum order for custom hoodies?', 'Ten pieces per design. Volume discounts start at 10 pieces and step up at 50, 100 and 500.'],
      ['Can you make a hoodie from my own sample or tech pack?', 'Yes. Send a sketch, a reference garment photo or a tech pack and we will quote and propose a sample.'],
      ['Which decoration works best on a hoodie?', 'Embroidery for a premium chest logo, screen print for bold graphics. Tell us your artwork and we will recommend one.'],
      ['Do you add custom labels and hang tags?', 'Yes. Neck labels, hang tags and custom packaging can be included in the same order.'],
    ],
  },
  {
    slug: 't-shirts', word: 'T-Shirts', name: 'T-shirts', h1: 'Custom T-shirt manufacturer', title: 'Custom T-shirt manufacturer, 10-piece minimum',
    intro: 'Classic to oversized T-shirts in ring-spun and Pima cotton. Screen print, DTG or embroidery, from 10 pieces per design.',
    img: 'tee-duo', w: 1400, h: 934, form: 'Classic T-shirt', looks: 'tees',
    fabrics: ['Ring-spun cotton, 180 GSM', 'Pima cotton, 200 GSM', 'Organic cotton, 180 GSM'],
    fits: ['Classic regular', 'Boxy', 'Oversized'], // CONFIRM
    deco: [...COMMON_DECO, 'Neck labels and hang tags'],
    faq: [
      ['What is the minimum order for custom T-shirts?', 'Ten pieces per design. Larger orders get a bigger volume discount.'],
      ['Which cotton should I choose?', 'Ring-spun 180 GSM suits everyday tees and merch, Pima 200 GSM suits premium retail. See our fabric guide for the full comparison.'],
      ['Which print method is best for my design?', 'Screen print is best for bold, repeat designs. DTG is best for detailed, multi-colour artwork in small runs.'],
      ['Do you ship T-shirts to the US?', 'Yes. We ship by DHL Express with a commercial invoice and tracking.'],
    ],
  },
  {
    slug: 'sweatshirts', word: 'Sweatshirts', name: 'Sweatshirts', h1: 'Custom sweatshirt manufacturer', title: 'Custom sweatshirt manufacturer, 10-piece minimum',
    intro: 'Crewneck sweatshirts made to your fit, with embroidery, print and woven labels. Start from 10 pieces per design.',
    img: 'thermal', w: 800, h: 1200, form: 'Sweatshirt', looks: 'sweatshirts',
    fabrics: ['Cotton-blend thermal, 240 GSM', 'Fleece options (confirmed on your quote)'], // CONFIRM fleece
    fits: ['Relaxed', 'Oversized', 'Classic regular'], // CONFIRM
    deco: ['Embroidery', 'Screen print', 'DTG', 'Woven labels'],
    faq: [
      ['What is the minimum order for custom sweatshirts?', 'Ten pieces per design, with volume discounts at 50, 100 and 500 pieces.'],
      ['Can you match my fit block?', 'Yes. Share your measurements or a reference garment and we will propose a sample.'],
      ['Which decoration suits a sweatshirt?', 'Embroidery gives a premium finish on thicker fabric. Screen print works well for larger graphics.'],
      ['Do I get a proof before production?', 'Yes. A free digital mockup is sent for your approval before we cut.'],
    ],
  },
  {
    slug: 'polos', word: 'Polos', name: 'Polo shirts', h1: 'Custom polo shirt manufacturer', title: 'Custom embroidered polo shirt manufacturer',
    intro: 'Piqué polos built for embroidery, for teams, uniforms and corporate brands. Start from 10 pieces per design.',
    img: 'polo-golf', w: 1200, h: 800, form: 'Polo shirt', looks: null,
    fabrics: ['Piqué cotton, 220 GSM', 'Poly-cotton blends'],
    fits: ['Classic regular', 'Slim'], // CONFIRM
    deco: ['Embroidery (best on piqué)', 'Screen print', 'Woven labels'],
    faq: [
      ['What is the minimum order for custom polos?', 'Ten pieces per design.'],
      ['Why is piqué best for polos?', 'Piqué holds embroidery cleanly and is durable for uniforms and golf wear.'],
      ['Can you embroider our logo on a polo?', 'Yes. Send your logo (vector if possible) and we will place and proof it before production.'],
      ['Do you make team and corporate uniforms?', 'Yes. We handle size breakdowns and consistent branding across the whole order.'],
    ],
  },
];
export const REELS: { poster: string; caption: string; src?: string; ig?: string }[] = [];