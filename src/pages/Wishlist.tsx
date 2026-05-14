import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/data/products";

const Wishlist = () => {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[60vh] flex-col items-center justify-center text-center"
            >
              <Heart className="h-16 w-16 text-muted-foreground mb-6" />
              <h1 className="font-heading text-3xl font-black text-foreground">
                Your Wishlist is Empty
              </h1>
              <p className="mt-2 font-body text-muted-foreground">
                Add items to your wishlist to save them for later
              </p>
              <Button asChild variant="default" size="lg" className="mt-8">
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl font-black text-foreground sm:text-4xl">
              My Wishlist
            </h1>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="border border-border rounded-lg bg-card overflow-hidden hover:border-primary transition-colors group"
              >
                {/* Image Container */}
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-charcoal aspect-[3/4]">
                  <img
                    src={product.images?.[0] || ""}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.limited && (
                    <div className="absolute left-3 top-3">
                      <span className="badge-limited animate-pulse-glow">
                        Limited
                      </span>
                    </div>
                  )}
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <p className="font-body text-xs text-muted-foreground">
                      {product.brand}
                    </p>
                    <h3 className="font-heading text-sm font-bold text-foreground mt-1 hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-heading text-sm font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="font-body text-xs text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mt-2">
                    Size {product.size}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1 gap-2 h-9"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Cart</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 px-3"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Wishlist;
