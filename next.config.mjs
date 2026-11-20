/** @type {import('next').NextConfig} */
export default {
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { serverComponentsExternalPackages: ['mongodb', 'nodemailer'] },
  // Old shop/blog URLs -> closest new page (keeps Google rankings, avoids 404s)
  async redirects() {
    const to = (source, destination) => ({ source, destination, permanent: true });
    return [
      to('/products', '/quote'), to('/products/:path*', '/quote'),
      to('/made-to-order', '/b2b'), to('/made-to-order/:path*', '/b2b'),
      to('/customize', '/quote'), to('/cart', '/quote'), to('/checkout', '/quote'),
      to('/blog', '/fabric-guide'), to('/blog/:slug', '/fabric-guide'),
    ];
  },
};
