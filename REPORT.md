# Project Report — AUTO ELITE: The World of Performance Cars

**Type:** Front-end web application (portfolio / real-world prototype)
**Stack:** React 19 · Vite 7 · Tailwind CSS 4 · React Router 7 · Framer Motion · Lucide
**Scope:** 7 brands × 3 cars = 21 vehicles · 9 routes · 12 reusable components
**Status:** Complete — production build verified (`npm run build` → `dist/index.html`)

---

## 1. Executive summary

AUTO ELITE is a premium automotive showcase that presents 21 performance cars from seven
manufacturers as a cinematic, fully interactive marketplace prototype.

The project had two competing goals: it had to **look** like a high-end automotive brand site, and
it had to **behave** like a data product — honest about where numbers come from, explicit about
units, and functional in every control it renders. The design language (carbon black, metallic
gold, Bebas Neue display type, glassmorphism) carries the first goal; a typed, centralised dataset
with per-vehicle source URLs and `null`-safe rendering carries the second.

Every visible interactive element performs a real action. There are no decorative buttons, no
placeholder links, and no fabricated statistics.

---

## 2. Objectives and how they were met

| Objective | Outcome |
|-----------|---------|
| Premium luxury visual identity | Black/carbon theme, gold gradient accents, glassmorphism, cinematic hero, sheen + zoom card interactions |
| Exactly 3 cars per brand, 21 total | Verified programmatically — `grep -c 'id: "' src/data/cars.ts` returns 21; 7 brand sections render 3 cards each |
| Accurate, sourced specifications | Each car stores `version`, `modelYear`, `priceMarket`, `priceNote`, `specificationSource`, `specificationSourceUrl` |
| Dual unit system | Metric stored; imperial derived at render via `conversions.ts`; global toggle persisted to localStorage |
| Working search, filters, sorting | Shared search state, 6 filter dimensions, 6 sort modes, designed empty state |
| Comparison of up to 3 cars | Floating tray + comparison table with best-value crowns and N/A exclusion |
| Persistence | Favorites, compare selection and unit preference survive reloads via localStorage |
| Responsive + accessible | Mobile-first grids, hamburger menu, skip link, ARIA labels, visible focus rings |
| Zero console errors / broken routes | Catch-all 404 route; invalid `:id` params render the branded NotFound page |

---

## 3. Architecture

### 3.1 Layer diagram

```
main.tsx
 └── App.tsx                     HashRouter + AppProvider + layout shell
      ├── Navbar                 global search, wishlist badge, compare badge
      ├── <Routes>               9 routes
      │    └── Pages             compose components, own page-local state only
      ├── Footer
      ├── CompareTray            global, visible whenever compare.length > 0
      └── BackToTop              global scroll control

AppContext  ──>  favorites[] · compareIds[] · unit · searchQuery
data/       ──>  cars.ts (21) · brands.ts (7)        [single source of truth]
utils/      ──>  conversions.ts · formatSpecifications.ts  [pure functions]
```

### 3.2 State strategy

| State | Location | Rationale |
|-------|----------|-----------|
| Favorites, compare, unit, search | `AppContext` | Needed by navbar, cards, tray and multiple pages simultaneously |
| Filters, sort | `ExploreCars` local state | Only one page consumes them; keeps context lean |
| Active gallery image | `CarDetails` local state | Purely presentational, per-page |
| Image error flags | Component local state | Per-image concern, must not re-render siblings |

Context value is wrapped in `useMemo`, and every mutator in `useCallback`, so consumers only
re-render when the data they use actually changes.

### 3.3 Routing

`HashRouter` was chosen deliberately. The production build is inlined by `vite-plugin-singlefile`
into one `dist/index.html`, which may be served from a nested path or even the filesystem.
`BrowserRouter` would 404 on deep links in that environment; `HashRouter` does not.
A `ScrollToTop` listener resets scroll position on every pathname change.

---

## 4. Data architecture

### 4.1 The `Car` interface

All 21 records implement one TypeScript interface, so a missing or mistyped field is a build
error rather than a runtime surprise. Optional specifications are typed `number | null`.

```ts
interface Car {
  id; brand; brandDisplay; model; fullName; modelYear; version; category; fuelType;
  image; gallery[];
  engineType; displacement; horsepower; torqueNm;
  acceleration0To100; acceleration0To60; topSpeedKmh;
  fuelEconomyLPer100Km; electricConsumptionKwhPer100Km; electricRangeKm;
  estimatedRangeKm; fuelTankL;
  transmission; drivetrain; seatingCapacity; doors;
  estimatedPrice; priceCurrency; priceMarket; priceNote;
  specificationSource; specificationSourceUrl; description;
  exteriorHighlights[]; interiorHighlights[]; safetyTech[]; dimensions;
}
```

