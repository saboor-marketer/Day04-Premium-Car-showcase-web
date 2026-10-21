# Specification Sources — AUTO ELITE

Every vehicle in `src/data/cars.ts` stores a `specificationSource` label and a
`specificationSourceUrl`, both surfaced on its detail page under **Full Specifications → Source**.

**How to read this document**

- **Version** — the exact trim/configuration the figures describe. Specs change with model year,
  market and options, so the version is always stated rather than implied.
- **Price** — an *estimate* for the stated market, before taxes, options, destination and dealer
  charges. EU/UK/Middle East prices differ, sometimes substantially.
- **N/A** — the manufacturer has not published a figure. These are stored as `null` and rendered as
  `N/A` or `Not officially specified`. They are never estimated, and never win a comparison row.
- **Top speed** is maximum speed, not cruising speed. **Range** is separate from **fuel economy**.

---

## 1. Audi — 3 cars

| # | Vehicle | Model year | Version | Power | Top speed | Est. price | Market |
|---|---------|-----------|---------|-------|-----------|-----------|--------|
| 1 | Audi RS7 Sportback performance | 2024 | 4.0 TFSI quattro Tiptronic (630 PS EU / 621 hp US) | 621 hp | 305 km/h | $118,500 | USA |
| 2 | Audi R8 V10 performance quattro | 2023 | 5.2 FSI quattro S tronic Coupé (602 hp US) | 602 hp | 331 km/h | $161,395 | USA |
| 3 | Audi RS Q8 performance | 2025 | 4.0 TFSI quattro Tiptronic (631 hp) | 631 hp | 305 km/h | $136,200 | USA |

**Sources**

- Audi USA / Audi MediaCenter — RS7 performance specs → <https://www.audiusa.com/us/web/en/models/a7/rs7-sportback/2024/overview.html>
- Audi USA — R8 V10 performance technical data → <https://www.audiusa.com/us/web/en/models/r8/r8-coupe/2023/overview.html>
- Audi MediaCenter — RS Q8 performance → <https://www.audi-mediacenter.com/en>

**Notes** — RS7 and RS Q8 top speeds require the Dynamic/Dynamic Plus package; the standard
limiter is lower. The R8 was discontinued after the 2023 model year, so street prices now
carry collector premiums. RS Q8 performance German base price ≈ €146,400.

---

## 2. BMW — 3 cars

| # | Vehicle | Model year | Version | Power | Top speed | Est. price | Market |
|---|---------|-----------|---------|-------|-----------|-----------|--------|
| 4 | BMW M3 Competition (G80) | 2024 | 3.0 M TwinPower Turbo I6 RWD, M Steptronic | 503 hp | 290 km/h | $76,700 | USA |
| 5 | BMW M5 Sedan (G90) | 2025 | 4.4 V8 M Hybrid, M xDrive (717 hp system) | 717 hp | 305 km/h | $119,500 | USA |
| 6 | BMW XM (G09) | 2024 | 4.4 V8 M Hybrid, M xDrive (644 hp system) | 644 hp | 270 km/h | $159,000 | USA |

**Sources**

- BMW USA — M3 Sedan technical data → <https://www.bmwusa.com/vehicles/m-models/m3-sedan/overview.html>
- BMW M GmbH — G90 M5 press data → <https://www.bmw-m.com/en/topics/magazine-article-pool/bmw-m5-2024.html>
- BMW USA — XM technical data → <https://www.bmwusa.com/vehicles/m-models/xm/overview.html>

**Notes** — M3 Competition 290 km/h requires the M Driver's Package (250 km/h standard);
Competition xDrive is priced higher than the RWD car listed. M5 and XM are plug-in hybrids:
their electric ranges (≈40 km and ≈48 km WLTP) are stored separately from combined range.
XM Label (738 hp) is a distinct, higher-priced variant and is not the car listed.

---

## 3. Bugatti — 3 cars

| # | Vehicle | Model year | Version | Power | Top speed | Est. price | Market |
|---|---------|-----------|---------|-------|-----------|-----------|--------|
| 7 | Bugatti Chiron Super Sport | 2023 | 8.0 Quad-Turbo W16 (1,578 hp / 1,600 PS) | 1,578 hp | 440 km/h | $3,900,000 | Global (Molsheim) |
| 8 | Bugatti Bolide | 2024 | 8.0 Quad-Turbo W16, track-only (1,578 hp production) | 1,578 hp | 380 km/h | $4,700,000 | Global, track-only |
| 9 | Bugatti Tourbillon | 2026 | 8.3 NA V16 + 3 e-motors (1,775 hp / 1,800 PS) | 1,775 hp | 445 km/h | $4,100,000 | Global |

