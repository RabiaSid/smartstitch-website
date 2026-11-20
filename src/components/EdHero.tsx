import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

type Props = {
  small: string;            // small uppercase line above the giant word (keeps the SEO phrase visible)
  word: string;             // giant display word
  lead: string;
  img?: { src: string; alt: string; w: number; h: number };
  box?: { label: string; href: string };  // "discover" box on the photo
  actions?: ReactNode;
  marquee?: string;
};

export default function EdHero({ small, word, lead, img, box, actions, marquee }: Props) {
  return (
    <>
      <section className="eh" style={{ ['--n' as string]: Math.max(word.length, 6.5) } as CSSProperties}>
        <div className="wrap">
          <h1 className="eh-h1"><span className="eh-small">{small}</span><span className="eh-word">{word}</span></h1>
          {img && (
            <div className="eh-img">
              <Image src={img.src} alt={img.alt} width={img.w} height={img.h} priority sizes="(max-width:900px) 100vw, 1100px" />
              {box && <a className="eh-box" href={box.href}><b>{box.label}</b><i>Discover now</i></a>}
            </div>
          )}
          <div className="eh-sub"><p>{lead}</p>{actions && <div className="eh-actions">{actions}</div>}</div>
        </div>
      </section>
      {marquee && <div className="pf-marq" aria-hidden="true"><div>{[0, 1].map(k => <span key={k}>{marquee} ✦ {marquee} ✦ </span>)}</div></div>}
    </>
  );
}
