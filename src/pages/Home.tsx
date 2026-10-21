import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BadgeCheck, GitCompareArrows, Heart } from "lucide-react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import BrandSection from "../components/BrandSection";
import CarCard from "../components/CarCard";
import UnitToggle from "../components/UnitToggle";
import { brands } from "../data/brands";
import { cars } from "../data/cars";

export default function Home() {
  const spotlight = [...cars].sort((a, b) => b.horsepower - a.horsepower).slice(0, 3);

  return (
    <main>
      <Hero />
      <Stats />

      {/* Brand marquee */}
      <div className="overflow-hidden border-b border-white/8 bg-black py-5" aria-hidden>
        <div className="marquee-track flex w-max items-center gap-12 pr-12">
          {[...brands, ...brands].map((b, i) => (
            <span key={b.id + i} className="font-display flex items-center gap-12 text-2xl tracking-[0.2em] text-white/25">
              {b.name.toUpperCase()} <span className="text-[#d4af37]/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Spotlight */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-label="Performance spotlight">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">Curator's Selection</p>
            <h2 className="font-display mt-2 text-[clamp(2.2rem,5vw,3.8rem)] leading-none text-white">
              HALL OF <span className="text-gold-gradient">POWER</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
              The three most powerful machines in the collection — from Molsheim's W16 to Sant'Agata's V12 hybrid.
              Every figure linked to its manufacturer source.
            </p>
          </div>
          <UnitToggle />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {spotlight.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>

      {/* Brand quick nav */}
      <nav className="sticky top-[72px] z-30 border-y border-white/8 bg-[#060607]/85 backdrop-blur-xl" aria-label="Brand sections">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <span className="mr-1 hidden shrink-0 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white/40 sm:block">Jump to:</span>
          {brands.map((b) => (
            <a
              key={b.id}
              href={`#brand-${b.id}`}
              className="focus-gold shrink-0 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#eedd8a]"
            >
              {b.name}
            </a>
          ))}
          <Link to="/explore" className="ml-auto hidden shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[#eedd8a] hover:underline md:block">
            All 21 →
          </Link>
        </div>
      </nav>

      {/* Brand sections */}
      <div className="gold-line mx-auto max-w-7xl" />
      {brands.map((b, i) => (
        <div key={b.id}>
          <BrandSection brand={b} flip={i % 2 === 1} />
          {i < brands.length - 1 && <div className="mx-auto h-px max-w-7xl bg-white/6" />}
        </div>
      ))}

      {/* Why section */}
      <section className="relative overflow-hidden border-y border-white/8 bg-[#0b0b0e] py-16" aria-label="Why Auto Elite">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: "radial-gradient(800px 300px at 50% 0%, rgba(212,175,55,0.35), transparent 70%)" }} />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            { icon: BadgeCheck, title: "Sourced, not guessed", text: "Every car lists its version, market and a manufacturer reference. Where data isn't published, we show N/A — never invented figures." },
            { icon: GitCompareArrows, title: "Compare up to 3", text: "Power, torque, 0–100, top speed in both units, consumption, range, gearbox, drivetrain and price — with best-in-class highlighted." },
            { icon: Heart, title: "Wishlist that remembers", text: "Heart any icon and it persists in your browser. Build a garage, switch km/h ↔ mph instantly, and share your shortlist." },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#d4af37]/12 text-[#eedd8a]"><Icon className="h-5 w-5" /></span>
              <h3 className="font-display mt-4 text-2xl tracking-wide text-white">{title.toUpperCase()}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative mx-auto mt-10 flex max-w-7xl flex-wrap justify-center gap-4 px-4">
          <Link to="/explore" className="focus-gold group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-black hover:bg-[#eedd8a]">
            Browse all 21 cars <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/compare" className="focus-gold inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#eedd8a] hover:bg-[#d4af37]/20">
            Open comparison <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
