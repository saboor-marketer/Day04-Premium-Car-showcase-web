import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import type { Brand } from "../data/brands";
import { carsByBrand } from "../data/cars";
import CarCard from "./CarCard";

export default function BrandSection({ brand, flip = false }: { brand: Brand; flip?: boolean }) {
  const list = carsByBrand(brand.id);
  return (
    <section id={`brand-${brand.id}`} className="relative scroll-mt-24 overflow-hidden py-14 sm:py-20" aria-label={`${brand.name} collection`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ background: `radial-gradient(700px 320px at ${flip ? "20%" : "80%"} 20%, ${brand.accent}, transparent 70%)` }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid items-end gap-8 lg:grid-cols-[1.1fr_1fr] ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: brand.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: brand.accent }}>
                {brand.country} • Est. {brand.founded}
              </span>
            </div>
            <h2 className="font-display mt-3 text-[clamp(2.6rem,6vw,4.6rem)] leading-none text-white">
              {brand.name.toUpperCase()}
            </h2>
            <p className="font-serif-lux mt-1 text-lg italic text-[#eedd8a]/90">“{brand.tagline}”</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">{brand.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/brand/${brand.id}`}
                className="focus-gold group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:border-[#d4af37]/60 hover:text-[#eedd8a]"
              >
                View All {brand.name} Cars <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-[12px] font-semibold text-white/60">
                <MapPin className="h-3.5 w-3.5 text-[#d4af37]" /> {list.length} models showcased
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="img-zoom relative hidden overflow-hidden rounded-3xl border border-white/10 lg:block"
          >
            <img src={brand.heroImage} alt={`${brand.name} hero`} loading="lazy" className="aspect-[16/9] w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="font-display absolute bottom-4 left-5 text-2xl tracking-widest text-white/90">{brand.name.toUpperCase()} COLLECTION</p>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
