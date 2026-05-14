import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/data/products";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity } = useCart();

  const subtotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[60vh] flex-col items-center justify-center text-center"
            >
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
              <h1 className="font-heading text-3xl font-black text-foreground">
                Your Cart is Empty
              </h1>
              <p className="mt-2 font-body text-muted-foreground">
                Start shopping to add items to your cart
              </p>
              <Button asChild variant="default" size="lg" className="mt-8">
                <Link to="/shop">Continue Shopping</Link>
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
              Shopping Cart
            </h1>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex gap-4 border border-border rounded-lg p-4 bg-card"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.images?.[0] || ""}
                        alt={item.product.name}
                        className="h-24 w-24 object-cover rounded-sm"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="block"
                      >
                        <p className="font-body text-xs text-muted-foreground">
                          {item.product.brand}
                        </p>
                        <h3 className="font-heading text-sm font-bold text-foreground hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                        <p className="font-body text-xs text-muted-foreground mt-1">
                          Size {item.product.size}
                        </p>
                      </Link>
                      <p className="font-heading text-sm font-bold text-foreground mt-2">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-2"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-border rounded-sm">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 hover:bg-accent transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-heading text-sm font-bold px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:bg-accent transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-fit border border-border rounded-lg bg-card p-6 sticky top-20"
            >
              <h2 className="font-heading text-lg font-bold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="text-foreground">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-heading text-lg font-bold border-t border-border pt-3 mt-3">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mt-6 gap-2"
                onClick={() => navigate("/checkout")}
              >
                <span>Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full mt-3"
              >
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
