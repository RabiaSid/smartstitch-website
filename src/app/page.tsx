import HeroSection from '@/components/ui/HeroSection/hero-section';
import { FeaturesStrip }   from '@/components/ui/FeaturesStrip/features-strip';
import { ProductsPreview } from '@/components/ui/ProductsPreview/products-preview';
import { CustomizerCTA }   from '@/components/ui/CustomizerCTA/customizer-cta';
import { Testimonials }    from '@/components/ui/Testimonials/testimonials';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesStrip />
      <ProductsPreview />
      <CustomizerCTA />
      <Testimonials />
    </main>
  );
}