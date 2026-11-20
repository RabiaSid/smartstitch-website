'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { REELS, SITE } from '@/data/content';

export default function Reels() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    const vids = refs.current.filter(Boolean) as HTMLVideoElement[];
    if (!vids.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting && e.intersectionRatio > 0.6) v.play().catch(() => {}); else v.pause();
    }), { threshold: [0, 0.6] });
    vids.forEach(v => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <div className="reels" role="list">
      {REELS.map((r, i) => {
        const link = r.ig || SITE.instagram;
        const inner = (
          <>
            {r.src
              ? <video ref={el => { refs.current[i] = el; }} src={r.src} poster={`/images/${r.poster}.webp`} muted loop playsInline preload="none" />
              : <Image src={`/images/${r.poster}.webp`} alt={r.caption} width={360} height={640} sizes="240px" />}
            <span className="reel-cap">{r.caption}</span>
            {!r.src && link && <span className="reel-play" aria-hidden="true" />}
          </>
        );
        return link && !r.src
          ? <a key={i} role="listitem" className="reel" href={link} target="_blank" rel="noopener noreferrer">{inner}</a>
          : <div key={i} role="listitem" className="reel">{inner}</div>;
      })}
    </div>
  );
}
