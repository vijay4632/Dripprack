import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import { products, formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [isWished, setIsWished] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-black text-foreground">
              Product Not Found
            </h1>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Collection
            </Link>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="image-zoom relative aspect-[3/4] overflow-hidden rounded-sm bg-charcoal"
            >
              <img
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                className="h-full w-full object-cover"
              />
              {product.limited && (
                <div className="absolute left-4 top-4">
                  <span className="badge-limited animate-pulse-glow">
                    Only 1 Available
                  </span>
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col justify-center"
            >
              <p className="font-body text-sm text-muted-foreground">
                {product.brand}
              </p>
              <h1 className="mt-2 font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-heading text-2xl font-black text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-base text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Details Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8">
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Fabric
                  </p>
                  <p className="mt-1 font-body text-sm text-foreground">
                    {product.fabric}
                  </p>
                </div>
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Fit
                  </p>
                  <p className="mt-1 font-body text-sm text-foreground">
                    {product.fit}
                  </p>
                </div>
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Condition
                  </p>
                  <p className="mt-1 font-body text-sm text-foreground">
                    {product.condition}
                  </p>
                </div>
                <div>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Size
                  </p>
                  <p className="mt-1 font-body text-sm text-foreground">
                    {product.size}
                  </p>
                </div>
              </div>

              <p className="mt-4 font-body text-xs text-muted-foreground italic">
                {product.modelInfo}
              </p>

              {/* Actions */}
              <div className="mt-8 flex gap-3">
                <Button
                  variant="default"
                  size="xl"
                  className="flex-1 gap-2"
                  onClick={() => toast.success(`${product.name} added to cart`)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="hero"
                  size="xl"
                  className="flex-1 gap-2"
                  onClick={() => toast.success("Redirecting to checkout...")}
                >
                  <Zap className="h-5 w-5" />
                  Buy Now
                </Button>
              </div>

              <Button
                variant="ghost"
                className="mt-3 gap-2"
                onClick={() => {
                  setIsWished(!isWished);
                  toast.success(
                    isWished ? "Removed from wishlist" : "Added to wishlist"
                  );
                }}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isWished ? "fill-primary text-primary" : ""
                  }`}
                />
                {isWished ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
