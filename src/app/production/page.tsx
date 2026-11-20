import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import EdHero from '@/components/EdHero';
import LeadForm from '@/components/LeadForm';
import { Faq, FaqJsonLd } from '@/components/Shell';
import { BreadcrumbJsonLd } from '@/components/Schema';
import StepIcon from '@/components/StepIcon';

const FAQ: [string, string][] = [
  ['Where are SmartStitch garments made?', 'In our own production setup in Karachi, Pakistan. We ship worldwide with DHL Express.'],
  ['What is the minimum order?', 'Ten pieces per design, with volume discounts as quantities grow.'],
  ['Will I see the design before you cut?', 'Yes. We send a free digital proof for your approval before production starts.'],
];

export const metadata: Metadata = {
  title: 'Custom apparel production in Karachi',
  description: 'See how SmartStitch makes custom hoodies, T-shirts, sweatshirts and polos in Karachi, from pattern and sewing to quality check and DHL dispatch.',
  alternates: { canonical: '/production' },
};

const ICONS = ['proof', 'cut', 'sew', 'embroider', 'check', 'pack'];
const STEPS: [string, string][] = [
  ['Brief and digital proof', 'You share the design, fabric and quantity. We send a free digital proof before anything is cut.'],
  ['Pattern and cutting', 'Patterns are matched to your fit and size breakdown, then the fabric is cut.'],
  ['Sewing', 'Seams, necklines and hems are sewn on industrial lockstitch and overlock machines.'],
  ['Print or embroidery', 'Screen print, DTG or embroidery, matched to the fabric and the artwork.'],
  ['Quality check', 'Garments are inspected for stitching, print placement and measurements before packing.'],
  ['Packing and dispatch', 'Labels, hang tags and packaging as specified, shipped worldwide with DHL Express.'],
];

const PHOTOS: [string, string, string][] = [
  ['floor', 'On the sewing floor', 'Operators at overlock and lockstitch machines on the SmartStitch sewing floor in Karachi, with a finished embroidered sweatshirt in the foreground'],
  ['embroidery', 'Embroidery detail', 'Close-up of raised embroidered lettering on a grey sweatshirt'],
  ['thread', 'Thread and cones', 'Thread cones on an industrial sewing machine at the SmartStitch factory'],
  ['machine', 'Overlock machine', 'Close-up of an industrial overlock machine stitching fabric'],
  ['neckline', 'Neck rib and label', 'Close-up of a crew neck rib and woven label on a grey sweatshirt'],
  ['lockstitch', 'Lockstitch sewing', 'An operator sewing a garment on an industrial lockstitch machine'],
];

export default function Production() {
  return (
    <div className="ed-page">
      <FaqJsonLd items={FAQ} />
      <BreadcrumbJsonLd trail={[['Home', '/'], ['Production', '/production']]} />
      <EdHero small="Custom apparel made in Karachi" word="FACTORY" lead="From pattern to packing, here is how your order is made. Real machines, real operators, and a free digital proof before we cut."
        marquee="CUT ✦ SEW ✦ DECORATE ✦ CHECK ✦ PACK ✦ SHIP"
        actions={<Link href="/quote" className="btn gold">Get a quote</Link>} />

      <section className="sec"><div className="wrap">
        <h2>How your order is made</h2>
        <div className="ed-cols" style={{ marginTop: 24 }}>
          {STEPS.map(([t, d], i) => (
            <div className="ed-col" key={t}><StepIcon name={ICONS[i]} /><i>{String(i + 1).padStart(2, '0')}</i><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div></section>

      <section className="sec alt"><div className="wrap">
        <h2>Inside the factory</h2>
        <div className="fac">
          {PHOTOS.map(([img, cap, alt]) => (
            <figure key={img}>
              <Image src={`/images/factory-${img}.webp`} alt={alt} width={864} height={1152} sizes="(max-width:900px) 50vw, 360px" />
              <figcaption>{cap}</figcaption>
            </figure>
          ))}
        </div>
      </div></section>

      <section className="sec"><div className="wrap two">
        <div><h2>Start your order</h2><p className="lead">Share your brief and we reply within 24 hours. Prefer to test first? <Link href="/samples">Request a sample</Link>.</p></div>
        <LeadForm source="production-page" />
      </div></section>

      <section className="sec alt"><div className="wrap two"><div><h2>Production questions</h2></div><Faq items={FAQ} /></div></section>
    </div>
  );
}
