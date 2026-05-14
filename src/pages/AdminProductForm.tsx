import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProductStore } from "@/hooks/useProductStore";
import { categories, conditions, sizes, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  name: "",
  brand: "",
  price: 0,
  originalPrice: undefined as number | undefined,
  images: [] as string[],
  category: categories[1],
  size: "M",
  condition: "Good" as Product["condition"],
  limited: false,
  description: "",
  fit: "Regular",
};

const AdminProductForm = () => {
  const { id } = useParams();
  const isEditing = id && id !== "new";
  const navigate = useNavigate();
  const { getProduct, addProduct, updateProduct } = useProductStore();
  const [form, setForm] = useState(emptyForm);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("dripprack_admin") !== "true") {
      navigate("/admin/login");
      return;
    }
    if (isEditing) {
      const product = getProduct(id);
      if (product) {
        setForm({
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          images: product.images || [],
          category: product.category,
          size: product.size,
          condition: product.condition,
          limited: product.limited,
          description: product.description,
          fit: product.fit,
        });
        setImagePreviews(product.images || []);
      }
    }
  }, [id, isEditing, getProduct, navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = 5 - form.images.length;
    if (remainingSlots <= 0) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setForm((prev) => ({ ...prev, images: [...prev.images, base64] }));
        setImagePreviews((prev) => [...prev, base64]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.price) {
      toast.error("Please fill in name, brand, and price");
      return;
    }

    if (isEditing) {
      updateProduct(id, form);
      toast.success(`"${form.name}" updated`);
    } else {
      addProduct(form);
      toast.success(`"${form.name}" added`);
    }
    navigate("/admin");
  };

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputCls = "bg-card border-border text-foreground";
  const labelCls = "font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link to="/admin" className="font-heading text-lg font-black tracking-[0.2em] text-foreground">
            Dripprack <span className="text-primary">Admin</span>
          </Link>
        </div>
      </header>

      <main className="container-wide max-w-3xl py-8">
        <Link to="/admin" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <h1 className="font-heading text-2xl font-black text-foreground">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Image Upload */}
          <div>
            <label className={labelCls}>Product Images ({form.images.length}/5)</label>
            <div className="mt-2 flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, i) => (
                  <div key={i} className="relative h-24 w-20 overflow-hidden rounded-sm border border-border bg-card group">
                    <img src={preview} alt={`Preview ${i}`} className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 flex items-center justify-center bg-background/80 hover:bg-destructive hover:text-white rounded-full h-5 w-5 text-[10px] font-bold transition-colors">
                      ✕
                    </button>
                  </div>
                ))}
                {form.images.length < 5 && (
                  <label className="cursor-pointer">
                    <div className="h-24 w-20 flex flex-col items-center justify-center rounded-sm border border-dashed border-border bg-card transition-colors hover:bg-muted">
                      <ImagePlus className="h-6 w-6 text-muted-foreground mb-1" />
                      <span className="text-[10px] uppercase text-muted-foreground font-bold">Add</span>
                    </div>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
              <p className="font-body text-[11px] text-muted-foreground">JPG, PNG, WebP. First image is the main thumbnail. Max 5 images.</p>
            </div>
          </div>

          {/* Name & Brand */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Product Name *</label>
              <Input className={`mt-1.5 ${inputCls}`} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Distressed Denim Jacket" />
            </div>
            <div>
              <label className={labelCls}>Brand *</label>
              <Input className={`mt-1.5 ${inputCls}`} value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Vintage Levi's" />
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Price (₹) *</label>
              <Input type="number" className={`mt-1.5 ${inputCls}`} value={form.price || ""} onChange={(e) => set("price", Number(e.target.value))} placeholder="8500" />
            </div>
            <div>
              <label className={labelCls}>Original Price (₹)</label>
              <Input type="number" className={`mt-1.5 ${inputCls}`} value={form.originalPrice || ""} onChange={(e) => set("originalPrice", e.target.value ? Number(e.target.value) : undefined)} placeholder="15000" />
            </div>
          </div>

          {/* Category, Size, Condition */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Category</label>
              <select
                className={`mt-1.5 flex h-10 w-full rounded-md border px-3 py-2 text-sm ${inputCls}`}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {categories.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Size</label>
              <select
                className={`mt-1.5 flex h-10 w-full rounded-md border px-3 py-2 text-sm ${inputCls}`}
                value={form.size}
                onChange={(e) => set("size", e.target.value)}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Condition</label>
              <select
                className={`mt-1.5 flex h-10 w-full rounded-md border px-3 py-2 text-sm ${inputCls}`}
                value={form.condition}
                onChange={(e) => set("condition", e.target.value as Product["condition"])}
              >
                {conditions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Fit */}
          <div>
            <label className={labelCls}>Fit</label>
            <Input className={`mt-1.5 ${inputCls}`} value={form.fit} onChange={(e) => set("fit", e.target.value)} placeholder="Oversized" />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <Textarea className={`mt-1.5 ${inputCls}`} rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the piece..." />
          </div>

          {/* Limited */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.limited}
              onChange={(e) => set("limited", e.target.checked)}
              className="h-4 w-4 rounded border-border bg-card accent-primary"
            />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-foreground">
              Mark as Limited Edition
            </span>
          </label>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg" className="gap-2">
              <Save className="h-4 w-4" />
              {isEditing ? "Save Changes" : "Add Product"}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => navigate("/admin")}>
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminProductForm;
