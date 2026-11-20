export type Lead = {
  companyName: string; contactName: string; email: string; phone: string;
  quantityRange: string; productType: string; deliveryCountry: string;
  designRequirements: string; hasVatNumber: boolean; source: string;
};

const clean = (v: unknown, max: number) =>
  (typeof v === 'string' ? v : '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);

/** Returns a sanitized lead or an error message for the user. */
export function parseLead(body: Record<string, unknown>): { lead?: Lead; error?: string } {
  const lead: Lead = {
    companyName: clean(body.companyName, 120),
    contactName: clean(body.contactName, 120),
    email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 40),
    quantityRange: clean(body.quantityRange, 60),
    productType: clean(body.productType, 80),
    deliveryCountry: clean(body.deliveryCountry, 80),
    designRequirements: clean(body.designRequirements, 3000),
    hasVatNumber: body.hasVatNumber === true,
    source: clean(body.source, 60) || 'website',
  };
  if (!lead.companyName || !lead.contactName) return { error: 'Please enter your company and your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) return { error: 'Please enter a valid email address.' };
  if (lead.phone && !/^[+\d][\d\s().-]{5,}$/.test(lead.phone)) return { error: 'Please enter a valid phone number or leave it blank.' };
  return { lead };
}

// Best-effort per-IP limit (in-memory; resets on cold start, fine as a first line of defence)
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < windowMs);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}
