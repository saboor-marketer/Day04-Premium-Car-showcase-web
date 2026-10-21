import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, GitCompareArrows, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getCar } from "../data/cars";

export default function CompareTray() {
  const { compareIds, removeCompare, clearCompare } = useApp();
  if (compareIds.length === 0) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
      >
        <div className="glass-strong flex items-center gap-3 rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="flex flex-1 items-center gap-2 overflow-x-auto">
            {compareIds.map((id) => {
              const car = getCar(id);
              if (!car) return null;
              return (
                <span key={id} className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-2">
                  <img src={car.image} alt="" className="h-9 w-14 rounded-lg object-cover" loading="lazy" />
                  <span className="max-w-[120px] truncate text-xs font-semibold text-white">{car.model}</span>
                  <button onClick={() => removeCompare(id)} aria-label={`Remove ${car.model} from compare`} className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              );
            })}
            {compareIds.length < 3 && (
              <span className="shrink-0 text-xs text-white/40">{3 - compareIds.length} slot{3 - compareIds.length === 1 ? "" : "s"} left — max 3</span>
            )}
          </div>
          <button onClick={clearCompare} className="hidden shrink-0 text-xs font-semibold text-white/50 underline-offset-2 hover:underline sm:block">
            Clear
          </button>
          <Link
            to="/compare"
            className="focus-gold flex shrink-0 items-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-black hover:bg-[#eedd8a]"
          >
            <GitCompareArrows className="h-4 w-4" /> Compare <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
