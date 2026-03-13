import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/context/StoreContext";
import type { Product } from "@/context/StoreContext";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "accessories", label: "Accessories" },
];

export function CatalogSection() {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      id="catalog"
      data-ocid="catalog.section"
      className="py-24 bg-background"
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.5em] uppercase text-primary mb-2">
            The Edit
          </p>
          <h2 className="font-display text-6xl md:text-8xl tracking-wider">
            Collection
          </h2>
          <div className="w-16 h-px bg-primary mt-4" />
        </motion.div>

        {/* Tabs */}
        <Tabs
          defaultValue="all"
          onValueChange={setActiveCategory}
          className="mb-10"
        >
          <TabsList className="bg-transparent gap-1 h-auto p-0">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                data-ocid="catalog.tab"
                className="rounded-none border border-border text-xs tracking-widest uppercase px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary hover:border-foreground/50 transition-all"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            data-ocid="catalog.empty_state"
            className="py-24 text-center text-muted-foreground tracking-widest uppercase text-sm"
          >
            No products in this category
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {filtered.map((product, i) => (
              <div key={product.id} className="bg-background">
                <ProductCard
                  product={product}
                  index={i}
                  onView={setSelectedProduct}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
