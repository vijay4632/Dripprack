import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Product, formatPrice } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const toggleWishlist = useWishlist((state) => state.toggleWishlist);
  const isInWishlist = useWishlist((state) => state.isInWishlist(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="image-zoom relative aspect-[3/4] overflow-hidden rounded-sm bg-charcoal">
          <img
            src={product.images?.[0] || ""}
            alt={`${product.brand} ${product.name}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* Badges */}
          {product.limited && (
            <div className="absolute left-3 top-3">
              <span className="badge-limited animate-pulse-glow">
                Limited
              </span>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute right-3 top-3 rounded-full bg-background/60 p-2 backdrop-blur-sm transition-all hover:bg-background/80"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isInWishlist ? "fill-primary text-primary" : "text-foreground"
                }`}
            />
          </button>

          {/* Size tag */}
          <div className="absolute bottom-3 left-3 rounded-sm bg-background/70 px-2 py-1 backdrop-blur-sm">
            <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-foreground">
              Size {product.size}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <p className="font-body text-xs text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-heading text-sm font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-body text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
            Condition: {product.condition}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
