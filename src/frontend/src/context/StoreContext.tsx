import { type ReactNode, createContext, useContext, useState } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "men" | "women" | "accessories";
  sizes: string[];
  imageUrl: string;
  stock: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

const SEED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Obsidian Oversized Tee",
    description:
      "Premium heavyweight cotton. Gender-neutral silhouette. Garment-washed for a lived-in feel that only gets better with time.",
    price: 1899,
    category: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageUrl: "/assets/generated/product-hoodie.dim_600x750.jpg",
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    name: "Cobalt Utility Cargo",
    description:
      "Relaxed fit cargo pants with geometric paneling. Six pockets. Sustainable nylon blend.",
    price: 3299,
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    imageUrl: "/assets/generated/product-cargo.dim_600x750.jpg",
    stock: 30,
    featured: false,
  },
  {
    id: "3",
    name: "Cloud Drape Shirt",
    description:
      "Fluid drape, oversized cut. Unisex essential. Deadstock fabric, zero-waste cut.",
    price: 2199,
    category: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl: "/assets/generated/product-shirt.dim_600x750.jpg",
    stock: 40,
    featured: true,
  },
  {
    id: "4",
    name: "Void Boxy Hoodie",
    description:
      "Garment-dyed fleece. Dropped shoulders. Unisex cut. The defining piece of NAYR Season 2.",
    price: 3799,
    category: "women",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageUrl: "/assets/generated/product-void-hoodie.dim_600x750.jpg",
    stock: 25,
    featured: true,
  },
  {
    id: "5",
    name: "Geometry Cap",
    description:
      "Structured 6-panel cap. Embroidered NAYR logo. Unstructured brim, adjustable strap.",
    price: 899,
    category: "accessories",
    sizes: ["One Size"],
    imageUrl: "/assets/generated/product-cap.dim_600x750.jpg",
    stock: 100,
    featured: false,
  },
  {
    id: "6",
    name: "Obsidian Tote",
    description:
      "Heavy canvas tote. Minimal branding. Everyday carry. Reinforced seams, recycled cotton.",
    price: 699,
    category: "accessories",
    sizes: ["One Size"],
    imageUrl: "/assets/generated/product-tote.dim_600x750.jpg",
    stock: 80,
    featured: false,
  },
];

interface StoreContextValue {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, size: string, quantity: number) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size,
      );
      if (existing >= 0) {
        return prev.map((item, i) =>
          i === existing
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
