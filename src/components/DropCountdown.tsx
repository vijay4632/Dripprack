import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getNextDrop = () => {
  const now = new Date();
  const next = new Date(now);
  next.setDate(now.getDate() + 3);
  next.setHours(18, 0, 0, 0);
  return next;
};

const DropCountdown = () => {
  const [target] = useState(getNextDrop);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-primary"
        >
          Next Drop Incoming
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-heading text-3xl font-black tracking-tight text-foreground sm:text-4xl"
        >
          Don't Miss Out
        </motion.h2>

        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-6">
          {blocks.map((block) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center rounded-sm border border-border bg-card px-4 py-5 sm:px-8 sm:py-6"
            >
              <span className="font-heading text-3xl font-black text-foreground sm:text-5xl">
                {String(block.value).padStart(2, "0")}
              </span>
              <span className="mt-1 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropCountdown;
