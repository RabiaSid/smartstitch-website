import nodemailer from 'nodemailer';
import type { Lead } from './leads';

export const mailConfigured = () => !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.LEAD_NOTIFY_TO);

export async function sendLeadEmail(lead: Lead) {
  const port = Number(process.env.SMTP_PORT || 465);
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port, secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 8000, socketTimeout: 10000,
  });
  const line = (k: string, v: string) => `${k}: ${v || '-'}`;
  const text = [
    'New quote request from the SmartStitch website', '',
    line('Company', lead.companyName), line('Name', lead.contactName), line('Email', lead.email), line('Phone/WhatsApp', lead.phone), '',
    line('Quantity', lead.quantityRange), line('Product', lead.productType), line('Delivery country', lead.deliveryCountry),
    line('Has VAT/tax number', lead.hasVatNumber ? 'Yes' : 'No'), line('Page', lead.source), '',
    'Notes:', lead.designRequirements || '-',
  ].join('\n');
  await t.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.LEAD_NOTIFY_TO,
    replyTo: `"${lead.contactName.replace(/["\r\n]/g, '')}" <${lead.email}>`,
    subject: `New quote: ${lead.companyName.replace(/[\r\n]/g, ' ')} (${lead.quantityRange}, ${lead.deliveryCountry})`,
    text,
  });
}
