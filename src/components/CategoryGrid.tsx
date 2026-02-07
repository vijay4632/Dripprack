import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Jackets", count: 12 },
  { name: "Hoodies", count: 8 },
  { name: "Vintage Streetwear", count: 15 },
  { name: "Oversized Fits", count: 10 },
];

const CategoryGrid = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl"
        >
          Shop By Category
        </motion.h2>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to="/shop"
                className="group flex flex-col items-center justify-center rounded-sm border border-border bg-card p-8 transition-all duration-500 hover:border-primary/50 hover:bg-card/80 sm:p-12"
              >
                <h3 className="font-heading text-sm font-bold tracking-[0.1em] text-foreground transition-colors group-hover:text-primary sm:text-base">
                  {cat.name}
                </h3>
                <p className="mt-2 font-body text-xs text-muted-foreground">
                  {cat.count} Pieces
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
