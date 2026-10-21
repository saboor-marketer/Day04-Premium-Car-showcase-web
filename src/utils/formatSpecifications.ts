import { formatPrice, kmhToMph, kmToMiles, lPer100ToMpgUS } from "./conversions";

export type UnitSystem = "metric" | "imperial";

export function formatSpeed(kmh: number | null, unit: UnitSystem): string {
  if (kmh == null) return "N/A";
  if (unit === "metric") return `${Math.round(kmh).toLocaleString()} km/h`;
  return `${Math.round(kmhToMph(kmh)).toLocaleString()} mph`;
}

export function formatSpeedDual(kmh: number | null): string {
  if (kmh == null) return "N/A";
  return `${Math.round(kmh).toLocaleString()} km/h • ${Math.round(kmhToMph(kmh)).toLocaleString()} mph`;
}

export function formatRange(km: number | null, unit: UnitSystem): string {
  if (km == null) return "N/A";
  if (unit === "metric") return `~${Math.round(km).toLocaleString()} km`;
  return `~${Math.round(kmToMiles(km)).toLocaleString()} mi`;
}

export function formatRangeDual(km: number | null): string {
  if (km == null) return "Not officially specified";
  return `~${Math.round(km).toLocaleString()} km / ~${Math.round(kmToMiles(km)).toLocaleString()} mi`;
}

export function formatFuel(lPer100: number | null, unit: UnitSystem): string {
  if (lPer100 == null) return "N/A";
  if (unit === "metric") return `${lPer100.toFixed(1)} L/100 km`;
  return `${lPer100ToMpgUS(lPer100).toFixed(1)} MPG (US)`;
}

export function formatFuelDual(lPer100: number | null): string {
  if (lPer100 == null) return "Not officially specified";
  return `${lPer100.toFixed(1)} L/100 km • ${lPer100ToMpgUS(lPer100).toFixed(1)} MPG`;
}

export function formatConsumption(kwh: number | null): string {
  if (kwh == null) return "N/A";
  return `${kwh.toFixed(1)} kWh/100 km`;
}

export function formatAccel(sec: number | null, unit: UnitSystem): string {
  if (sec == null) return "N/A";
  if (unit === "metric") return `${sec.toFixed(1)} s (0–100 km/h)`;
  return `${sec.toFixed(1)} s (0–100 km/h)`;
}

export function formatPriceWithMarket(price: number, currency: string, market: string): string {
  return `${formatPrice(price, currency)} ${currency} • ${market}`;
}
