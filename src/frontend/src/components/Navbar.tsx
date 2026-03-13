import { Button } from "@/components/ui/button";
import { useStore } from "@/context/StoreContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { cartCount, setIsCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (id: string) => {
    if (window.location.pathname !== "/") {
      navigate({ to: "/" });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nayr-glass border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link
          to="/"
          data-ocid="nav.link"
          className="font-display text-2xl tracking-widest text-foreground hover:text-primary transition-colors"
        >
          NAYR.STORE
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => handleNavClick("hero")}
            className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </button>
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => handleNavClick("catalog")}
            className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop
          </button>
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => handleNavClick("about")}
            className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
          <Link
            to="/admin"
            data-ocid="nav.link"
            className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          data-ocid="nav.cart_button"
          onClick={() => setIsCartOpen(true)}
          className="relative hover:text-primary"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
