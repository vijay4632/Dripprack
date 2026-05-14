import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { formatPrice } from "@/data/products";
import { useProductStore } from "@/hooks/useProductStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProductStore();
  const product = id ? getProduct(id) : null;
  const [selectedImage, setSelectedImage] = useState(0);

  const addToCart = useCart((state) => state.addToCart);
  const toggleWishlist = useWishlist((state) => state.toggleWishlist);
  const isInWishlist = useWishlist((state) => product ? state.isInWishlist(product.id) : false);

  const handleNextImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const handlePrevImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

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
              className="flex flex-col gap-4"
            >
              <div className="group image-zoom relative aspect-[4/5] w-full lg:max-w-[95%] mx-auto overflow-hidden rounded-sm bg-charcoal">
                <img
                  src={product.images?.[selectedImage] || ""}
                  alt={`${product.brand} ${product.name}`}
                  className="h-full w-full object-contain transition-opacity duration-300"
                />
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                {product.limited && (
                  <div className="absolute left-4 top-4">
                    <span className="badge-limited animate-pulse-glow">
                      Only 1 Available
                    </span>
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square overflow-hidden rounded-sm bg-charcoal outline-none ring-2 ring-offset-2 ring-offset-background transition-all ${selectedImage === i ? 'ring-primary' : 'ring-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                      <img src={img} className="h-full w-full object-cover" alt={`Gallery ${i + 1}`} />
                    </button>
                  ))}
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

              {/* Actions */}
              <div className="mt-8 flex gap-3">
                <Button
                  variant="default"
                  size="xl"
                  className="flex-1 gap-2"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="hero"
                  size="xl"
                  className="flex-1 gap-2"
                  onClick={() => {
                    addToCart(product);
                    navigate("/cart");
                  }}
                >
                  <Zap className="h-5 w-5" />
                  Buy Now
                </Button>
              </div>

              <Button
                variant="ghost"
                className="mt-3 gap-2"
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  className={`h-4 w-4 ${isInWishlist ? "fill-primary text-primary" : ""
                    }`}
                />
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
