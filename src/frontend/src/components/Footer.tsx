import { MessageCircle } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-display text-3xl tracking-widest mb-3">
              NAYR.STORE
            </p>
            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              Sustainable Luxury. Unisex Streetwear.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Navigation
            </p>
            <div className="space-y-2">
              {["Home", "Shop", "About"].map((link) => (
                <button
                  type="button"
                  key={link}
                  onClick={() =>
                    document
                      .getElementById(link.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Contact
            </p>
            <a
              href="https://wa.me/919618478009"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: +91 96184 78009
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wider">
            © {year} NAYR.STORE. All rights reserved.
          </p>
          <a
            href={caffeineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
