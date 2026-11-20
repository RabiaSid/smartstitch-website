import { SITE } from '@/data/content';

export default function WhatsAppButton() {
  if (!SITE.whatsapp) return null;
  const msg = encodeURIComponent('Hi SmartStitch, I would like a quote for custom apparel.');
  return (
    <a className="wa-fab" href={`https://wa.me/${SITE.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
    </a>
  );
}
