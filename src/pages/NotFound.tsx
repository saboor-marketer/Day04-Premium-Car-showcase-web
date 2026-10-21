import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-4 pt-28 text-center">
      <p className="font-display text-[clamp(5rem,15vw,9rem)] leading-none text-white/10">404</p>
      <h1 className="font-display -mt-6 text-5xl tracking-wide text-white">
        OFF THE <span className="text-gold-gradient">TRACK</span>
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
        The page you're chasing doesn't exist — it may have been moved or taken to the pits.
        Let's get you back to the tarmac.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="focus-gold inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-black hover:bg-[#eedd8a]">
          <Home className="h-4 w-4" /> Back home
        </Link>
        <Link to="/explore" className="focus-gold inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white hover:border-[#d4af37]/50 hover:text-[#eedd8a]">
          <Compass className="h-4 w-4" /> Explore cars
        </Link>
      </div>
    </main>
  );
}
