import { Search, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function SearchBar({ large = false }: { large?: boolean }) {
  const { searchQuery, setSearchQuery } = useApp();
  return (
    <div className={`relative ${large ? "w-full" : "w-full max-w-md"}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d4af37]" />
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search brand, model, category, engine…"
        aria-label="Search cars by brand, model, category or engine"
        className={`focus-gold w-full rounded-full border border-white/12 bg-white/[0.05] text-white placeholder:text-white/35 backdrop-blur-md transition focus:border-[#d4af37]/60 ${
          large ? "py-4 pl-11 pr-12 text-[15px]" : "py-2.5 pl-11 pr-10 text-sm"
        }`}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
