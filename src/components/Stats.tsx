import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, CarFront, Layers, FileCheck2 } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

const items = [
  { icon: Crown, value: 7, suffix: "", label: "Premium Brands", sub: "Audi • BMW • Bugatti • Lamborghini • Toyota • Ferrari • Range Rover" },
  { icon: CarFront, value: 21, suffix: "", label: "Featured Cars", sub: "Exactly 3 icons per marque" },
  { icon: Layers, value: 12, suffix: "+", label: "Body Styles", sub: "Sports cars, luxury sedans & SUVs" },
  { icon: FileCheck2, value: 21, suffix: "", label: "Spec Sheets", sub: "Performance & technical data with sources" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-white/8 bg-[#0a0a0c]" aria-label="Showcase statistics">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-0 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, value, suffix, label, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative px-6 py-10 text-center"
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/8 text-[#eedd8a]">
              <Icon className="h-5 w-5" />
            </span>
            <p className="font-display mt-4 text-5xl text-white">
              <Counter to={value} suffix={suffix} />
            </p>
            <p className="mt-1 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#eedd8a]">{label}</p>
            <p className="mx-auto mt-2 max-w-[220px] text-xs leading-relaxed text-white/45">{sub}</p>
          </motion.div>
        ))}
      </div>
      <p className="border-t border-white/8 bg-black/40 px-4 py-3 text-center text-[11px] tracking-wide text-white/35">
        Figures describe this showcase collection only — not the global automotive market.
      </p>
    </section>
  );
}
