import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-soft">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold text-navy-darkest">404</h1>
        <p className="text-neutral-silver mt-4 mb-8">Page not found</p>
        <Link href="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
}
