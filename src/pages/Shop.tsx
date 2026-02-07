import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories, sizes, conditions } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedSize && p.size !== selectedSize) return false;
      if (selectedCondition && p.condition !== selectedCondition) return false;
      return true;
    });
  }, [selectedCategory, selectedSize, selectedCondition]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedSize(null);
    setSelectedCondition(null);
  };

  const hasActiveFilters = selectedCategory !== "All" || selectedSize || selectedCondition;

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          {/* Header */}
          <div className="flex items-end justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                The Collection
              </h1>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                {filtered.length} piece{filtered.length !== 1 ? "s" : ""} available
              </p>
            </motion.div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="mt-10 flex gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`${
                showFilters ? "block" : "hidden"
              } w-full shrink-0 space-y-8 md:block md:w-52`}
            >
              {/* Category */}
              <div>
                <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                  Category
                </h3>
                <div className="mt-3 flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-sm px-3 py-2 text-left font-body text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                  Size
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? null : size)
                      }
                      className={`rounded-sm border px-3 py-1.5 font-heading text-xs font-semibold transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-foreground/30"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                  Condition
                </h3>
                <div className="mt-3 flex flex-col gap-1">
                  {conditions.map((cond) => (
                    <button
                      key={cond}
                      onClick={() =>
                        setSelectedCondition(
                          selectedCondition === cond ? null : cond
                        )
                      }
                      className={`rounded-sm px-3 py-2 text-left font-body text-sm transition-colors ${
                        selectedCondition === cond
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="gap-2 text-xs">
                  <X className="h-3 w-3" />
                  Clear Filters
                </Button>
              )}
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="font-heading text-lg font-bold text-foreground">
                    No pieces found
                  </p>
                  <p className="mt-2 font-body text-sm text-muted-foreground">
                    Try adjusting your filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
