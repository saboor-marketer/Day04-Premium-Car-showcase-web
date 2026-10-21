# AUTO ELITE — The World of Performance Cars

A premium, cinematic luxury-car showcase built with **React 19 + Vite + Tailwind CSS v4**,
**React Router**, **Framer Motion** and **Lucide** icons.

**7 brands × exactly 3 cars = 21 featured vehicles**, each with model-year-specific
specifications, live metric ⇄ imperial conversion, search, filters, sorting, a persistent
wishlist and a 3-way comparison engine.

> 📄 Companion docs: **[REPORT.md](./REPORT.md)** (full project report & requirements traceability) ·
> **[SOURCES.md](./SOURCES.md)** (specification sources for all 21 cars)

---

## 1. Quick start

```bash
# 1 — install dependencies
npm install

# 2 — start the development server (http://localhost:5173)
npm run dev

# 3 — production build  →  dist/index.html
npm run build

# 4 — preview the production build locally
npm run preview
```

**Requirements:** Node.js 18+ (20 LTS recommended) and npm 9+.
No API keys, no `.env` file and no backend are required — the dataset is local and static.

---

## 2. Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| `react` / `react-dom` | 19.2.6 | UI runtime |
| `react-router-dom` | ^7.18.4 | Client-side routing (HashRouter) |
| `framer-motion` | ^14.4.0 | Entrance, scroll and layout animations |
| `lucide-react` | ^1.60.0 | Icon set |
| `clsx` + `tailwind-merge` | 2.1.1 / 3.4.0 | Conditional class utilities |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | 7.3.2 | Build tool / dev server |
| `@vitejs/plugin-react` | 5.1.1 | React Fast Refresh |
| `tailwindcss` + `@tailwindcss/vite` | 4.1.17 | Styling engine |
| `typescript` | 5.9.3 | Type safety |
| `vite-plugin-singlefile` | 2.3.0 | Inlines the build into one `dist/index.html` |

Install extras manually if starting from a bare Vite template:

```bash
npm install react-router-dom framer-motion lucide-react
```

---

## 3. Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero, animated stats, Hall of Power, brand quick-nav, all 7 brand sections |
| `/explore` | Explore Cars | Search + filters + sorting across all 21 cars |
| `/brands` | Brands | Overview of all 7 marques |
| `/brand/:id` | Brand Page | One marque, its 3 cars, prev/next marque navigation |
| `/car/:id` | Car Details | Gallery, overview, full spec table, highlights, similar cars |
| `/compare` | Compare Cars | Side-by-side comparison of up to 3 vehicles |
| `/favorites` | Wishlist | Saved cars (localStorage) |
| `/about` | About Us | Concept, methodology, source list, run instructions |
| `*` | 404 | Branded not-found page with recovery links |

Routing uses **HashRouter** so the single-file production build works when served
from any static path (including `file://` and nested sub-directories).

---

## 4. Features

### Design
- Cinematic full-viewport hero with "DRIVE THE EXTRAORDINARY" and animated entrance
- Black / carbon-grey theme, metallic-gold accents, animated gold-gradient text
- Glassmorphism on navbar, compare tray and pricing panels
- Bebas Neue (display) + Playfair Display (editorial) + Inter (UI) typography
- Rounded car cards with sheen sweep, image zoom and elevation on hover
- Sticky navigation + sticky brand quick-nav with smooth scrolling
- Elegant footer with social links, concierge block and pricing disclaimer

### Functionality
- **Search** by brand, model, category or engine type (navbar + Explore page, shared state)
- **Filters**: brand, vehicle type, fuel type, minimum horsepower, minimum top speed, maximum price
- **Sorting**: top speed, horsepower, lowest price, highest price, alphabetical, featured
- **Unit toggle** (metric ⇄ imperial) available on Home, Explore, Brand, Details and Compare
- **Favorites / wishlist** persisted in `localStorage` with navbar badge and clear-all
- **Comparison** of up to 3 cars with floating tray, best-value crowns and reset
- **Animated counters** for showcase statistics (scoped to this collection, not the market)
- Mobile hamburger menu, back-to-top button, loading fallback, 404 route
- Image lazy loading below the fold + automatic fallback image on load error

### Accuracy
- Every car records its **version**, **model year**, **market** and a **source URL**
- Unpublished values are `null` in data and render as `N/A` / `Not officially specified`
- Metric values are stored once; imperial figures are derived at render time
- Maximum speed, fuel economy and driving range are presented as separate concepts

---

## 5. Project structure