### 4.2 Accuracy policy

Four rules governed data entry:

1. **Version before value.** Every figure is attached to a named configuration
   (e.g. *"4.0 TFSI quattro Tiptronic (630 PS EU / 621 hp US)"*), because specs diverge between
   markets and model years.
2. **`null`, never a guess.** Unpublished values are stored as `null` and rendered as `N/A` or
   *Not officially specified*. Examples: Bugatti Bolide consumption and range (not homologated —
   track-only), Bugatti Tourbillon combined torque (not published at reveal).
3. **Derived values are labelled.** 0–60 mph is stored only where official. Otherwise the UI
   derives `0–100 km/h × 0.96` and prints *"Estimated from 0–100 (×0.96)"* beside it.
4. **Market-tagged pricing.** Every price carries `priceCurrency`, `priceMarket` and a
   `priceNote` describing what the figure excludes and which variants differ.

### 4.3 Unit handling

Only metric values are stored. Imperial figures are computed at render time:

| Conversion | Formula | Used for |
|------------|---------|----------|
| km/h → mph | `kmh / 1.60934` | Top speed |
| km → miles | `km / 1.60934` | Driving range |
| L/100 km → MPG (US) | `235.214583 / lPer100` | Fuel economy |

Three concepts are deliberately kept distinct throughout the UI, as they are frequently conflated:

- **Maximum speed** — a limiter/aero figure, explicitly labelled *"Top speed (max, not cruising)"*.
- **Fuel economy / energy consumption** — a rate (L/100 km, MPG, kWh/100 km).
- **Driving range** — a distance derived from tank or battery capacity and conditions, shown with
  a `~` prefix and a note that it is separate from economy.

Hybrids additionally store `electricRangeKm` so EV-only range is never confused with total range.

---

## 5. Feature implementation notes

### 5.1 Search
A single `searchQuery` lives in context, so the navbar search and the Explore page search are the
same input. Submitting from the navbar navigates to `/explore`. Matching is a case-insensitive
substring test across brand, model, full name, category, engine type and fuel type — which means
queries like `V12`, `hybrid`, `SUV` or `quattro` all return sensible results.

### 5.2 Filtering and sorting
Six filter dimensions (brand, vehicle type, fuel type, min HP, min top speed, max price) and six
sort modes (top speed, horsepower, price ascending/descending, alphabetical, featured) are computed
in one `useMemo` keyed on `[searchQuery, filters]`. Sorting copies the array rather than mutating
the imported dataset. The empty state names the query, explains why nothing matched, and offers a
one-click reset of both search and filters.

### 5.3 Comparison engine
The interesting problem here is **what counts as a win**. The `bestIdx` helper:

- skips `null` values entirely, so a missing spec can never be crowned;
- returns `-1` when every candidate shares the same value, so identical specs produce no false
  "winner";
- uses a per-row comparator, because lower is better for price, 0–100 and L/100 km, while higher is
  better for power, torque, top speed and range;
- is not applied at all to non-comparable rows (engine type, transmission, drivetrain), which
  render as plain text.

Missing values additionally render in italic grey so they are visually distinct from real data.
Users can remove individual cars from the tray, the table or the card, or reset the whole set.

### 5.4 Persistence
`favorites`, `compareIds` and `unit` are written to `localStorage` on change and read lazily on
mount. All reads and writes are wrapped in `try/catch`, so private-browsing modes or disabled
storage degrade to in-memory state instead of throwing.

### 5.5 Image resilience
Each card and gallery image tracks its own `onError` flag and swaps to a cinematic fallback. The
hero uses `fetchPriority="high"`; everything below the fold uses `loading="lazy"`. Every image has
descriptive alt text naming the vehicle and its category; decorative images use `alt=""`.

---

## 6. Requirements traceability

