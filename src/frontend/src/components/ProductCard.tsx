import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/context/StoreContext";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  index: number;
  onView: (product: Product) => void;
}

export function ProductCard({ product, index, onView }: ProductCardProps) {
  const categoryLabel =
    product.category === "men"
      ? "Men"
      : product.category === "women"
        ? "Women"
        : "Accessories";

  return (
    <motion.div
      data-ocid={`catalog.item.${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group nayr-card-hover cursor-pointer border border-border bg-card"
      onClick={() => onView(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground uppercase tracking-widest text-[10px] rounded-none">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className="border-border/60 bg-background/60 uppercase tracking-widest text-[10px] rounded-none backdrop-blur-sm"
          >
            {categoryLabel}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 border-t border-border">
        <h3 className="font-display text-xl tracking-wider mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body font-bold text-foreground">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <Button
            size="sm"
            className="bg-transparent border border-border text-foreground hover:bg-primary hover:border-primary uppercase tracking-widest text-[11px] rounded-none transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onView(product);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
