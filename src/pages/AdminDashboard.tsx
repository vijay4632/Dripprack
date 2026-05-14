import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "@/hooks/useProductStore";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, LogOut, ShoppingBag, Package, Tag } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProductStore();

  useEffect(() => {
    if (sessionStorage.getItem("dripprack_admin") !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteProduct(id);
      toast.success(`"${name}" deleted`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dripprack_admin");
    navigate("/admin/login");
  };

  const limitedCount = products.filter((p) => p.limited).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link to="/admin" className="font-heading text-lg font-black tracking-[0.2em] text-foreground">
            Dripprack <span className="text-primary">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                View Store
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container-wide py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Products", value: products.length, icon: Package, color: "text-primary" },
            { label: "Limited Items", value: limitedCount, icon: Tag, color: "text-accent" },
            { label: "Categories", value: [...new Set(products.map((p) => p.category))].length, icon: ShoppingBag, color: "text-foreground" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-sm border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className={`mt-1 font-heading text-2xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-30`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Products Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-black text-foreground">All Products</h2>
            <Button asChild className="gap-2">
              <Link to="/admin/product/new">
                <Plus className="h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>

          <div className="mt-4 rounded-sm border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Image</TableHead>
                  <TableHead className="text-muted-foreground">Product</TableHead>
                  <TableHead className="text-muted-foreground">Category</TableHead>
                  <TableHead className="text-muted-foreground">Price</TableHead>
                  <TableHead className="text-muted-foreground">Size</TableHead>
                  <TableHead className="text-muted-foreground">Condition</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="border-border">
                    <TableCell>
                      <div className="h-12 w-12 overflow-hidden rounded-sm bg-charcoal">
                        <img
                          src={product.images?.[0] || ""}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-heading text-xs font-bold text-foreground">{product.name}</p>
                        <p className="font-body text-[11px] text-muted-foreground">{product.brand}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{product.category}</TableCell>
                    <TableCell className="font-heading text-xs font-bold text-foreground">{formatPrice(product.price)}</TableCell>
                    <TableCell className="font-body text-xs text-muted-foreground">{product.size}</TableCell>
                    <TableCell>
                      <span className={`inline-block rounded-sm px-2 py-0.5 font-heading text-[10px] font-bold uppercase ${product.condition === "Excellent"
                          ? "bg-accent/10 text-accent"
                          : product.condition === "Good"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}>
                        {product.condition}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/product/${product.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id, product.name)}
                          className="hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <p className="font-body text-sm text-muted-foreground">No products yet</p>
                      <Button asChild className="mt-3" variant="outline">
                        <Link to="/admin/product/new">Add your first product</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
