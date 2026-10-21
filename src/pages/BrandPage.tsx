import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getBrand, brands } from "../data/brands";
import { carsByBrand } from "../data/cars";
import CarCard from "../components/CarCard";
import UnitToggle from "../components/UnitToggle";
import NotFound from "./NotFound";

export default function BrandPage() {
  const { id } = useParams<{ id: string }>();
  const brand = id ? getBrand(id) : undefined;
  if (!brand) return <NotFound />;
  const list = carsByBrand(brand.id);
  const idx = brands.findIndex((b) => b.id === brand.id);
  const prev = brands[(idx - 1 + brands.length) % brands.length];
  const next = brands[(idx + 1) % brands.length];
  const maxSpeed = Math.max(...list.map((c) => c.topSpeedKmh ?? 0));
  const maxHp = Math.max(...list.map((c) => c.horsepower));

  return (
    <main className="pb-20">
      <section className="relative overflow-hidden pt-28" aria-label={`${brand.name} hero`}>
        <div className="absolute inset-0">
          <img src={brand.heroImage} alt={`${brand.name} hero`} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#060607]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
          <Link to="/brands" className="focus-gold inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/75 backdrop-blur-md hover:text-[#eedd8a]">
            <ArrowLeft className="h-4 w-4" /> All brands
          </Link>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: brand.accent }}>
            {brand.country} • Est. {brand.founded}
          </p>
          <h1 className="font-display mt-2 text-[clamp(3rem,8vw,6.5rem)] leading-none text-white">{brand.name.toUpperCase()}</h1>
          <p className="font-serif-lux mt-2 text-xl italic text-[#eedd8a]">“{brand.tagline}”</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">{brand.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">{list.length} models</span>
            <span className="rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">Up to {maxHp.toLocaleString()} HP</span>
            <span className="rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">Up to {maxSpeed} km/h</span>
            <UnitToggle compact />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label={`${brand.name} cars`}>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link to={`/brand/${prev.id}`} className="focus-gold group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#d4af37]/40">
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Previous marque</span>
              <span className="font-display mt-1 block text-2xl tracking-wide text-white group-hover:text-[#eedd8a]">{prev.name.toUpperCase()}</span>
            </span>
            <ArrowLeft className="h-5 w-5 text-white/40 group-hover:text-[#eedd8a]" />
          </Link>
          <Link to={`/brand/${next.id}`} className="focus-gold group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#d4af37]/40">
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Next marque</span>
              <span className="font-display mt-1 block text-2xl tracking-wide text-white group-hover:text-[#eedd8a]">{next.name.toUpperCase()}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#eedd8a]" />
          </Link>
        </div>
      </section>
    </main>
  );
}
