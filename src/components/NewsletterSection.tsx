import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list! Watch for exclusive drops.");
      setEmail("");
    }
  };

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "hsl(var(--beige))" }}
    >
      <div className="container-wide text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl font-black tracking-tight sm:text-4xl"
          style={{ color: "hsl(var(--jet))" }}
        >
          Stay In The Loop
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-md font-body text-sm"
          style={{ color: "hsl(var(--jet) / 0.7)" }}
        >
          Get early access to drops, exclusive pieces, and style updates. No spam, just drip.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-8 flex max-w-md gap-3"
        >
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 rounded-sm border-none font-body text-sm"
            style={{
              backgroundColor: "hsl(var(--jet))",
              color: "hsl(0 0% 100%)",
            }}
          />
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="h-12 shrink-0"
          >
            Subscribe
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;
