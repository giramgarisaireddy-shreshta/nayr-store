import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative h-screen flex items-end overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1600x900.jpg')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 59px, oklch(25 0 0) 59px, oklch(25 0 0) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, oklch(25 0 0) 59px, oklch(25 0 0) 60px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.5em] uppercase text-primary mb-4">
            SS 2026 Collection
          </p>
          <h1 className="font-display text-[12vw] md:text-[10vw] leading-none text-foreground mb-4">
            NAYR
          </h1>
          <div className="w-24 h-px bg-primary mb-6" />
          <p className="text-lg md:text-xl tracking-widest uppercase text-muted-foreground mb-10">
            Sustainable Luxury. Unisex Streetwear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToCatalog}
              data-ocid="hero.primary_button"
              className="bg-primary text-primary-foreground hover:bg-primary/80 uppercase tracking-widest text-sm font-bold px-10 h-12 rounded-none"
            >
              Shop Now
            </Button>
            <a
              href="https://wa.me/919618478009?text=Hi%20NAYR%2C%20I%27m%20interested%20in%20your%20collection"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.secondary_button"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary uppercase tracking-widest text-sm h-12 rounded-none w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Concierge
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
