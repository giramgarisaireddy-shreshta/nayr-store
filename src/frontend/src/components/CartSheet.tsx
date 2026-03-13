import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useStore } from "@/context/StoreContext";
import { MessageCircle, Minus, Plus, Trash2 } from "lucide-react";

export function CartSheet() {
  const {
    cart,
    cartTotal,
    cartCount,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useStore();

  const buildWhatsAppMessage = () => {
    const lines = cart.map(
      (item) =>
        `• ${item.product.name} (${item.size}) x${item.quantity} = ₹${(
          item.product.price * item.quantity
        ).toLocaleString("en-IN")}`,
    );
    lines.push(`\nTotal: ₹${cartTotal.toLocaleString("en-IN")}`);
    return `Hi NAYR, I'd like to place an order:\n\n${lines.join("\n")}`;
  };

  const waCheckoutLink = `https://wa.me/919618478009?text=${encodeURIComponent(
    buildWhatsAppMessage(),
  )}`;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        data-ocid="cart.sheet"
        side="right"
        className="w-full sm:w-[420px] bg-card border-border p-0 flex flex-col rounded-none"
      >
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="font-display text-2xl tracking-wider">
            Cart {cartCount > 0 && `(${cartCount})`}
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex-1 flex items-center justify-center flex-col gap-4 text-muted-foreground"
          >
            <div className="w-16 h-16 border border-border flex items-center justify-center">
              <span className="font-display text-2xl">0</span>
            </div>
            <p className="text-xs tracking-widest uppercase">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-0">
                {cart.map((item, i) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    data-ocid={`cart.item.${i + 1}`}
                    className="flex gap-4 p-4 border-b border-border last:border-0"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover border border-border flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base tracking-wider truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                        Size: {item.size}
                      </p>
                      <p className="text-sm font-bold mt-1">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            onClick={() => updateQuantity(i, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(i, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          data-ocid={`cart.delete_button.${i + 1}`}
                          onClick={() => removeFromCart(i)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-6 space-y-4">
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-display text-xl tracking-wider">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <a
                href={waCheckoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  data-ocid="cart.primary_button"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/80 uppercase tracking-widest rounded-none h-12"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Checkout via WhatsApp
                </Button>
              </a>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
