import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { brands } from "../data/brands";
import { carsByBrand } from "../data/cars";

export default function BrandsOverview() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">Marques</p>
      <h1 className="font-display mt-2 text-[clamp(2.6rem,6vw,4.5rem)] leading-none text-white">
        7 LEGENDARY <span className="text-gold-gradient">BRANDS</span>
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
        From Ingolstadt precision to Molsheim excess — each marque contributes exactly three icons.
        Select a brand to enter its collection.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {brands.map((b, i) => {
          const list = carsByBrand(b.id);
          const totalHp = list.reduce((s, c) => s + c.horsepower, 0);
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
            >
              <Link
                to={`/brand/${b.id}`}
                className="focus-gold card-sheen group block overflow-hidden rounded-3xl border border-white/10 bg-[#121215] transition hover:border-[#d4af37]/40"
              >
                <div className="img-zoom relative aspect-[16/9] overflow-hidden">
                  <img src={b.heroImage} alt={`${b.name} collection`} loading="lazy" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                    {b.country}
                  </span>
                  <h2 className="font-display absolute bottom-3 left-5 text-4xl tracking-wider text-white">{b.name.toUpperCase()}</h2>
                </div>
                <div className="p-5">
                  <p className="font-serif-lux text-sm italic text-[#eedd8a]/90">“{b.tagline}”</p>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/55">{b.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4 text-xs">
                    <span className="font-semibold text-white/60">{list.length} cars • {totalHp.toLocaleString()} HP combined</span>
                    <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#eedd8a]">
                      Enter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/explore" className="focus-gold inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-black hover:bg-[#eedd8a]">
          Or browse all 21 cars <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
