import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getCar } from "../data/cars";
import CarCard from "../components/CarCard";

export default function Favorites() {
  const { favorites, clearFavorites } = useApp();
  const list = favorites.map(getCar).filter((c) => !!c);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">Your garage</p>
          <h1 className="font-display mt-2 text-[clamp(2.6rem,6vw,4.5rem)] leading-none text-white">
            WISH<span className="text-gold-gradient">LIST</span>
          </h1>
          <p className="mt-2 text-sm text-white/55">
            {list.length === 0 ? "Nothing saved yet — tap the heart on any car." : `${list.length} saved machine${list.length === 1 ? "" : "s"} • stored in this browser`}
          </p>
        </div>
        {list.length > 0 && (
          <button onClick={clearFavorites} className="focus-gold inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:border-red-400/50 hover:text-red-300">
            <Trash2 className="h-4 w-4" /> Clear all
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#d4af37]/10 text-[#eedd8a]">
            <Heart className="h-7 w-7" />
          </span>
          <h2 className="font-display mt-5 text-3xl tracking-wide text-white">YOUR GARAGE IS EMPTY</h2>
          <p className="mt-2 max-w-md text-sm text-white/55">Hearts you tap are remembered here — even after you close the tab.</p>
          <Link to="/explore" className="focus-gold mt-6 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-black hover:bg-[#eedd8a]">
            Find your icon <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((car, i) => (
            <CarCard key={car!.id} car={car!} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
