import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, BookOpenCheck, Scale, Camera, ArrowRight } from "lucide-react";
import { HERO_IMAGE } from "../data/cars";

const sources = [
  ["Audi USA & MediaCenter", "RS7 / R8 / RS Q8 power, pace & pricing"],
  ["BMW M GmbH / BMW USA", "M3, M5 (G90) & XM hybrid system data"],
  ["Bugatti Automobiles", "Chiron SS, Bolide & Tourbillon reveal specs"],
  ["Lamborghini S.p.A.", "Huracán STO, Revuelto & Urus SE data"],
  ["Toyota Global / Toyota USA", "GR Supra, GR Corolla & Land Cruiser 300"],
  ["Ferrari S.p.A.", "296 GTB, SF90 Stradale & Purosangue"],
  ["Land Rover / JLR", "Sport SV, Autobiography & Velar"],
  ["Pexels photographers", "All editorial imagery (see credits on images)"],
];

export default function About() {
  return (
    <main className="pb-20">
      <section className="relative overflow-hidden pt-[72px]" aria-label="About hero">
        <div className="relative h-[46vh] min-h-[340px]">
          <img src={HERO_IMAGE} alt="Supercar at night" className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-black/40 to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-black/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#eedd8a] backdrop-blur-md">
              <Crown className="h-3.5 w-3.5" /> About Auto Elite
            </p>
            <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,5.5rem)] leading-none text-white">
              OBSESSED WITH <span className="text-gold-gradient">MACHINES</span>
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/65">
              AUTO ELITE is a portfolio-grade showcase of 21 performance icons from 7 marques —
              designed like a cinematic marketplace, engineered like a data product.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pt-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          { icon: BookOpenCheck, title: "Accuracy first", text: "Model-year-specific versions, market-labelled prices and a source on every car. Unknown values show as N/A — never invented." },
          { icon: Scale, title: "Honest units", text: "Metric stored, imperial converted live with 1 mph = 1.60934 km/h. Max speed, cruising, economy and range are kept strictly separate." },
          { icon: Camera, title: "Real photography", text: "Distinct licensed imagery per car with alt text, lazy loading and graceful fallbacks. No repeated generic renders." },
        ].map(({ icon: Icon, title, text }, i) => (
          <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-3xl border border-white/10 bg-[#101013] p-7">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#d4af37]/12 text-[#eedd8a]"><Icon className="h-5 w-5" /></span>
            <h2 className="font-display mt-4 text-2xl tracking-wide text-white">{title.toUpperCase()}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8" aria-label="Sources and running">
        <div className="rounded-3xl border border-white/10 bg-[#101013] p-7 sm:p-8">
          <h2 className="font-display text-3xl tracking-wide text-white">SPECIFICATION SOURCES</h2>
          <p className="mt-2 text-sm text-white/55">Start here to verify any figure. Prices move by market, options and year — always confirm with an official retailer.</p>
          <ul className="mt-6 divide-y divide-white/8">
            {sources.map(([name, desc]) => (
              <li key={name} className="flex items-start justify-between gap-4 py-3">
                <span className="text-sm font-bold text-white">{name}</span>
                <span className="text-right text-xs text-white/50">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-[#d4af37]/20 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-7 sm:p-8">
          <h2 className="font-display text-3xl tracking-wide text-white">RUN IT YOURSELF</h2>
          <div className="mt-4 space-y-3 text-sm">
            {[
              ["1", "npm install", "Install React, Router, Framer Motion, Lucide & Tailwind"],
              ["2", "npm run dev", "Start the Vite dev server with hot reload"],
              ["3", "npm run build", "Production build → dist/index.html"],
            ].map(([n, cmd, desc]) => (
              <div key={cmd} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="flex items-center gap-3 font-mono text-[13px] text-[#eedd8a]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#d4af37] font-sans text-xs font-bold text-black">{n}</span> {cmd}</p>
                <p className="mt-1.5 text-xs text-white/50">{desc}</p>
              </div>
            ))}
          </div>
          <Link to="/explore" className="focus-gold mt-6 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-black hover:bg-[#eedd8a]">
            Start exploring <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
