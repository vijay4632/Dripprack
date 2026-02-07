import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-primary"
            >
              Our Story
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              Born From The
              <br />
              <span className="text-gradient-blue">Culture</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-10 space-y-6 font-body text-base leading-relaxed text-muted-foreground"
            >
              <p>
                Dripprack started in a dorm room. A couple of friends with a sharp eye for 
                style and a love for streetwear culture decided that premium fashion shouldn't 
                cost a fortune — and shouldn't be boring.
              </p>
              <p>
                We handpick every single piece. No random bulk buys, no filler inventory. 
                Each item is inspected, authenticated, and curated with the same attention 
                to detail you'd find at a high-end boutique.
              </p>
              <p>
                We believe in sustainability without compromise. Every piece we sell is a 
                piece saved from landfill. We're proving that thrift doesn't mean settling — 
                it means discovering pieces with character, history, and real quality.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 grid gap-8 border-t border-border pt-16 sm:grid-cols-3"
            >
              {[
                { stat: "500+", label: "Pieces Curated" },
                { stat: "100%", label: "Authenticated" },
                { stat: "Zero", label: "Restocks" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-heading text-3xl font-black text-foreground">
                    {item.stat}
                  </p>
                  <p className="mt-1 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Mission */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-16 border-l-2 border-primary pl-6"
            >
              <p className="font-heading text-xl font-bold italic text-foreground">
                "We're not just selling clothes. We're building a movement — 
                where unique style meets conscious consumption."
              </p>
              <cite className="mt-4 block font-body text-sm not-italic text-muted-foreground">
                — The Dripprack Team
              </cite>
            </motion.blockquote>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
