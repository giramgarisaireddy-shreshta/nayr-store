import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { type Product, useStore } from "@/context/StoreContext";
import { Link } from "@tanstack/react-router";
import { Lock, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const ADMIN_PASSWORD = "nayr2026";

type FormData = {
  name: string;
  description: string;
  price: string;
  category: string;
  sizes: string;
  imageUrl: string;
  stock: string;
  featured: boolean;
};

const EMPTY_FORM: FormData = {
  name: "",
  description: "",
  price: "",
  category: "men",
  sizes: "S,M,L,XL",
  imageUrl: "",
  stock: "",
  featured: false,
};

export function AdminPage() {
  const { products, setProducts } = useStore();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      sizes: product.sizes.join(","),
      imageUrl: product.imageUrl,
      stock: String(product.stock),
      featured: product.featured,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) {
      setFormError("Name, price and stock are required.");
      return;
    }
    setFormError(null);
    const newProduct: Product = {
      id: editingId ?? String(Date.now()),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category as Product["category"],
      sizes: form.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      imageUrl:
        form.imageUrl || "/assets/generated/product-hoodie.dim_600x750.jpg",
      stock: Number(form.stock),
      featured: form.featured,
    };
    if (editingId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? newProduct : p)),
      );
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm border border-border bg-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="w-5 h-5 text-primary" />
            <h1 className="font-display text-2xl tracking-widest">
              Admin Access
            </h1>
          </div>
          <Label
            htmlFor="pw"
            className="text-xs tracking-widest uppercase text-muted-foreground"
          >
            Password
          </Label>
          <Input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            data-ocid="admin.input"
            className="mt-2 mb-1 rounded-none bg-background border-border"
            placeholder="Enter admin password"
          />
          {pwError && (
            <p className="text-xs text-destructive mb-4">Incorrect password.</p>
          )}
          <Button
            onClick={handleLogin}
            className="w-full mt-4 bg-primary text-primary-foreground rounded-none uppercase tracking-widest"
          >
            Unlock
          </Button>
          <Link
            to="/"
            className="block text-center text-xs text-muted-foreground mt-4 hover:text-foreground transition-colors tracking-wider"
          >
            ← Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="admin.panel" className="min-h-screen bg-background">
      <header className="border-b border-border nayr-glass sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-xl tracking-widest hover:text-primary transition-colors"
          >
            NAYR.STORE
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Admin Panel
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAuthed(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl tracking-wider mb-6">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Name *
                </Label>
                <Input
                  data-ocid="admin.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="mt-1 rounded-none bg-background border-border"
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Description
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="mt-1 rounded-none bg-background border-border resize-none"
                  rows={3}
                  placeholder="Product description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                    Price (₹) *
                  </Label>
                  <Input
                    data-ocid="admin.input"
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    className="mt-1 rounded-none bg-background border-border"
                    placeholder="1999"
                  />
                </div>
                <div>
                  <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                    Stock *
                  </Label>
                  <Input
                    data-ocid="admin.input"
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, stock: e.target.value }))
                    }
                    className="mt-1 rounded-none bg-background border-border"
                    placeholder="50"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Category
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger
                    data-ocid="admin.input"
                    className="mt-1 rounded-none bg-background border-border"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border rounded-none">
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Sizes (comma separated)
                </Label>
                <Input
                  data-ocid="admin.input"
                  value={form.sizes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sizes: e.target.value }))
                  }
                  className="mt-1 rounded-none bg-background border-border"
                  placeholder="S,M,L,XL"
                />
              </div>
              <div>
                <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Image URL
                </Label>
                <Input
                  data-ocid="admin.input"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  className="mt-1 rounded-none bg-background border-border"
                  placeholder="/assets/generated/..."
                />
              </div>
              <div className="flex items-center gap-3 py-2">
                <Switch
                  checked={form.featured}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, featured: v }))
                  }
                  className="data-[state=checked]:bg-primary"
                />
                <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Featured
                </Label>
              </div>

              {formError && (
                <p
                  data-ocid="admin.error_state"
                  className="text-xs text-destructive"
                >
                  {formError}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  data-ocid="admin.submit_button"
                  className="flex-1 bg-primary text-primary-foreground rounded-none uppercase tracking-widest"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {editingId ? "Save Changes" : "Add Product"}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setForm(EMPTY_FORM);
                    }}
                    className="border-border rounded-none"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Product Table */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl tracking-wider mb-6">
              Products ({products.length})
            </h2>
            <div className="border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs tracking-widest uppercase text-muted-foreground">
                      Product
                    </TableHead>
                    <TableHead className="text-xs tracking-widest uppercase text-muted-foreground">
                      Price
                    </TableHead>
                    <TableHead className="text-xs tracking-widest uppercase text-muted-foreground">
                      Cat
                    </TableHead>
                    <TableHead className="text-xs tracking-widest uppercase text-muted-foreground">
                      Stock
                    </TableHead>
                    <TableHead className="text-xs tracking-widest uppercase text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, i) => (
                    <TableRow
                      key={product.id}
                      data-ocid={`admin.row.${i + 1}`}
                      className="border-border hover:bg-secondary/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-12 object-cover border border-border"
                          />
                          <span className="text-sm font-medium truncate max-w-[140px]">
                            {product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        ₹{product.price.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                          {product.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{product.stock}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            data-ocid={`admin.edit_button.${i + 1}`}
                            onClick={() => handleEdit(product)}
                            className="w-8 h-8 hover:text-primary"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            data-ocid={`admin.delete_button.${i + 1}`}
                            onClick={() => handleDelete(product.id)}
                            className="w-8 h-8 hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