**Sources**

- Bugatti Automobiles — Chiron Super Sport → <https://www.bugatti.com/chiron-super-sport/>
- Bugatti — Bolide production specification → <https://www.bugatti.com/bolide/>
- Bugatti — Tourbillon reveal, June 2024 → <https://www.bugatti.com/tourbillon/>

**Notes** — The **Bolide** is not road legal; fuel consumption and driving range are not
homologated and are therefore `N/A`. Its 1,824 hp concept figure required 110-octane racing fuel;
the 40-unit production car is quoted at 1,578 hp on 98-octane. The **Tourbillon**'s combined system
torque was not published at reveal and is stored as `null` → displayed as *Not officially specified*;
consumption figures are pending homologation. All three prices are net of taxes.

---

## 4. Lamborghini — 3 cars

| # | Vehicle | Model year | Version | Power | Top speed | Est. price | Market |
|---|---------|-----------|---------|-------|-----------|-----------|--------|
| 10 | Lamborghini Huracán STO | 2023 | 5.2 NA V10 RWD (631 hp / 640 PS) | 631 hp | 310 km/h | $260,000 | USA |
| 11 | Lamborghini Revuelto | 2024 | 6.5 V12 + 3 e-motors PHEV (1,001 hp / 1,015 PS) | 1,001 hp | 350 km/h | $608,000 | USA |
| 12 | Lamborghini Urus SE | 2025 | 4.0 Twin-Turbo V8 PHEV (789 hp / 800 PS) | 789 hp | 312 km/h | $258,000 | USA |

**Sources**

- Lamborghini — Huracán STO technical specs → <https://www.lamborghini.com/en-en/models/huracan/huracan-sto>
- Lamborghini — Revuelto specs → <https://www.lamborghini.com/en-en/models/revuelto>
- Lamborghini — Urus SE → <https://www.lamborghini.com/en-en/models/urus/urus-se>

**Notes** — The Revuelto's listed 725 Nm is the **V12 engine** figure; Lamborghini does not
homologate a single combined system torque number, and this distinction is labelled in the UI.
Revuelto EV range ≈10 km; Urus SE EV range ≈60 km WLTP. STO stands for *Super Trofeo Omologata*
and is the rear-drive, track-focused Huracán.

---

## 5. Toyota — 3 cars

| # | Vehicle | Model year | Version | Power | Top speed | Est. price | Market |
|----|---------|-----------|---------|-------|-----------|-----------|--------|
| 13 | Toyota GR Supra 3.0 Premium | 2024 | 3.0 Twin-Scroll Turbo I6 RWD | 382 hp | 250 km/h | $56,500 | USA |
| 14 | Toyota Land Cruiser 300 GR Sport | 2024 | 3.5 Twin-Turbo V6 4WD, petrol | 409 hp | 210 km/h | $85,000 | Middle East / Global |
| 15 | Toyota GR Corolla Circuit Edition | 2024 | 1.6 Turbo I3 AWD | 300 hp | 230 km/h | $45,500 | USA |

**Sources**

- Toyota USA — GR Supra specs → <https://www.toyota.com/gr-supra/>
- Toyota Global — Land Cruiser 300 newsroom → <https://global.toyota/en/newsroom/toyota/34544887.html>
- Toyota USA — GR Corolla → <https://www.toyota.com/grcorolla/>

**Notes** — GR Supra top speed is electronically limited; a 2.0-litre four-cylinder variant and a
6-speed manual are also offered. The **Land Cruiser 300 is not sold in the USA** — its closest US
equivalent is the Lexus LX 600 — so pricing is market-dependent (UAE / Japan / Australia) and a
3.3-litre twin-turbo diesel V6 (302 hp) is offered in many markets. GR Corolla Core trim is
significantly cheaper than the Circuit Edition listed; an 8-speed automatic joined from MY2025.

---

## 6. Ferrari — 3 cars

