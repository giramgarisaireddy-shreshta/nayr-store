import { AboutSection } from "@/components/AboutSection";
import { CatalogSection } from "@/components/CatalogSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";

export function StorePage() {
  return (
    <main>
      <HeroSection />
      <CatalogSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
