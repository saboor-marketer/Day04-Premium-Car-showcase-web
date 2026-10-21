import { Link } from "react-router-dom";
import { Crown, Globe, AtSign, Play, Share2, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { brands } from "../data/brands";

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-[#d4af37]/15 bg-[#08080a]" aria-label="Footer">
      <div className="gold-line" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#f6ecb8] via-[#d4af37] to-[#8f7320]">
                <Crown className="h-5 w-5 text-black" strokeWidth={2.4} />
              </span>
              <span className="leading-none">
                <span className="font-display block text-2xl tracking-[0.18em] text-white">AUTO <span className="text-gold-gradient">ELITE</span></span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-white/50">World of Performance</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              A cinematic showcase of 21 performance icons from 7 legendary marques — with verified
              spec sources, metric/imperial conversions and transparent market pricing.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { icon: Globe, label: "Website", href: "https://www.autoelite.example" },
                { icon: AtSign, label: "Social", href: "https://x.com" },
                { icon: Play, label: "Video channel", href: "https://youtube.com" },
                { icon: Share2, label: "Share", href: "https://instagram.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`AUTO ELITE on ${label}`}
                  className="focus-gold grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#eedd8a]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Explore">
            <h4 className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[#eedd8a]">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {[
                { to: "/", label: "Home" },
                { to: "/explore", label: "Explore Cars" },
                { to: "/brands", label: "All Brands" },
                { to: "/compare", label: "Compare Cars" },
                { to: "/favorites", label: "Wishlist" },
                { to: "/about", label: "About Us" },
              ].map((l) => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className="transition hover:text-[#eedd8a]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Brands">
            <h4 className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[#eedd8a]">Brands</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {brands.map((b) => (
                <li key={b.id}>
                  <Link to={`/brand/${b.id}`} className="group inline-flex items-center gap-1 transition hover:text-[#eedd8a]">
                    {b.name} <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[#eedd8a]">Concierge</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" /> Boulevard of Dreams 21, Monaco</li>
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-[#d4af37]" /> concierge@autoelite.example</li>
              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-[#d4af37]" /> +377 00 00 00 21</li>
            </ul>
            <div className="mt-5 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-4 text-xs leading-relaxed text-white/55">
              Prices are estimates for the stated market and exclude taxes, options and destination. Specs reference manufacturer data — always confirm with an official retailer.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} AUTO ELITE. Showcase prototype for portfolio purposes. Imagery via Pexels.</p>
          <p className="font-semibold uppercase tracking-[0.2em]">Drive the Extraordinary</p>
        </div>
      </div>
    </footer>
  );
}