| Spec section | Requirement | Implementation |
|--------------|-------------|----------------|
| 4A | Navbar with 5 links, search, dark theme | `Navbar.tsx` — sticky glass bar, `NavLink` active states, search drawer, wishlist + compare badges, mobile menu |
| 4B | Hero headline, subtitle, 2 CTAs | `Hero.tsx` — "DRIVE THE EXTRAORDINARY", exact subtitle, Explore Cars + Discover Brands, animated entrance over cinematic image |
| 4C | Animated statistics | `Stats.tsx` — rAF easing counters for 7 brands / 21 cars / body styles / spec sheets, with scope disclaimer beneath |
| 5 | 7 brand sections, 3 cars each, View All, smooth scroll | `BrandSection.tsx` × 7 on Home, per-brand accent glow, sticky brand quick-nav with anchor scrolling |
| 6 | Card fields + 3 actions | `CarCard.tsx` — image, brand, model, year, category, engine, HP, speed, economy, price + market, View Details, Add to Compare, favorite heart |
| 7 | Dual units + toggle | `conversions.ts`, `UnitToggle.tsx` on 5 pages, dual-unit rows on details and compare |
| 8 | Details page | `CarDetails.tsx` — gallery + thumbnails, overview, 13-row spec table, highlights ×3, price disclaimer, similar vehicles, compare CTA |
| 9 | Search, filters, sorting, empty state | `SearchBar.tsx`, `FilterPanel.tsx`, `ExploreCars.tsx` |
| 10 | Compare up to 3, highlight best, remove/reset | `CompareCars.tsx`, `CompareTray.tsx` |
| 11 | Interactive features | All listed controls wired; hamburger, back-to-top, loading fallback, image fallbacks |
| 12 | Distinct real photography | 21 distinct lead images + galleries, alt text, lazy loading, fallbacks |
| 13 | Project structure | Matches the prescribed `components / pages / data / hooks / utils` layout |
| 14 | Centralised data, metric storage | `data/cars.ts` with the full field set; conversions computed in UI |
| 15 | Performance & accessibility | `memo`, `useMemo`, `useCallback`, stable keys, semantic HTML, ARIA, focus rings |
| 16 | Deliverables | Source, dataset, README, REPORT, SOURCES, working build |

---

## 7. Quality assurance

### Verified manually

- All 9 routes load; `/brand/unknown` and `/car/unknown` fall through to the 404 page
- Navbar links, footer links, brand quick-nav anchors and prev/next marque navigation all resolve
- Search from navbar redirects to Explore and preserves the query
- Every filter and sort mode changes the result set; reset restores all 21 cars
- Empty state appears for no-match queries and clears correctly
- Favorites persist across reload; badge count matches the wishlist page
- Compare caps at 3 — a 4th attempt disables the control and explains why via `title`
- Unit toggle updates cards, details and the comparison table simultaneously
- Keyboard: skip link → nav → cards → actions, all with visible gold focus rings
- Breakpoints checked at 375 / 768 / 1024 / 1440 px

### Build

```
vite v7.3.2 building client environment for production...
✓ 2389 modules transformed.
dist/index.html  566 kB │ gzip: 170 kB
✓ built in 4.75s
```

TypeScript compiles clean; no runtime console errors observed.

---

## 8. Known limitations and honest caveats

1. **Pricing drifts.** Manufacturer MSRPs change with model year and options. Figures are snapshot
   estimates with markets stated, not live quotes.
2. **Photography is editorial, not official press media.** Images are licensed Pexels photographs
   representing the vehicle class and colour rather than factory assets for each exact trim. This
   was a deliberate trade-off to avoid using manufacturer media and logos without permission.
3. **Fuel economy cycles differ.** WLTP, EPA and JC08 figures are not directly comparable; values
   follow the source that publishes them, which is why consumption comparisons carry a hint note.
4. **Single-file bundle size.** `vite-plugin-singlefile` inlines JS and CSS into one HTML file
   (~170 kB gzipped). Great for portability, but it forgoes code splitting — a multi-chunk build
   with route-level `React.lazy` would be preferable for a public production deployment.
5. **No backend.** Favorites and comparisons are per-browser; there is no account system or
   cross-device sync.

---

## 9. Possible next steps

- Route-level code splitting plus an image CDN with `srcset`/AVIF for a smaller first paint
- URL-synchronised filters (`/explore?brand=ferrari&sort=power`) so searches are shareable
- A 360° exterior viewer and configurator-style colour picker on the details page
- Unit tests for `conversions.ts` and the `bestIdx` comparison logic (pure functions, easy wins)
- Internationalisation with per-market pricing (EUR / GBP / AED) and localised copy
- `prefers-reduced-motion` handling to disable parallax and counter animations

---

## 10. Deliverables checklist

| # | Deliverable | File / location |
|---|-------------|-----------------|
| 1 | All source files | `src/` — 12 components, 9 pages, 2 data modules, 2 hooks, 2 utils |
| 2 | Dataset of 21 cars across 7 brands | `src/data/cars.ts`, `src/data/brands.ts` |
| 3 | Installation instructions | `README.md` §1 |
| 4 | Required npm dependencies | `README.md` §2 |
| 5 | Dev-server instructions | `README.md` §1 (`npm run dev`) |
| 6 | Routing, search, filters, favorites, comparison | `src/App.tsx`, `ExploreCars`, `CompareCars`, `Favorites` |
| 7 | Responsive styling and animations | `src/index.css`, Framer Motion throughout |
| 8 | Reliable image assets | Pexels URLs + fallback handling in `CarCard`, `CarDetails` |
| 9 | README | `README.md` |
| 10 | Specification source list | `SOURCES.md` (per-vehicle) + in-app links on every detail page |
