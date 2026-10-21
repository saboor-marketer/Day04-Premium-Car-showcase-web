import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import SearchBar from "../components/SearchBar";
import FilterPanel, { defaultFilters, type Filters } from "../components/FilterPanel";
import CarCard from "../components/CarCard";
import UnitToggle from "../components/UnitToggle";
import { cars } from "../data/cars";
import { useApp } from "../context/AppContext";

export default function ExploreCars() {
  const { searchQuery, setSearchQuery } = useApp();
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = cars.filter((c) => {
      if (filters.brand !== "all" && c.brand !== filters.brand) return false;
      if (filters.category !== "all" && c.category !== filters.category) return false;
      if (filters.fuelType !== "all" && c.fuelType !== filters.fuelType) return false;
      if (c.horsepower < filters.minHp) return false;
      if (c.estimatedPrice > filters.maxPrice) return false;
      if ((c.topSpeedKmh ?? 0) < filters.minTopSpeed) return false;
      if (q) {
        const hay = `${c.brandDisplay} ${c.model} ${c.fullName} ${c.category} ${c.engineType} ${c.fuelType}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    switch (filters.sort) {
      case "speed": list = [...list].sort((a, b) => (b.topSpeedKmh ?? 0) - (a.topSpeedKmh ?? 0)); break;
      case "power": list = [...list].sort((a, b) => b.horsepower - a.horsepower); break;
      case "priceAsc": list = [...list].sort((a, b) => a.estimatedPrice - b.estimatedPrice); break;
      case "priceDesc": list = [...list].sort((a, b) => b.estimatedPrice - a.estimatedPrice); break;
      case "alpha": list = [...list].sort((a, b) => a.fullName.localeCompare(b.fullName)); break;
      default: break;
    }
    return list;
  }, [searchQuery, filters]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">The Collection</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-none text-white">
            EXPLORE <span className="text-gold-gradient">21 CARS</span>
          </h1>
          <UnitToggle />
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
          Search by brand, model, category or engine — then filter by power, speed and price.
          Top speed, range and economy convert live between metric and imperial.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <SearchBar large />
        <p className="text-sm text-white/50">
          Showing <span className="font-bold text-[#eedd8a]">{results.length}</span> of {cars.length} vehicles
        </p>
      </div>

      <div className="mt-5">
        <FilterPanel filters={filters} setFilters={setFilters} resultCount={results.length} />
      </div>

      {results.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#d4af37]/10 text-[#eedd8a]">
            <SearchX className="h-7 w-7" />
          </span>
          <h2 className="font-display mt-5 text-3xl tracking-wide text-white">NO MACHINES MATCH</h2>
          <p className="mt-2 max-w-md text-sm text-white/55">
            Nothing in the 21-car collection matches “{searchQuery}” with the current filters. Try a
            different brand or loosen the power, speed and price sliders.
          </p>
          <button
            onClick={() => { setFilters(defaultFilters); setSearchQuery(""); }}
            className="focus-gold mt-6 rounded-full bg-[#d4af37] px-7 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-black hover:bg-[#eedd8a]"
          >
            Clear search & filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
