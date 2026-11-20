'use client';
import { useRef, useState, type FormEvent } from 'react';

const QTY = ['10–49 pieces', '50–99 pieces', '100–499 pieces', '500+ pieces'];
const PRODUCTS = ['Classic T-shirt', 'Pima cotton tee', 'Polo shirt', 'Hoodie', 'Sweatshirt', 'Streetwear', 'Performance wear', 'Long sleeve', 'Mixed order'];
const COUNTRIES = ['United States', 'United Arab Emirates', 'United Kingdom', 'Other'];

export default function LeadForm({ country = 'United States', source = 'website', product }: { country?: string; source?: string; product?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const t0 = useRef(Date.now());

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    setStatus('sending'); setMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(d), hasVatNumber: d.get('hasVatNumber') === 'on', source, elapsed: Date.now() - t0.current }),
      });
      const j = await res.json();
      if (!res.ok || !j.success) throw new Error(j.message || 'Could not send your request.');
      setStatus('done'); f.reset();
    } catch (err) {
      setStatus('error'); setMsg(err instanceof Error ? err.message : 'Could not send your request. Try again.');
    }
  }

  if (status === 'done') return (
    <div className="form lf lf-done" role="status">
      <svg viewBox="0 0 52 52" width="72" height="72" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l8 8 15-17" /></svg>
      <h3>Request received</h3>
      <p>Thank you. Our team will email your quote within 24 hours.</p>
      <button className="btn ghost" onClick={() => setStatus('idle')}>Send another request</button>
    </div>
  );

  return (
    <form className="form lf" onSubmit={submit}>
      <div className="lf-head">
        <span className="lf-badge">Free quote</span>
        <h3>Tell us about your order</h3>
        <p>Replies within 24 hours. No obligation.</p>
      </div>
      <div className="row">
        <label>Company name<input name="companyName" required autoComplete="organization" placeholder="Acme Apparel Co." /></label>
        <label>Your name<input name="contactName" required autoComplete="name" placeholder="Jane Smith" /></label>
      </div>
      <div className="row">
        <label>Work email<input type="email" name="email" required autoComplete="email" placeholder="jane@company.com" /></label>
        <label>WhatsApp or phone<input type="tel" name="phone" autoComplete="tel" placeholder="+1 555 000 0000" /></label>
      </div>
      <div className="row">
        <label>Quantity<select name="quantityRange">{QTY.map(q => <option key={q}>{q}</option>)}</select></label>
        <label>Product<select name="productType" defaultValue={product}>{PRODUCTS.map(p => <option key={p}>{p}</option>)}</select></label>
      </div>
      <label>Delivery country<select name="deliveryCountry" defaultValue={country}>{COUNTRIES.map(c => <option key={c}>{c}</option>)}</select></label>
      <label>Design and fabric notes<textarea name="designRequirements" rows={4} placeholder="Fabric, print or embroidery, colors, sizes, target date" /></label>
      <label className="chk"><input type="checkbox" name="hasVatNumber" /> I have a VAT / tax number for invoicing</label>
      {status === 'error' && <p className="err" role="alert">{msg}</p>}
      <button className="btn gold lf-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Request my quote'}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
      <ul className="lf-trust"><li>Free digital proof</li><li>10-piece minimum</li><li>DHL Express</li></ul>
    </form>
  );
}
