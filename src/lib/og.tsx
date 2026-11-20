import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogType = 'image/png';

export function og(title: string, sub: string, tag = 'SmartStitch') {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'linear-gradient(135deg,#0b1f3a,#14325c)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, letterSpacing: 4, color: '#d4a64a', textTransform: 'uppercase' }}>
          <div style={{ width: 44, height: 4, background: '#d4a64a' }} />{tag}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.08, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 32, color: '#c9d4e4', maxWidth: 900 }}>{sub}</div>
        </div>
        <div style={{ fontSize: 26, color: '#d4a64a' }}>Made in Karachi · Ships to US, UAE and UK</div>
      </div>
    ),
    ogSize,
  );
}
