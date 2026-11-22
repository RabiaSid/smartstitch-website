export type Guide = {
  slug: string; title: string; word: string; desc: string; date: string; read: string;
  lead: string; sections: { h: string; p: string[]; list?: string[] }[];
  faq: [string, string][];
};

export const GUIDES: Guide[] = [
  {
    slug: 'how-to-order-custom-apparel-wholesale',
    title: 'How to order custom apparel wholesale: step by step',
    word: 'ORDER', date: '2026-11-21', read: '5 min',
    desc: 'A clear walkthrough of ordering custom T-shirts, polos and hoodies in bulk: what to prepare, how proofs and samples work, and what to expect until delivery.',
    lead: 'Ordering custom apparel in bulk is simple once you know the order of steps. Here is what to prepare, what a good manufacturer will ask you, and where orders usually slow down.',
    sections: [
      { h: '1. Decide the product and the quantity', p: ['Start with what you need: T-shirts, polos, hoodies or sweatshirts, and roughly how many pieces per design. Most small brands, teams and businesses begin with a first run, then reorder the sizes and colors that sell.', 'At SmartStitch, samples are available from one piece and bulk orders start at 50 pieces per design, so you can test a design before committing to a larger run.'] },
      { h: '2. Prepare your artwork', p: ['Send your logo as a vector file (AI, EPS, SVG or a clean PDF) if you have one. A high-resolution PNG also works for most print jobs. For embroidery the factory converts your artwork into a stitch file, so a clear, simple logo gives the best result.'], list: ['Logo files in vector or high-resolution PNG', 'Pantone or exact color references if brand colors matter', 'Placement: chest, back, sleeve, neck label', 'Size of the print or embroidery in centimeters or inches'] },
      { h: '3. Choose fabric and decoration method', p: ['Fabric weight, fiber and decoration method work together. Embroidery suits piqué polos and heavier fabrics. Screen print is cost-effective on cotton at higher quantities. Our fabric guide compares each option.'] },
      { h: '4. Approve a digital proof', p: ['Before anything is cut, you should see a digital proof showing the design on the garment with size and placement. Check spelling, colors and position. Changes at this stage are quick and cheap; changes after production starts are not.'] },
      { h: '5. Sample first if the order matters', p: ['If this is your first order with any factory, a sample piece lets you check fabric feel, fit and decoration quality in your hands. It adds some time, but it is the cheapest way to avoid a wrong bulk order.'] },
      { h: '6. Production, quality check and shipping', p: ['The order is cut, sewn, decorated, checked and packed. Ask how quality is checked and how pieces are packed, for example per size and per style, so receiving is easy at your end.', 'Air freight is the usual route for first orders to the US, UAE and UK because it is fast. Sea freight suits larger orders.'] },
    ],
    faq: [
      ['What is a typical minimum order for custom apparel?', 'It depends on the factory. Many bulk manufacturers ask for hundreds of pieces. SmartStitch makes paid samples from one piece and bulk orders from 50 pieces per design.'],
      ['Do I need a design ready before I ask for a quote?', 'No. A rough idea, a logo and the quantity are enough to get a quote. We can send a digital proof before we cut.'],
    ],
  },
  {
    slug: 'embroidery-vs-screen-printing',
    title: 'Embroidery vs screen printing: which is right for your order?',
    word: 'STITCH', date: '2026-11-21', read: '4 min',
    desc: 'Embroidery or screen print? Compare look, durability, cost behavior and the garments each method suits best, so you can pick the right one for your logo.',
    lead: 'Both methods put your logo on a garment, but they behave very differently. This guide helps you choose based on the garment, the design and the quantity.',
    sections: [
      { h: 'Embroidery: raised, premium, durable', p: ['Embroidery stitches your design into the fabric with thread. It looks premium, holds up to many washes and adds texture. It works best on polos, caps, jackets, hoodies and heavier fabrics.', 'Very fine detail, tiny text and photo-like gradients do not stitch well. Simple logos, monograms and bold shapes look best.'] },
      { h: 'Screen printing: flat, bold, cost-effective in volume', p: ['Screen printing pushes ink through a mesh onto the fabric, one color at a time. It gives strong, solid colors and is very cost-effective once you order more pieces of the same design.', 'Each color adds a screen, so designs with many colors cost more. It suits T-shirts, hoodies and large chest or back prints.'] },
      { h: 'Quick comparison', p: [], list: ['Look and feel: embroidery is raised and textured; screen print is flat and smooth.', 'Best garments: embroidery on polos, hoodies, caps; screen print on T-shirts and hoodies.', 'Fine detail: screen print handles it better than embroidery.', 'Many colors: embroidery handles it more easily; screen print costs more per extra color.', 'Durability: both last well when the garment is washed as directed.'] },
      { h: 'How to decide', p: ['Choose embroidery for a small chest logo on polos or hoodies when you want a premium, corporate look. Choose screen print for large graphics, bold artwork and bigger quantities. If you are unsure, send us your logo and we will recommend one with a free digital proof.'] },
    ],
    faq: [
      ['Can I use both on one garment?', 'Yes. A common combination is an embroidered chest logo with a screen-printed back graphic.'],
      ['Which method lasts longer?', 'Both are durable when washed as directed. Embroidery tends to keep its look on heavier garments over time.'],
    ],
  },
  {
    slug: 'what-is-gsm-fabric-weight',
    title: 'What is GSM? How to choose fabric weight for T-shirts and hoodies',
    word: 'GSM', date: '2026-11-21', read: '4 min',
    desc: 'GSM is fabric weight in grams per square meter. Learn what it means for feel, warmth and print quality, and how to choose it for T-shirts, polos and hoodies.',
    lead: 'GSM is the number on every fabric spec sheet. It is easy to understand, and it changes how a garment feels, wears and prints.',
    sections: [
      { h: 'What GSM means', p: ['GSM stands for grams per square meter. It measures how heavy the fabric is. A higher GSM means a heavier, thicker fabric. A lower GSM means a lighter, thinner one.', 'GSM is not a quality score by itself. A good lightweight fabric can beat a poor heavy one, so check fiber and knit too.'] },
      { h: 'Typical ranges by garment', p: ['These are common industry ranges, not fixed rules. Exact weights vary by fabric and factory, so confirm the spec before you order.'], list: ['Lightweight T-shirts: roughly 140 to 160 GSM, cool and breathable', 'Standard T-shirts: roughly 160 to 200 GSM, the everyday sweet spot', 'Heavyweight T-shirts: roughly 200 GSM and above, structured and durable', 'Hoodies and sweatshirts: fleece fabrics are typically heavier, often in the 250 to 400 GSM range'] },
      { h: 'GSM and climate', p: ['Hot climates such as the UAE favor lighter, breathable fabrics. Cooler markets such as the UK and much of the US lean toward heavier fabrics and fleece for hoodies and sweatshirts.'] },
      { h: 'GSM and decoration', p: ['Heavier fabrics hold embroidery and large prints better because they are more stable. Very light fabrics can pucker under dense embroidery.'] },
    ],
    faq: [
      ['Is a higher GSM always better?', 'No. It depends on the use and climate. Heavier feels premium and warmer, lighter is cooler and more breathable.'],
      ['How do I confirm the GSM of my order?', 'Ask for the fabric spec in writing before you approve the order, and check it against a sample piece.'],
    ],
  },
  {
    slug: 'tech-pack-for-custom-apparel',
    title: 'Do you need a tech pack for custom apparel?',
    word: 'BRIEF', date: '2026-11-21', read: '4 min',
    desc: 'What a tech pack is, what goes in it, and when a small brand can start with a simple brief instead. A practical guide for first-time apparel buyers.',
    lead: 'A tech pack is the instruction sheet a factory follows. It sounds technical, but a simple version is enough to get most first orders right.',
    sections: [
      { h: 'What a tech pack is', p: ['A tech pack is a document that describes exactly how a garment should be made: the design, measurements, fabric, colors, stitching, labels and decoration. It removes guesswork so the factory and you agree on the same product.'] },
      { h: 'What goes in it', p: [], list: ['Front, back and side drawings or reference photos', 'Size chart and key measurements', 'Fabric type and weight', 'Color references such as Pantone numbers', 'Decoration details: method, size, placement', 'Labels, packaging and folding instructions'] },
      { h: 'When a simple brief is enough', p: ['For a logo on a standard T-shirt, polo or hoodie you do not need a full tech pack. A short brief with product, fabric, colors, sizes, logo files and placement is enough, and we turn it into a digital proof.', 'A full tech pack matters when you design a new cut or pattern, or when you plan repeat orders where every batch must match.'] },
      { h: 'Our recommendation', p: ['Start with a simple brief and a sample. Once you know what sells, write a proper tech pack from the approved sample so future orders stay consistent.'] },
    ],
    faq: [
      ['Can SmartStitch help me prepare one?', 'Send what you have, even a photo or a sketch. We will reply with what is missing and prepare a digital proof.'],
      ['Is a tech pack required for a small order?', 'No. A clear brief with logo files and placement is enough for small runs.'],
    ],
  },
  {
    slug: 'shipping-custom-apparel-from-pakistan',
    title: 'Shipping custom apparel from Pakistan to the US, UAE and UK',
    word: 'SHIP', date: '2026-11-21', read: '5 min',
    desc: 'What to know before shipping custom apparel from Karachi to the US, UAE or UK: courier options, customs paperwork, who pays duties and how to avoid delays.',
    lead: 'Shipping is where first-time importers worry most. The basics are straightforward: pick a courier, prepare accurate paperwork and agree who pays duties.',
    sections: [
      { h: 'Courier for small and first orders', p: ['For small and first orders, express air courier is the usual choice. It is fast, gives tracking and handles customs clearance steps. Larger orders can go by air or sea freight, which is cheaper per piece but slower. We ship by air and sea freight to the US, UAE and UK.'] },
      { h: 'Customs paperwork', p: ['Every shipment needs an accurate commercial invoice with the product description, quantity, fiber content and value. Wrong or vague descriptions are a common cause of delays, so details matter.'] },
      { h: 'Duties and taxes: who pays?', p: ['Import duties and VAT or sales tax depend on the destination country and your business setup. Shipping terms decide who pays. In simple terms:'], list: ['Delivered duties unpaid (DAP): the buyer pays duties and taxes on arrival.', 'Delivered duties paid (DDP): the seller pays them up front and includes them in the price.', 'Ex works (EXW): the buyer arranges everything from the factory door.'] },
      { h: 'Rules change, so check current ones', p: ['Duty rates, thresholds and rules differ by country and change often. Check current rules with your customs broker, the courier or your national customs authority before you place a large order. We cannot give duty advice, but we will provide complete and accurate shipping documents.'] },
      { h: 'Tips to avoid delays', p: [], list: ['Give a full delivery address and a working phone number', 'Provide your tax or import ID if your country requires it', 'Order early before busy seasons and events', 'Ask for tracking as soon as the parcel ships'] },
    ],
    faq: [
      ['How long does shipping take?', 'Express couriers are typically the fastest option, but timing depends on the destination and customs clearance. We confirm the estimate when we quote.'],
      ['Do I pay import duty?', 'It depends on the shipping terms and your country. Check current rules with your customs broker or courier.'],
    ],
  },
];
