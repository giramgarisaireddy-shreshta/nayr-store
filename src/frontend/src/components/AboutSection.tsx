import { motion } from "motion/react";

export function AboutSection() {
  return (
    <section id="about" className="py-32 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.5em] uppercase text-primary mb-4">
              Our Ethos
            </p>
            <h2 className="font-display text-6xl md:text-7xl leading-tight tracking-wider mb-6">
              Built for
              <br />
              Everyone.
              <br />
              <span className="text-primary">Wasted</span>
              <br />
              on No One.
            </h2>
            <div className="w-16 h-px bg-primary mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              NAYR was built on the belief that luxury and sustainability are
              not opposites. Every piece in our collection is designed without
              gender constraints — because great clothing should fit the human,
              not the category.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We source deadstock and recycled fabrics, work with artisan
              manufacturers, and cut patterns that breathe with the body. Our
              geometry is deliberate — oversized silhouettes, dropped shoulders,
              and architectural drape are not trends, they are our signature.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              NAYR.STORE ships across India. Every order is packaged in recycled
              materials. Every purchase plants a tree.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              {[
                { value: "100%", label: "Sustainable Fabrics" },
                { value: "0", label: "Gender Constraints" },
                { value: "∞", label: "Wearability" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-primary tracking-wider">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
