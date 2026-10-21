import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, Heart, GitCompareArrows, Crown } from "lucide-react";
import { useApp } from "../context/AppContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Cars" },
  { to: "/brands", label: "Brands" },
  { to: "/compare", label: "Compare Cars" },
  { to: "/about", label: "About Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { favorites, compareIds, searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate("/explore");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-[0_10px_40px_rgba(0,0,0,0.6)]" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="focus-gold group flex items-center gap-3" aria-label="AUTO ELITE home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#f6ecb8] via-[#d4af37] to-[#8f7320] shadow-[0_0_24px_rgba(212,175,55,0.35)]">
            <Crown className="h-5 w-5 text-black" strokeWidth={2.4} />
          </span>
          <span className="leading-none">
            <span className="font-display block text-[22px] tracking-[0.18em] text-white">
              AUTO <span className="text-gold-gradient">ELITE</span>
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.32em] text-white/50">
              World of Performance
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `focus-gold rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] transition-all ${
                  isActive ? "bg-[#d4af37]/15 text-[#eedd8a]" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="focus-gold grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-[#d4af37]/50 hover:text-[#eedd8a]"
            aria-label="Toggle search"
          >
            {searchOpen ? <X className="h-[18px] w-[18px]" /> : <Search className="h-[18px] w-[18px]" />}
          </button>
          <Link
            to="/favorites"
            className="focus-gold relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-[#d4af37]/50 hover:text-[#eedd8a]"
            aria-label={`Wishlist, ${favorites.length} cars`}
          >
            <Heart className="h-[18px] w-[18px]" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#d4af37] px-1 text-[11px] font-bold text-black">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            to="/compare"
            className="focus-gold relative hidden h-10 items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 text-[13px] font-bold uppercase tracking-wider text-[#eedd8a] transition hover:bg-[#d4af37]/20 sm:flex"
            aria-label={`Compare, ${compareIds.length} cars selected`}
          >
            <GitCompareArrows className="h-4 w-4" />
            <span className="hidden xl:inline">Compare</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#d4af37] px-1 text-[11px] text-black">
              {compareIds.length}/3
            </span>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="focus-gold grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-white/10 bg-black/85 backdrop-blur-xl">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
            <Search className="h-4 w-4 shrink-0 text-[#d4af37]" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brand, model, category, engine — e.g. Ferrari, V12, SUV…"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
              aria-label="Search cars"
            />
            <button type="submit" className="rounded-full bg-[#d4af37] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#eedd8a]">
              Search
            </button>
          </form>
        </div>
      )}

      {open && (
        <nav className="glass-strong border-t border-white/10 px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] ${
                  isActive ? "bg-[#d4af37]/15 text-[#eedd8a]" : "text-white/75 hover:bg-white/5"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/favorites"
            className="mt-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/75"
          >
            Wishlist <span className="rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-xs text-[#eedd8a]">{favorites.length}</span>
          </Link>
          <Link
            to="/compare"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black"
          >
            <GitCompareArrows className="h-4 w-4" /> Compare Cars ({compareIds.length}/3)
          </Link>
        </nav>
      )}
    </header>
  );
}
