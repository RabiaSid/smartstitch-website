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

export async function sendAutoReply(lead: Lead) {
  const port = Number(process.env.SMTP_PORT || 465);
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port, secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 8000, socketTimeout: 10000,
  });
  const first = lead.contactName.split(/\s+/)[0].replace(/[\r\n]/g, '');
  const sample = lead.source === 'sample-request';
  await t.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: lead.email,
    replyTo: process.env.LEAD_NOTIFY_TO,
    subject: sample ? 'We received your sample request | SmartStitch' : 'We received your quote request | SmartStitch',
    text: [
      `Hi ${first},`, '',
      sample
        ? 'Thank you for requesting a sample from SmartStitch. Our team will review it and email you the details within 24 hours.'
        : 'Thank you for your quote request. Our team will review your brief and email your quote within 24 hours.',
      '',
      'To get a faster, more accurate price, you can reply to this email with:',
      '- Logo or artwork files (vector if you have them)',
      '- Size breakdown per style',
      '- Target delivery date',
      '', 'Best regards,', 'SmartStitch', 'Custom apparel manufacturer, Karachi',
    ].join('\n'),
  });
}
