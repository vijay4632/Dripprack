import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-primary"
            >
              Get In Touch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 font-heading text-4xl font-black tracking-tight text-foreground sm:text-5xl"
            >
              Contact Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 font-body text-base text-muted-foreground"
            >
              Got questions about a piece, sizing, or delivery? We're here to help.
            </motion.p>

            {/* Social Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex gap-3"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <a
                  href="https://instagram.com/dripprack"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </Button>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 space-y-5 border-t border-border pt-12"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                    className="h-12 rounded-sm border-border bg-card font-body text-sm text-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="h-12 rounded-sm border-border bg-card font-body text-sm text-foreground"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="rounded-sm border-border bg-card font-body text-sm text-foreground"
                  placeholder="How can we help?"
                />
              </div>

              <Button type="submit" variant="default" size="lg" className="gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
