import { BreadcrumbJsonLd } from '@/components/Schema';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FABRICS, FABRIC_BY_MARKET, CARE, FABRIC_FAQ } from '@/data/content';
import { Faq, FaqJsonLd, CtaBand, HlList } from '@/components/Shell';

export const metadata: Metadata = {
  title: 'T-shirt fabric guide: GSM, print compatibility, care',
  description: 'Compare cotton, Pima, organic, poly-cotton, piqué and thermal fabrics by GSM, print method, washing and shrinkage, with picks for the US, UAE and UK.',
  alternates: { canonical: '/fabric-guide' },
};

const cls = (v: string) => (v === 'Best' ? 'tag best' : v === 'No' || v === 'Poor' ? 'tag no' : 'tag');

export default function FabricGuide() {
  return (
    <>
      <BreadcrumbJsonLd trail={[['Home','/'],['Fabric guide','/fabric-guide']]} />
      <FaqJsonLd items={FABRIC_FAQ} />
      <section className="hero"><div className="wrap grid">
        <div><h1>T-shirt fabric guide</h1>
          <p className="lead">GSM is fabric weight in grams per square meter. Higher is heavier and warmer. Use this guide to match fabric to your print method, climate and budget.</p></div>
        <div className="photo"><Image src="/images/pima-blue.webp" alt="Close-up of a blue Pima cotton T-shirt sleeve" width={800} height={1200} priority sizes="(max-width:900px) 100vw, 420px" style={{ maxHeight: 460, objectFit: 'cover' }} /></div>
      </div></section>

      <section className="sec alt"><div className="wrap">
        <div className="head"><h2>Compare every fabric</h2><p className="lead">Ratings show how well each fabric takes each decoration method.</p></div>
        <div className="tbl wide-t"><table>
          <thead><tr><th>Fabric</th><th>GSM</th><th>Composition</th><th>Best for</th><th>Screen print</th><th>DTG</th><th>Embroidery</th><th>Sublimation</th><th>Wash</th><th>Shrinkage</th></tr></thead>
          <tbody>{FABRICS.map(f => (
            <tr key={f.name}><td><b>{f.name}</b></td><td>{f.gsm}</td><td>{f.mix}</td><td>{f.use}</td>
              <td><span className={cls(f.screen)}>{f.screen}</span></td><td><span className={cls(f.dtg)}>{f.dtg}</span></td>
              <td><span className={cls(f.emb)}>{f.emb}</span></td><td><span className={cls(f.sub)}>{f.sub}</span></td><td>{f.wash}</td><td>{f.shrink}</td></tr>))}</tbody>
        </table></div>
      </div></section>

      <section className="sec"><div className="wrap two">
        <div><h2>Pick by market</h2><div style={{ marginTop: 20 }}><HlList items={FABRIC_BY_MARKET} /></div></div>
        <div><h2>Care and shrinkage</h2><div style={{ marginTop: 20 }}><HlList items={CARE} /></div></div>
      </div></section>

      <section className="sec alt"><div className="wrap two"><div><h2>Fabric questions</h2></div><Faq items={FABRIC_FAQ} /></div></section>

      <CtaBand title="Ready to choose a fabric?" text="Tell us the product and quantity. We will recommend a fabric and send a quote." />
    </>
  );
}
