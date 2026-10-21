import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, GitCompareArrows, ArrowUpRight, Gauge, Zap, Fuel, Check } from "lucide-react";
import type { Car } from "../data/cars";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../utils/conversions";
import { kmhToMph } from "../utils/conversions";

function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare, compareIds, unit } = useApp();
  const [imgError, setImgError] = useState(false);
  const fav = isFavorite(car.id);
  const inCompare = isInCompare(car.id);
  const compareFull = !inCompare && compareIds.length >= 3;

  const fallback = "https://images.pexels.com/photos/35319488/pexels-photo-35319488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="card-sheen group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121215] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]/40 hover:shadow-[0_28px_80px_rgba(212,175,55,0.14)]"
    >
      <div className="img-zoom relative aspect-[16/10] overflow-hidden">
        <img
          src={imgError ? fallback : car.image}
          onError={() => setImgError(true)}
          alt={`${car.fullName} — ${car.category}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full border border-[#d4af37]/40 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#eedd8a] backdrop-blur-md">
            {car.modelYear}
          </span>
          <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
            {car.category}
          </span>
        </div>
        <button
          onClick={() => toggleFavorite(car.id)}
          aria-label={fav ? `Remove ${car.fullName} from wishlist` : `Add ${car.fullName} to wishlist`}
          aria-pressed={fav}
          className={`focus-gold absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition-all ${
            fav ? "bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.6)]" : "bg-black/55 text-white hover:bg-black/80 hover:text-[#eedd8a]"
          }`}
        >
          <Heart className={`h-[18px] w-[18px] ${fav ? "fill-current" : ""}`} />
        </button>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">{car.brandDisplay}</p>
          <p className="font-display text-2xl tracking-wide text-white drop-shadow-lg">
            {car.horsepower.toLocaleString()} <span className="text-sm text-[#eedd8a]">HP</span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link to={`/car/${car.id}`} className="focus-gold group/title">
          <h3 className="font-display text-[26px] leading-none tracking-wide text-white transition-colors group-hover/title:text-[#eedd8a]">
            {car.model}
          </h3>
        </Link>
        <p className="mt-1 truncate text-xs font-medium uppercase tracking-[0.14em] text-white/45">{car.engineType}</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-2 py-2.5">
            <Gauge className="mx-auto h-4 w-4 text-[#d4af37]" />
            <p className="mt-1 text-[13px] font-bold text-white">
              {car.topSpeedKmh ? (unit === "metric" ? `${Math.round(car.topSpeedKmh)}` : `${Math.round(kmhToMph(car.topSpeedKmh))}`) : "—"}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">{unit === "metric" ? "km/h max" : "mph max"}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-2 py-2.5">
            <Zap className="mx-auto h-4 w-4 text-[#d4af37]" />
            <p className="mt-1 text-[13px] font-bold text-white">{car.acceleration0To100 ? `${car.acceleration0To100.toFixed(1)}s` : "—"}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">0–100</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-2 py-2.5">
            <Fuel className="mx-auto h-4 w-4 text-[#d4af37]" />
            <p className="mt-1 truncate text-[13px] font-bold text-white">
              {car.fuelEconomyLPer100Km ? `${car.fuelEconomyLPer100Km.toFixed(1)}` : car.electricConsumptionKwhPer100Km ? `${car.electricConsumptionKwhPer100Km.toFixed(0)}` : "—"}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
              {car.fuelEconomyLPer100Km ? "L/100" : "kWh/100"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-white/8 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Est. Price • {car.priceMarket}</p>
            <p className="text-gold-gradient font-display text-[26px] leading-none">{formatPrice(car.estimatedPrice, car.priceCurrency)}</p>
          </div>
          <p className="text-right text-[11px] leading-tight text-white/45">
            {car.transmission.split(" ").slice(0, 2).join(" ")}
            <br />
            {car.drivetrain}
          </p>
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            to={`/car/${car.id}`}
            className="focus-gold flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:bg-[#eedd8a]"
          >
            View Details <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => toggleCompare(car.id)}
            disabled={compareFull}
            aria-label={inCompare ? `Remove ${car.fullName} from compare` : `Add ${car.fullName} to compare`}
            title={compareFull ? "Compare is full (max 3). Remove one first." : inCompare ? "Remove from compare" : "Add to compare"}
            className={`focus-gold grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full border transition-all ${
              inCompare
                ? "border-[#d4af37] bg-[#d4af37]/15 text-[#eedd8a]"
                : compareFull
                  ? "cursor-not-allowed border-white/10 text-white/25"
                  : "border-white/15 text-white/70 hover:border-[#d4af37]/60 hover:text-[#eedd8a]"
            }`}
          >
            {inCompare ? <Check className="h-5 w-5" /> : <GitCompareArrows className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(CarCard);
