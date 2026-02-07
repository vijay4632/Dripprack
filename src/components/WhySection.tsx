import { motion } from "framer-motion";
import { Flame, Leaf, Rocket } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Handpicked Premium",
    description: "Every piece is personally curated for quality, style, and authenticity. No filler, no fakes.",
  },
  {
    icon: Leaf,
    title: "Sustainable Fashion",
    description: "Giving pre-loved pieces a second life. Look good, feel good about your impact.",
  },
  {
    icon: Rocket,
    title: "Limited Drops",
    description: "Once it's gone, it's gone. Each piece is unique — no restocks, no reproductions.",
  },
];

const WhySection = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: "hsl(var(--charcoal))" }}>
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl"
        >
          Why Dripprack?
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm border border-border bg-background/50">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 font-heading text-sm font-bold tracking-[0.1em] text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
