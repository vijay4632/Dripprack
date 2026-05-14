import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/data/products";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const subtotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "card") {
      if (!formData.cardNumber || formData.cardNumber.length < 13) {
        toast.error("Please enter a valid card number");
        return;
      }
      if (!formData.expiry || !formData.cvv) {
        toast.error("Please enter card expiry and CVV");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!formData.upiId || !formData.upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID (e.g., username@upi)");
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      toast.success("Order placed successfully!");
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-wide">
            <Button
              variant="ghost"
              className="mb-6 gap-2"
              onClick={() => navigate("/cart")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[60vh] flex-col items-center justify-center text-center"
            >
              <h1 className="font-heading text-3xl font-black text-foreground">
                Your Cart is Empty
              </h1>
              <p className="mt-2 font-body text-muted-foreground">
                Add items to your cart before checkout
              </p>
              <Button
                variant="default"
                size="lg"
                className="mt-8"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  if (orderPlaced) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[60vh] flex-col items-center justify-center text-center"
            >
              <CheckCircle className="h-20 w-20 text-primary mb-6" />
              <h1 className="font-heading text-3xl font-black text-foreground">
                Order Confirmed!
              </h1>
              <p className="mt-2 font-body text-muted-foreground max-w-md">
                Thank you for your purchase. Your order has been confirmed and
                will be shipped soon. You'll receive a confirmation email
                shortly.
              </p>
              <div className="mt-8 flex gap-3">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </Button>
              </div>
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
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            onClick={() => navigate("/cart")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <h1 className="font-heading text-3xl font-black text-foreground mb-8">
                Checkout
              </h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground mb-4">
                    Shipping Information
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName" className="mb-2">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="mb-2">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div>
                      <Label htmlFor="email" className="mb-2">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-2">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-card border-border"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="address" className="mb-2">
                      Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="bg-card border-border"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div>
                      <Label htmlFor="city" className="mb-2">
                        City *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="mb-2">
                        State *
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="mb-2">
                        Zip Code *
                      </Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="bg-card border-border"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="border-t border-border pt-8">
                  <h2 className="font-heading text-lg font-bold text-foreground mb-4">
                    Payment Method
                  </h2>

                  {/* Payment Method Selector */}
                  <div className="grid gap-3 md:grid-cols-2 mb-6">
                    <motion.button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="font-heading font-bold text-foreground">
                        💳 Credit/Debit Card
                      </span>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        Visa, Mastercard, American Express
                      </p>
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === "upi"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="font-heading font-bold text-foreground">
                        📱 UPI
                      </span>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        Google Pay, PhonePe, Paytm
                      </p>
                    </motion.button>
                  </div>

                  {/* Card Payment Fields */}
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="cardName" className="mb-2">
                          Cardholder Name *
                        </Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required={paymentMethod === "card"}
                          className="bg-card border-border"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber" className="mb-2">
                          Card Number *
                        </Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required={paymentMethod === "card"}
                          className="bg-card border-border"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="expiry" className="mb-2">
                            Expiry Date *
                          </Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required={paymentMethod === "card"}
                            className="bg-card border-border"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="mb-2">
                            CVV *
                          </Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required={paymentMethod === "card"}
                            className="bg-card border-border"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* UPI Payment Fields */}
                  {paymentMethod === "upi" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="upiId" className="mb-2">
                          UPI ID *
                        </Label>
                        <Input
                          id="upiId"
                          name="upiId"
                          placeholder="username@upi (e.g., john@googleplay)"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          required={paymentMethod === "upi"}
                          className="bg-card border-border"
                        />
                        <p className="font-body text-xs text-muted-foreground mt-2">
                          Enter your UPI ID. You'll receive a payment request on your UPI app.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </motion.div>

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

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm pb-3 border-b border-border last:border-b-0"
                  >
                    <span className="font-body text-muted-foreground">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-heading font-bold text-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

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

              {/* Payment Method Display */}
              <div className="mt-6 p-3 rounded-lg bg-accent/50 border border-border">
                <p className="font-heading text-xs font-bold text-muted-foreground uppercase mb-1">
                  Payment Method
                </p>
                <p className="font-body text-sm text-foreground">
                  {paymentMethod === "card" ? "💳 Credit/Debit Card" : "📱 UPI"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
