// Simple line illustrations for process steps (decorative, not photos).
const P: Record<string, React.ReactNode> = {
  proof: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4M8.5 10l2.5 2.5L15.5 8" /></>,
  cut: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8 7.5L20 18M8 16.5L20 6" /></>,
  sew: <><path d="M5 19L19 5" /><ellipse cx="17.6" cy="6.4" rx="1" ry="2" transform="rotate(45 17.6 6.4)" /><path d="M15.5 8.5c4 .5 5 4.500 1.500 6s-4 3.500 0 4.500" /></>,
  embroider: <><circle cx="12" cy="12" r="8.500" /><circle cx="12" cy="12" r="5.500" /><path d="M8.500 14l1.800-4 1.700 4 1.700-4 1.800 4" /></>,
  check: <><circle cx="11" cy="11" r="6.500" /><path d="M16 16l5 5M8.500 11l2 2 3.500-4" /></>,
  pack: <><path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></>,
};
export default function StepIcon({ name }: { name: string }) {
  return <svg className="ed-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[name]}</svg>;
}
