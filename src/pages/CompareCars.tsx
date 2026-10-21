import { Link } from "react-router-dom";
import { GitCompareArrows, X, RotateCcw, Trophy, Minus, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { cars, getCar, type Car } from "../data/cars";
import { formatPrice, kmhToMph, kmToMiles, lPer100ToMpgUS } from "../utils/conversions";
import UnitToggle from "../components/UnitToggle";

function bestIdx<T>(vals: (T | null)[], better: (a: T, b: T) => boolean): number {
  let bi = -1;
  vals.forEach((v, i) => {
    if (v == null) return;
    if (bi === -1) { bi = i; return; }
    const cur = vals[bi] as T;
    if (better(v, cur)) bi = i;
  });
  // tie check: if all equal, no highlight
  if (bi === -1) return -1;
  const set = new Set(vals.filter((v) => v != null).map(String));
  if (set.size <= 1) return -1;
  return bi;
}

export default function CompareCars() {
  const { compareIds, toggleCompare, removeCompare, clearCompare, unit } = useApp();
  const selected: Car[] = compareIds.map(getCar).filter((c): c is Car => !!c);

  const rows: {
    label: string;
    get: (c: Car) => string;
    raw: (c: Car) => number | null;
    better?: (a: number, b: number) => boolean;
    hint?: string;
  }[] = [
    { label: "Price estimate", get: (c) => `${formatPrice(c.estimatedPrice, c.priceCurrency)} (${c.priceMarket})`, raw: (c) => c.estimatedPrice, better: (a, b) => a < b },
    { label: "Horsepower", get: (c) => `${c.horsepower.toLocaleString()} HP`, raw: (c) => c.horsepower, better: (a, b) => a > b },
    { label: "Torque", get: (c) => (c.torqueNm ? `${c.torqueNm.toLocaleString()} Nm` : "N/A"), raw: (c) => c.torqueNm, better: (a, b) => a > b, hint: "Missing values excluded" },
    { label: "0–100 km/h", get: (c) => (c.acceleration0To100 ? `${c.acceleration0To100.toFixed(1)} s` : "N/A"), raw: (c) => c.acceleration0To100, better: (a, b) => a < b },
    {
      label: unit === "metric" ? "Top speed (km/h)" : "Top speed (mph)",
      get: (c) => (c.topSpeedKmh ? (unit === "metric" ? `${Math.round(c.topSpeedKmh)} km/h` : `${Math.round(kmhToMph(c.topSpeedKmh))} mph`) : "N/A"),
      raw: (c) => c.topSpeedKmh, better: (a, b) => a > b,
    },
    {
      label: "Top speed (dual)",
      get: (c) => (c.topSpeedKmh ? `${Math.round(c.topSpeedKmh)} km/h • ${Math.round(kmhToMph(c.topSpeedKmh))} mph` : "N/A"),
      raw: () => null,
    },
    {
      label: "Fuel / Energy",
      get: (c) => c.fuelEconomyLPer100Km ? (unit === "metric" ? `${c.fuelEconomyLPer100Km.toFixed(1)} L/100 km` : `${lPer100ToMpgUS(c.fuelEconomyLPer100Km).toFixed(1)} MPG`) : c.electricConsumptionKwhPer100Km ? `${c.electricConsumptionKwhPer100Km.toFixed(1)} kWh/100 km` : "N/A",
      raw: (c) => c.fuelEconomyLPer100Km, better: (a, b) => a < b, hint: "Lower is better; hybrids include EV assist",
    },
    {
      label: "Est. range",
      get: (c) => (c.estimatedRangeKm ? (unit === "metric" ? `~${Math.round(c.estimatedRangeKm)} km` : `~${Math.round(kmToMiles(c.estimatedRangeKm))} mi`) : "N/A"),
      raw: (c) => c.estimatedRangeKm, better: (a, b) => a > b,
    },
    { label: "Engine", get: (c) => c.engineType, raw: () => null },
    { label: "Transmission", get: (c) => c.transmission, raw: () => null },
    { label: "Drivetrain", get: (c) => c.drivetrain, raw: () => null },
    { label: "Seats", get: (c) => `${c.seatingCapacity}`, raw: () => null },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">Head to head</p>
          <h1 className="font-display mt-2 text-[clamp(2.6rem,6vw,4.5rem)] leading-none text-white">
            COMPARE <span className="text-gold-gradient">CARS</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/55">
            Select up to 3 cars. Best comparable value in each row is crowned — missing values are
            never guessed and never win.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <UnitToggle compact />
          {selected.length > 0 && (
            <button onClick={clearCompare} className="focus-gold inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:border-[#d4af37]/50 hover:text-[#eedd8a]">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d4af37]/10 text-[#eedd8a]">
            <GitCompareArrows className="h-7 w-7" />
          </span>
          <h2 className="font-display mt-5 text-3xl tracking-wide text-white">NOTHING TO COMPARE YET</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/55">Pick up to three icons from the collection to stage your dream drag race — on paper.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {cars.slice(0, 6).map((c) => (
              <button key={c.id} onClick={() => toggleCompare(c.id)} className="focus-gold inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:border-[#d4af37]/50 hover:text-[#eedd8a]">
                <Plus className="h-3.5 w-3.5" /> {c.model}
              </button>
            ))}
          </div>
          <Link to="/explore" className="focus-gold mt-6 inline-block rounded-full bg-[#d4af37] px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-black hover:bg-[#eedd8a]">
            Browse all 21 cars
          </Link>
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className={`mt-8 grid gap-4 ${selected.length === 1 ? "sm:grid-cols-1 lg:max-w-md" : selected.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
            {selected.map((c) => (
              <div key={c.id} className="relative overflow-hidden rounded-3xl border border-[#d4af37]/25 bg-[#121215]">
                <button onClick={() => removeCompare(c.id)} aria-label={`Remove ${c.model}`} className="focus-gold absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white hover:text-[#eedd8a]">
                  <X className="h-4 w-4" />
                </button>
                <Link to={`/car/${c.id}`}>
                  <img src={c.image} alt={c.fullName} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                </Link>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#eedd8a]">{c.brandDisplay} • {c.modelYear}</p>
                  <Link to={`/car/${c.id}`} className="font-display mt-1 block text-2xl tracking-wide text-white hover:text-[#eedd8a]">{c.model.toUpperCase()}</Link>
                  <p className="mt-1 text-xs text-white/50">{c.engineType}</p>
                </div>
              </div>
            ))}
            {Array.from({ length: 3 - selected.length }).map((_, i) => (
              <Link key={`empty-${i}`} to="/explore" className="focus-gold grid min-h-[220px] place-items-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center transition hover:border-[#d4af37]/50">
                <span>
                  <Plus className="mx-auto h-6 w-6 text-[#d4af37]" />
                  <span className="mt-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/60">Add car {selected.length + i + 1}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10 bg-[#101013]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/40">
                  <th className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/45">Specification</th>
                  {selected.map((c) => (
                    <th key={c.id} className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#eedd8a]">{c.model}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {rows.map((row) => {
                  const raws = selected.map(row.raw);
                  const bi = row.better ? bestIdx(raws, row.better) : -1;
                  return (
                    <tr key={row.label} className="transition hover:bg-white/[0.02]">
                      <th className="px-5 py-3.5 align-top text-[12px] font-bold uppercase tracking-[0.12em] text-white/50">
                        {row.label}
                        {row.hint && <span className="mt-0.5 block text-[10px] font-normal normal-case tracking-normal text-white/30">{row.hint}</span>}
                      </th>
                      {selected.map((c, i) => {
                        const isBest = i === bi;
                        const isMissing = row.get(c) === "N/A" || row.get(c).includes("Not officially");
                        return (
                          <td key={c.id} className={`px-5 py-3.5 font-semibold ${isBest ? "text-[#eedd8a]" : "text-white/80"} ${isMissing ? "italic text-white/35" : ""}`}>
                            <span className="inline-flex items-center gap-1.5">
                              {isBest && <Trophy className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" aria-label="Best in comparison" />}
                              {row.get(c)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/40">
            <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Best-value crowns apply only where comparison is meaningful (numeric, same metric). “N/A” never wins.
            Prices are market-specific estimates; confirm with official retailers.
          </p>
        </>
      )}
    </main>
  );
}