| # | Vehicle | Model year | Version | Power | Top speed | Est. price | Market |
|----|---------|-----------|---------|-------|-----------|-----------|--------|
| 16 | Ferrari 296 GTB | 2023 | 3.0 Twin-Turbo V6 PHEV (819 hp / 830 PS) | 819 hp | 330 km/h | $342,000 | USA |
| 17 | Ferrari SF90 Stradale | 2023 | 4.0 Twin-Turbo V8 PHEV (986 hp / 1,000 PS) | 986 hp | 340 km/h | $528,000 | USA |
| 18 | Ferrari Purosangue | 2024 | 6.5 NA V12 4WD (715 hp / 725 PS) | 715 hp | 310 km/h | $398,350 | USA |

**Sources**

- Ferrari — 296 GTB technical specs → <https://www.ferrari.com/en-EN/auto/ferrari-296-gtb>
- Ferrari — SF90 Stradale → <https://www.ferrari.com/en-EN/auto/ferrari-sf90-stradale>
- Ferrari — Purosangue → <https://www.ferrari.com/en-EN/auto/ferrari-purosangue>

**Notes** — Both PHEVs quote ≈25 km of WLTP electric range (296 GTB battery 7.45 kWh), stored
separately from combined range. The *Assetto Fiorano* package adds a substantial premium and alters
weight, aero and damper specification — the listed figures describe the standard car. The
Purosangue is Ferrari's first four-door, four-seat model; Ferrari does not market it as an SUV.

---

## 7. Range Rover — 3 cars

| # | Vehicle | Model year | Version | Power | Top speed | Est. price | Market |
|----|---------|-----------|---------|-------|-----------|-----------|--------|
| 19 | Range Rover Sport SV | 2024 | 4.4 Twin-Turbo V8 MHEV (626 hp / 635 PS) | 626 hp | 290 km/h | $180,300 | USA |
| 20 | Range Rover Autobiography LWB (P530) | 2024 | 4.4 Twin-Turbo V8 AWD | 523 hp | 250 km/h | $144,700 | USA |
| 21 | Range Rover Velar P400 Dynamic HSE | 2024 | 3.0 Turbo I6 MHEV AWD | 395 hp | 250 km/h | $62,300 | USA |

**Sources**

- Land Rover USA — Range Rover Sport SV → <https://www.landroverusa.com/vehicles/range-rover-sport/index.html>
- Land Rover USA — Range Rover → <https://www.landroverusa.com/vehicles/range-rover/index.html>
- Land Rover USA — Range Rover Velar → <https://www.landroverusa.com/vehicles/range-rover-velar/index.html>

**Notes** — Sport SV Edition One/Two limited trims are priced above the standard SV; carbon-fibre
wheels are a weight-saving option. The Autobiography price quoted is the short-wheelbase P530;
LWB and SV Bespoke cost considerably more, and a P550e plug-in hybrid (542 hp) is also offered.
Velar P250 is the cheaper entry engine; a P400e PHEV is offered in EU/UK markets.

---

## 8. Imagery credits

All automotive photography is sourced from **[Pexels](https://www.pexels.com)** under the Pexels
licence (free for commercial and non-commercial use, no attribution required — credited here as
good practice). Photographers featured include Quentin Martinez, Maheshwar Reddy, Deane Bayas,
Ajdin Coric, Anurag Jamwal, DYLBER CAUSHI, Denys Novikov, Adrian Newell, Mike Bird, Jackson Jacob,
Sara Mashhadawi, Connor Scott McManus, Paul Lichtblau and others.

Images are editorial representations of the vehicle class and are not official manufacturer press
assets. No manufacturer logos, badges or brand marks are reproduced as UI elements, in line with
brand-asset usage caution.

---

## 9. Verification method

1. Each figure was entered against the manufacturer's published specification page for the stated
   version and model year.
2. Where a manufacturer publishes both PS and hp, the **hp** value is stored and the PS value is
   noted in the `version` string.
3. Where a figure is market-dependent (price, limiter, fuel economy cycle), the market is recorded
   in `priceMarket` / `priceNote`.
4. Where no official figure exists, `null` is stored — never a guess.
5. 0–60 mph is stored only when officially published; otherwise the UI derives an estimate
   (`0–100 km/h × 0.96`) and explicitly labels it as *Estimated*.
6. All imperial values are computed at render time from the stored metric values, so no rounding
   error is baked into the dataset.

**Last reviewed:** project build date. Manufacturers revise specifications and pricing frequently —
treat this dataset as a showcase snapshot and confirm current figures with an official retailer.