```
src/
├── components/
│   ├── Navbar.tsx          Sticky glass nav, search, wishlist + compare badges, mobile menu
│   ├── Hero.tsx            Cinematic hero with CTAs
│   ├── Stats.tsx           Animated statistic counters
│   ├── BrandSection.tsx    Per-brand intro + 3 car cards + "View All" CTA
│   ├── CarCard.tsx         Reusable card (memoised) with details/compare/favorite controls
│   ├── SearchBar.tsx       Shared search input
│   ├── FilterPanel.tsx     Filters + sorting + reset
│   ├── CompareTray.tsx     Floating comparison tray
│   ├── UnitToggle.tsx      Metric / imperial switch
│   ├── BackToTop.tsx       Scroll-to-top control
│   └── Footer.tsx          Links, brands, concierge, disclaimer
├── pages/
│   ├── Home.tsx  ExploreCars.tsx  BrandsOverview.tsx  BrandPage.tsx
│   ├── CarDetails.tsx  CompareCars.tsx  Favorites.tsx  About.tsx  NotFound.tsx
├── data/
│   ├── cars.ts             All 21 vehicles (single source of truth)
│   └── brands.ts           7 marques with themes and copy
├── context/
│   └── AppContext.tsx      Favorites, compare, unit system, search query
├── hooks/
│   ├── useFavorites.ts     Wishlist helper
│   └── useUnitSystem.ts    Unit-system helper
├── utils/
│   ├── conversions.ts      km/h ⇄ mph, km ⇄ mi, L/100km ⇄ MPG, currency
│   └── formatSpecifications.ts  Display formatters incl. N/A handling
├── App.tsx                 Router, providers, layout shell
├── main.tsx                Entry point
└── index.css               Theme tokens, gold gradients, glass + motion utilities
```

---

## 6. Data model

`src/data/cars.ts` — each of the 21 entries implements the `Car` interface:

```ts
id, brand, brandDisplay, model, fullName, modelYear, version, category, fuelType,
image, gallery, engineType, displacement, horsepower, torqueNm,
acceleration0To100, acceleration0To60, topSpeedKmh,
fuelEconomyLPer100Km, electricConsumptionKwhPer100Km, electricRangeKm,
estimatedRangeKm, fuelTankL, transmission, drivetrain, seatingCapacity, doors,
estimatedPrice, priceCurrency, priceMarket, priceNote,
specificationSource, specificationSourceUrl, description,
exteriorHighlights, interiorHighlights, safetyTech, dimensions
```

Optional specifications are `null` when the manufacturer has not published a figure.

### Conversion formulas (`src/utils/conversions.ts`)

| Conversion | Formula |
|------------|---------|
| km/h → mph | `kmh / 1.60934` |
| km → miles | `km / 1.60934` |
| L/100 km → MPG (US) | `235.214583 / lPer100` |
| 0–100 km/h → 0–60 mph (estimate) | `s × 0.96` — only when no official figure exists, and always labelled |

Only original metric values are stored; no rounded conversions are hard-coded.

---

## 7. The 21 vehicles

| Brand | Cars |
|-------|------|
| **Audi** | RS7 Sportback performance · R8 V10 performance · RS Q8 performance |
| **BMW** | M3 Competition (G80) · M5 (G90) · XM |
| **Bugatti** | Chiron Super Sport · Bolide · Tourbillon |
| **Lamborghini** | Huracán STO · Revuelto · Urus SE |
| **Toyota** | GR Supra · Land Cruiser 300 · GR Corolla |
| **Ferrari** | 296 GTB · SF90 Stradale · Purosangue |
| **Range Rover** | Sport SV · Autobiography · Velar |

---

## 8. Specification sources

Each detail page links directly to its manufacturer reference. Summary:

- **Audi USA / Audi MediaCenter** — RS7 performance, R8 V10 performance, RS Q8 performance
- **BMW USA / BMW M GmbH** — M3 Competition (G80), M5 (G90), XM (G09)
- **Bugatti Automobiles** — Chiron Super Sport, Bolide, Tourbillon
- **Automobili Lamborghini** — Huracán STO, Revuelto, Urus SE
- **Toyota Global / Toyota USA** — GR Supra, Land Cruiser 300, GR Corolla
- **Ferrari S.p.A.** — 296 GTB, SF90 Stradale, Purosangue
- **Land Rover / JLR** — Range Rover Sport SV, Range Rover, Velar

Full per-vehicle table with URLs: **[SOURCES.md](./SOURCES.md)**.

> **Disclaimer.** Prices are estimates for the stated market, before taxes, options,
> destination and dealer charges. Figures vary by model year, market and configuration.
> Maximum speed is not cruising speed; driving range depends on tank/battery capacity and
> conditions. Always confirm with an official retailer.

---

## 9. Imagery

Editorial automotive photography sourced from **Pexels** under the Pexels licence.
Each car has a distinct lead image plus a 3–4 image gallery, meaningful alt text,
`loading="lazy"` below the fold and an automatic cinematic fallback if a URL fails.
No manufacturer logos or brand marks are reproduced.

---

## 10. Accessibility & performance

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), skip-to-content link
- Icon-only buttons carry `aria-label`; toggles expose `aria-pressed` / `aria-expanded`
- Visible gold focus rings (`.focus-gold`) on all interactive controls
- High contrast gold `#d4af37` / white on near-black backgrounds
- Stable `key` props, `memo` on `CarCard`, `useMemo` for filtering, `useCallback` in context
- Lazy image loading, `fetchPriority="high"` on the hero, passive scroll listeners

---

## 11. License & intent

Portfolio / prototype project. Vehicle names and specifications belong to their respective
manufacturers and are used here for informational showcase purposes only.
