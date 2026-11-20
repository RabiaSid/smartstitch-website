import { MongoClient } from 'mongodb';
import type { Lead } from './leads';

const g = globalThis as unknown as { _mongo?: Promise<MongoClient> };

export const mongoConfigured = () => !!process.env.MONGODB_URI;

export async function saveLeadToMongo(lead: Lead, meta: { ip: string; userAgent: string }) {
  if (!g._mongo) g._mongo = new MongoClient(process.env.MONGODB_URI as string, { serverSelectionTimeoutMS: 6000 }).connect();
  let client: MongoClient;
  try { client = await g._mongo; } catch (e) { g._mongo = undefined; throw e; }
  const col = client.db(process.env.MONGODB_DB || 'smartstitch').collection(process.env.MONGODB_COLLECTION || 'website_leads');
  await col.insertOne({ ...lead, status: 'new', ip: meta.ip, userAgent: meta.userAgent, createdAt: new Date() });
}
