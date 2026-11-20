import { NextResponse } from 'next/server';
import { parseLead, rateLimited, type Lead } from '@/lib/leads';
import { mongoConfigured, saveLeadToMongo } from '@/lib/mongo';
import { mailConfigured, sendLeadEmail } from '@/lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const FORWARD_URL = process.env.LEADS_API_URL || '';

async function forward(lead: Lead) {
  const res = await fetch(FORWARD_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) throw new Error(`forward ${res.status} ${data.message || ''}`);
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return NextResponse.json({ success: false, message: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 }); }
  // bot check: humans take more than ~2.5s to fill the form
  if (typeof body.elapsed !== 'number' || body.elapsed < 2500) { console.warn('[lead] too fast / no timer, dropped as bot'); return NextResponse.json({ success: true }); }

  const { lead, error } = parseLead(body);
  if (!lead) return NextResponse.json({ success: false, message: error }, { status: 400 });

  const jobs: [string, Promise<unknown>][] = [];
  if (mongoConfigured()) jobs.push(['mongo', saveLeadToMongo(lead, { ip, userAgent: req.headers.get('user-agent') || '' })]);
  if (mailConfigured()) jobs.push(['email', sendLeadEmail(lead)]); // TEMP off: Mongo-only test
  if (FORWARD_URL) jobs.push(['forward', forward(lead)]); // TEMP off: Mongo-only test

  if (!jobs.length) {
    console.error('[lead] No delivery channel configured (set MONGODB_URI, SMTP_*, or LEADS_API_URL). Lead NOT stored:', lead.email);
    return NextResponse.json({ success: false, message: 'Our form is temporarily unavailable. Please email us directly.' }, { status: 503 });
  }

  const results = await Promise.allSettled(jobs.map(j => j[1]));
  let ok = 0;
  const debug: Record<string, string> = {};
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') { ok++; debug[jobs[i][0]] = 'ok'; }
    else { const m = r.reason instanceof Error ? r.reason.message : String(r.reason); debug[jobs[i][0]] = m; console.error(`[lead] ${jobs[i][0]} failed:`, m); }
  });
  if (!mongoConfigured()) debug.mongo = 'NOT CONFIGURED (MONGODB_URI empty, restart dev server)';
  const dev = process.env.NODE_ENV !== 'production';
  if (!ok) {
    console.error('[lead] ALL channels failed. Lead details for manual follow-up:', JSON.stringify(lead));
    return NextResponse.json({ success: false, message: 'We could not send your request. Please try again or email us directly.' }, { status: 502 });
  }
  return NextResponse.json(dev ? { success: true, debug } : { success: true });
}
