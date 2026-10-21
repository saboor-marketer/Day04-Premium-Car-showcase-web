import { Ruler } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function UnitToggle({ compact = false }: { compact?: boolean }) {
  const { unit, setUnit } = useApp();
  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-md ${compact ? "p-1" : "p-1.5"}`}
      role="group"
      aria-label="Unit system"
    >
      <Ruler className="ml-2 h-4 w-4 text-[#d4af37]" aria-hidden />
      {(["metric", "imperial"] as const).map((u) => (
        <button
          key={u}
          onClick={() => setUnit(u)}
          aria-pressed={unit === u}
          className={`focus-gold rounded-full font-bold uppercase tracking-[0.14em] transition-all ${
            compact ? "px-3 py-1.5 text-[11px]" : "px-4 py-2 text-xs"
          } ${unit === u ? "bg-[#d4af37] text-black shadow" : "text-white/60 hover:text-white"}`}
        >
          {u === "metric" ? "km • L" : "mi • MPG"}
        </button>
      ))}
    </div>
  );
}
