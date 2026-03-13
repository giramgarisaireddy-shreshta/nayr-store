import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/context/StoreContext";
import { useStore } from "@/context/StoreContext";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
    onClose();
  };

  const waLink = `https://wa.me/919618478009?text=${encodeURIComponent(
    `Hi NAYR, I'm interested in ${product.name} (₹${product.price.toLocaleString("en-IN")})`,
  )}`;

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-ocid="product.modal"
        className="bg-card border-border max-w-3xl p-0 overflow-hidden rounded-none"
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-[4/5] md:aspect-auto">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <DialogHeader className="mb-2">
                <div className="mb-3">
                  <Badge className="bg-primary/20 text-primary border-none uppercase tracking-widest text-[10px] rounded-none">
                    {product.category}
                  </Badge>
                </div>
                <DialogTitle className="font-display text-3xl tracking-wider text-foreground">
                  {product.name}
                </DialogTitle>
              </DialogHeader>
              <p className="text-2xl font-bold text-foreground mb-3">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Select Size
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="product.select"
                >
                  {product.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-11 px-3 text-sm border transition-all uppercase tracking-wider ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Please select a size
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Quantity
                </p>
                <div className="flex items-center gap-4 border border-border w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                data-ocid="product.add_button"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="bg-primary text-primary-foreground hover:bg-primary/80 uppercase tracking-widest rounded-none h-12 disabled:opacity-40"
              >
                Add to Cart
              </Button>
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full border-border rounded-none h-12 hover:bg-secondary uppercase tracking-widest text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order via WhatsApp
                </Button>
              </a>
              <button
                type="button"
                data-ocid="product.close_button"
                onClick={onClose}
                className="text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase mt-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
