import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Play, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { HERO_IMAGE } from "../data/cars";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden sm:items-center" aria-label="Hero">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          src={HERO_IMAGE}
          alt="Black performance car speeding through a neon city street at night"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,6,7,0.55)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-36 sm:px-6 sm:pb-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-black/50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#eedd8a] backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5" />
          7 Brands • 21 Icons • One Obsession
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="font-display max-w-4xl text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.92] text-white"
        >
          DRIVE THE
          <br />
          <span className="text-gold-gradient">EXTRAORDINARY</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-lg"
        >
          Explore the world's most iconic automotive machines. Discover performance, luxury,
          innovation, and engineering excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/explore"
            className="focus-gold group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f6ecb8] via-[#d4af37] to-[#b8942a] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.14em] text-black shadow-[0_12px_40px_rgba(212,175,55,0.35)] transition hover:shadow-[0_12px_55px_rgba(212,175,55,0.55)]"
          >
            Explore Cars
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/brands"
            className="focus-gold glass inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#d4af37]/50 hover:text-[#eedd8a]"
          >
            <Play className="h-4 w-4 fill-current" />
            Discover Brands
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50"
        >
          <span className="inline-flex items-center gap-2"><Gauge className="h-4 w-4 text-[#d4af37]" /> 440 km/h Club</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#d4af37]" /> Verified Spec Sources</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><Sparkles className="h-4 w-4 text-[#d4af37]" /> Metric / Imperial Units</span>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex"
        aria-hidden
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-[#d4af37] to-transparent" />
      </motion.div>
    </section>
  );
}
