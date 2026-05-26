import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ to, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const numericEnd = parseFloat(to) || 0;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(numericEnd * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const formatted = Number.isInteger(parseFloat(to))
    ? Math.floor(val).toLocaleString()
    : val.toFixed(1);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-light text-gold-gradient">
      {formatted}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: "10000", suffix: "+", label: "Readings Generated" },
  { value: "95", suffix: "%", label: "User Satisfaction" },
  { value: "5000", suffix: "+", label: "Years of Vedic Wisdom" },
  { value: "24", suffix: "×7", label: "AI Guidance Available" },
];

export default function SocialProof() {
  return (
    <section
      data-testid="social-proof"
      className="relative border-y border-white/5 bg-white/[0.012] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              data-testid={`stat-${i}`}
              className="text-center"
            >
              <Counter to={s.value} suffix={s.suffix} />
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-white/50">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
