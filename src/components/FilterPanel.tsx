import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { brands } from "../data/brands";
import { categories, fuelTypes } from "../data/cars";

export interface Filters {
  brand: string;
  category: string;
  fuelType: string;
  minHp: number;
  maxPrice: number;
  minTopSpeed: number;
  sort: string;
}

export const defaultFilters: Filters = {
  brand: "all",
  category: "all",
  fuelType: "all",
  minHp: 0,
  maxPrice: 5000000,
  minTopSpeed: 0,
  sort: "featured",
};

export default function FilterPanel({
  filters,
  setFilters,
  resultCount,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  resultCount: number;
}) {
  const set = (patch: Partial<Filters>) => setFilters({ ...filters, ...patch });
  const reset = () => setFilters(defaultFilters);

  const selectCls =
    "focus-gold w-full rounded-xl border border-white/12 bg-[#16161a] px-3 py-2.5 text-sm text-white focus:border-[#d4af37]/60";

  return (
    <div className="rounded-3xl border border-white/10 bg-[#101013]/90 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#eedd8a]">
          <SlidersHorizontal className="h-4 w-4" /> Filters & Sorting
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-white/50">{resultCount} result{resultCount === 1 ? "" : "s"}</span>
          <button onClick={reset} className="focus-gold inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70 hover:border-[#d4af37]/50 hover:text-[#eedd8a]">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Brand</span>
          <select value={filters.brand} onChange={(e) => set({ brand: e.target.value })} className={selectCls} aria-label="Filter by brand">
            <option value="all">All brands (7)</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Vehicle type</span>
          <select value={filters.category} onChange={(e) => set({ category: e.target.value })} className={selectCls} aria-label="Filter by vehicle type">
            <option value="all">All types</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Fuel type</span>
          <select value={filters.fuelType} onChange={(e) => set({ fuelType: e.target.value })} className={selectCls} aria-label="Filter by fuel type">
            <option value="all">All fuels</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Sort by</span>
          <select value={filters.sort} onChange={(e) => set({ sort: e.target.value })} className={selectCls} aria-label="Sort cars">
            <option value="featured">Featured order</option>
            <option value="speed">Highest top speed</option>
            <option value="power">Highest horsepower</option>
            <option value="priceAsc">Lowest estimated price</option>
            <option value="priceDesc">Highest estimated price</option>
            <option value="alpha">Alphabetical (A–Z)</option>
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-5 border-t border-white/8 pt-5 md:grid-cols-3">
        <div>
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
            <span>Min power</span>
            <span className="text-[#eedd8a]">{filters.minHp} HP</span>
          </div>
          <input type="range" min={0} max={1600} step={25} value={filters.minHp} onChange={(e) => set({ minHp: Number(e.target.value) })} className="mt-2 w-full" aria-label="Minimum horsepower" />
        </div>
        <div>
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
            <span>Max price (USD eq.)</span>
            <span className="text-[#eedd8a]">${(filters.maxPrice / 1000).toFixed(0)}k</span>
          </div>
          <input type="range" min={30000} max={5000000} step={10000} value={filters.maxPrice} onChange={(e) => set({ maxPrice: Number(e.target.value) })} className="mt-2 w-full" aria-label="Maximum price" />
        </div>
        <div>
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
            <span>Min top speed</span>
            <span className="text-[#eedd8a]">{filters.minTopSpeed} km/h</span>
          </div>
          <input type="range" min={0} max={440} step={5} value={filters.minTopSpeed} onChange={(e) => set({ minTopSpeed: Number(e.target.value) })} className="mt-2 w-full" aria-label="Minimum top speed" />
        </div>
      </div>
    </div>
  );
}
