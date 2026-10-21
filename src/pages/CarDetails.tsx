import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, GitCompareArrows, Check, Gauge, Zap, Fuel, Timer,
  Cog, CircleDot, Users, Banknote, ExternalLink, ShieldCheck, Sparkles, ChevronRight,
} from "lucide-react";
import { getCar, cars } from "../data/cars";
import { getBrand } from "../data/brands";
import { useApp } from "../context/AppContext";
import CarCard from "../components/CarCard";
import UnitToggle from "../components/UnitToggle";
import NotFound from "./NotFound";
import { kmhToMph, kmToMiles, lPer100ToMpgUS, formatPrice, estimate0to60From0to100 } from "../utils/conversions";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const car = id ? getCar(id) : undefined;
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare, compareIds, unit } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const [imgError, setImgError] = useState(false);

  const similar = useMemo(() => {
    if (!car) return [];
    return cars
      .filter((c) => c.id !== car.id)
      .map((c) => ({
        c,
        score:
          (c.brand === car.brand ? 3 : 0) +
          (c.category === car.category ? 2 : 0) +
          (Math.abs(c.horsepower - car.horsepower) < 200 ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => s.c);
  }, [car]);

  if (!car) return <NotFound />;
  const brand = getBrand(car.brand);
  const fav = isFavorite(car.id);
  const inCompare = isInCompare(car.id);
  const compareFull = !inCompare && compareIds.length >= 3;
  const gallery = car.gallery.length ? car.gallery : [car.image];
  const mainImg = imgError
    ? "https://images.pexels.com/photos/35319488/pexels-photo-35319488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
    : gallery[Math.min(activeImg, gallery.length - 1)];

  const zero60 = car.acceleration0To60 ?? (car.acceleration0To100 ? estimate0to60From0to100(car.acceleration0To100) : null);
  const zero60Note = car.acceleration0To60 ? "Manufacturer figure" : car.acceleration0To100 ? "Estimated from 0–100 (×0.96)" : "";

  const specRows: { label: string; metric: string; imperial?: string; note?: string }[] = [
    { label: "Engine", metric: car.engineType, imperial: car.displacement ? `${car.displacement.toFixed(1)} L` : undefined },
    { label: "Power", metric: `${car.horsepower.toLocaleString()} HP` },
    { label: "Torque", metric: car.torqueNm ? `${car.torqueNm.toLocaleString()} Nm` : "Not officially specified", note: car.torqueNm ? undefined : "Manufacturer has not published a combined figure" },
    { label: "0–100 km/h", metric: car.acceleration0To100 ? `${car.acceleration0To100.toFixed(1)} s` : "N/A" },
    { label: "0–60 mph", metric: zero60 ? `${zero60.toFixed(1)} s` : "N/A", note: zero60Note },
    {
      label: "Top speed (max, not cruising)",
      metric: car.topSpeedKmh ? `${Math.round(car.topSpeedKmh).toLocaleString()} km/h` : "N/A",
      imperial: car.topSpeedKmh ? `${Math.round(kmhToMph(car.topSpeedKmh)).toLocaleString()} mph` : undefined,
    },
    {
      label: "Fuel economy",
      metric: car.fuelEconomyLPer100Km ? `${car.fuelEconomyLPer100Km.toFixed(1)} L/100 km` : "Not officially specified",
      imperial: car.fuelEconomyLPer100Km ? `${lPer100ToMpgUS(car.fuelEconomyLPer100Km).toFixed(1)} MPG (US)` : undefined,
      note: "Separate from total range — range depends on tank/battery + conditions",
    },
    {
      label: "Electric consumption",
      metric: car.electricConsumptionKwhPer100Km ? `${car.electricConsumptionKwhPer100Km.toFixed(1)} kWh/100 km` : car.fuelType.includes("Hybrid") || car.fuelType.includes("Electric") ? "Not officially specified" : "N/A — combustion only",
    },
    {
      label: "Est. driving range",
      metric: car.estimatedRangeKm ? `~${Math.round(car.estimatedRangeKm).toLocaleString()} km` : "Not officially specified",
      imperial: car.estimatedRangeKm ? `~${Math.round(kmToMiles(car.estimatedRangeKm)).toLocaleString()} mi` : undefined,
    },
    { label: "Transmission", metric: car.transmission },
    { label: "Drivetrain", metric: car.drivetrain },
    { label: "Seating / Doors", metric: `${car.seatingCapacity} seats • ${car.doors} doors` },
    {
      label: "Dimensions (L×W×H)",
      metric: car.dimensions.lengthMm ? `${car.dimensions.lengthMm} × ${car.dimensions.widthMm} × ${car.dimensions.heightMm} mm` : "Not officially specified",
    },
  ];

  return (
    <main className="pb-20">
      {/* Gallery hero */}
      <section className="relative pt-[72px]" aria-label={`${car.fullName} gallery`}>
        <div className="relative h-[52vh] min-h-[380px] overflow-hidden sm:h-[62vh]">
          <motion.img
            key={mainImg}
            initial={{ opacity: 0.4, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={mainImg}
            onError={() => setImgError(true)}
            alt={`${car.fullName} — view ${activeImg + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-[#060607]/25 to-black/30" />
          <div className="absolute left-0 right-0 top-0 mx-auto flex max-w-7xl items-center justify-between px-4 pt-6 sm:px-6 lg:px-8">
            <Link to="/explore" className="focus-gold inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:text-[#eedd8a]">
              <ArrowLeft className="h-4 w-4" /> All cars
            </Link>
            <UnitToggle compact />
          </div>
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <Link to={`/brand/${car.brand}`} className="focus-gold rounded-full border border-[#d4af37]/40 bg-black/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#eedd8a] backdrop-blur-md">
                {car.brandDisplay}
              </Link>
              <span className="rounded-full bg-black/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">{car.category}</span>
              <span className="rounded-full bg-black/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">{car.modelYear} • {car.version.split(",")[0]}</span>
            </div>
            <h1 className="font-display mt-3 text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.95] text-white drop-shadow-2xl">{car.fullName.toUpperCase()}</h1>
            <p className="mt-1 max-w-2xl text-sm text-white/65">{car.version} • {car.fuelType}</p>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          {gallery.map((g, i) => (
            <button
              key={g + i}
              onClick={() => { setActiveImg(i); setImgError(false); }}
              aria-label={`View image ${i + 1} of ${car.fullName}`}
              aria-pressed={i === activeImg}
              className={`focus-gold relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition ${i === activeImg ? "border-[#d4af37]" : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/35319488/pexels-photo-35319488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"; }} />
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8" aria-label="Details">
        <div>
          <div className="rounded-3xl border border-white/10 bg-[#101013] p-6 sm:p-8">
            <h2 className="font-display text-3xl tracking-wide text-white">OVERVIEW</h2>
            <div className="gold-line my-4" />
            <p className="text-[15px] leading-relaxed text-white/70">{car.description}</p>
            {brand && (
              <p className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/55">
                <span className="font-bold text-[#eedd8a]">{brand.name} — {brand.tagline}. </span>
                {brand.description}
              </p>
            )}
            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Zap, k: "Power", v: `${car.horsepower.toLocaleString()} HP` },
                { icon: Timer, k: "0–100 km/h", v: car.acceleration0To100 ? `${car.acceleration0To100.toFixed(1)} s` : "N/A" },
                { icon: Gauge, k: unit === "metric" ? "Top speed" : "Top speed", v: car.topSpeedKmh ? (unit === "metric" ? `${Math.round(car.topSpeedKmh)} km/h` : `${Math.round(kmhToMph(car.topSpeedKmh))} mph`) : "N/A" },
                { icon: Fuel, k: "Economy", v: car.fuelEconomyLPer100Km ? `${car.fuelEconomyLPer100Km.toFixed(1)} L/100` : car.electricConsumptionKwhPer100Km ? `${car.electricConsumptionKwhPer100Km.toFixed(1)} kWh/100` : "N/A" },
              ].map(({ icon: Icon, k, v }) => (
                <div key={k} className="rounded-2xl border border-[#d4af37]/15 bg-[#d4af37]/[0.05] p-4 text-center">
                  <Icon className="mx-auto h-5 w-5 text-[#d4af37]" />
                  <p className="mt-2 text-lg font-extrabold text-white">{v}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">{k}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#101013]">
            <h2 className="font-display px-6 pt-6 text-3xl tracking-wide text-white sm:px-8">FULL SPECIFICATIONS</h2>
            <p className="px-6 text-xs text-white/40 sm:px-8">Original metric values stored; imperial converted live (1 mph = 1.60934 km/h).</p>
            <dl className="mt-4 divide-y divide-white/8">
              {specRows.map((r) => (
                <div key={r.label} className="grid gap-1 px-6 py-3.5 sm:grid-cols-[200px_1fr] sm:gap-4 sm:px-8">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">{r.label}</dt>
                  <dd className="text-sm font-semibold text-white">
                    {r.metric}
                    {r.imperial && <span className="ml-2 font-normal text-[#eedd8a]/90">• {r.imperial}</span>}
                    {r.note && <span className="ml-2 text-xs font-normal italic text-white/40">({r.note})</span>}
                  </dd>
                </div>
              ))}
              <div className="grid gap-1 px-6 py-3.5 sm:grid-cols-[200px_1fr] sm:px-8">
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Source</dt>
                <dd className="text-sm text-white/70">
                  {car.specificationSource}{" "}
                  <a href={car.specificationSourceUrl} target="_blank" rel="noreferrer" className="focus-gold ml-1 inline-flex items-center gap-1 font-semibold text-[#eedd8a] hover:underline">
                    Reference <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { title: "Exterior", icon: Sparkles, items: car.exteriorHighlights },
              { title: "Interior", icon: Users, items: car.interiorHighlights },
              { title: "Safety & Tech", icon: ShieldCheck, items: car.safetyTech },
            ].map(({ title, icon: Icon, items }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-[#101013] p-6">
                <h3 className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#eedd8a]">
                  <Icon className="h-4 w-4" /> {title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {items.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-[13px] leading-snug text-white/65">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d4af37]" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="Purchase and actions">
          <div className="glass rounded-3xl p-6">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50"><Banknote className="h-4 w-4 text-[#d4af37]" /> Price estimate</p>
            <p className="text-gold-gradient font-display mt-2 text-5xl">{formatPrice(car.estimatedPrice, car.priceCurrency)}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">{car.priceCurrency} • {car.priceMarket}</p>
            <p className="mt-3 rounded-xl bg-white/[0.04] p-3 text-xs leading-relaxed text-white/55">{car.priceNote}</p>
            <div className="mt-5 space-y-2.5">
              <button
                onClick={() => toggleFavorite(car.id)}
                aria-pressed={fav}
                className={`focus-gold flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[13px] font-extrabold uppercase tracking-[0.12em] transition ${
                  fav ? "bg-[#d4af37] text-black" : "bg-white text-black hover:bg-[#eedd8a]"
                }`}
              >
                <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} /> {fav ? "Saved to wishlist" : "Add to wishlist"}
              </button>
              <button
                onClick={() => toggleCompare(car.id)}
                disabled={compareFull}
                className={`focus-gold flex w-full items-center justify-center gap-2 rounded-full border py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] transition ${
                  inCompare ? "border-[#d4af37] bg-[#d4af37]/15 text-[#eedd8a]" : compareFull ? "cursor-not-allowed border-white/10 text-white/30" : "border-white/20 text-white hover:border-[#d4af37]/60 hover:text-[#eedd8a]"
                }`}
              >
                <GitCompareArrows className="h-4 w-4" /> {inCompare ? "In compare (tap to remove)" : compareFull ? "Compare full (3/3)" : "Add to compare"}
              </button>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="flex items-center gap-1.5 rounded-xl bg-white/[0.04] px-3 py-2.5 text-white/65"><Cog className="h-4 w-4 text-[#d4af37]" /> {car.transmission.split(" ").slice(0, 3).join(" ")}</span>
                <span className="flex items-center gap-1.5 rounded-xl bg-white/[0.04] px-3 py-2.5 text-white/65"><CircleDot className="h-4 w-4 text-[#d4af37]" /> {car.drivetrain}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#101013] p-6">
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#eedd8a]">At a glance</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Model year", String(car.modelYear)],
                ["Powertrain", car.fuelType],
                ["Engine", car.engineType],
                ["Gearbox", car.transmission],
                ["Drive", car.drivetrain],
                ["Tank / Battery", car.fuelTankL ? `${car.fuelTankL} L` : car.electricRangeKm ? `${car.electricRangeKm} km EV` : "See specs"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3 border-b border-white/6 pb-2.5">
                  <dt className="text-white/45">{k}</dt>
                  <dd className="text-right font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to={`/brand/${car.brand}`} className="focus-gold mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-[#eedd8a] hover:underline">
              More {car.brandDisplay} cars <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Similar vehicles">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl tracking-wide text-white">SIMILAR <span className="text-gold-gradient">MACHINES</span></h2>
          <Link to="/explore" className="focus-gold hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-[#eedd8a] sm:inline-flex">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {similar.map((c, i) => (
            <CarCard key={c.id} car={c} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
