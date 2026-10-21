export const KMH_TO_MPH = 1 / 1.60934;
export const KM_TO_MILES = 1 / 1.60934;

export function kmhToMph(kmh: number): number {
  return kmh / 1.60934;
}

export function mphToKmh(mph: number): number {
  return mph * 1.60934;
}

export function kmToMiles(km: number): number {
  return km / 1.60934;
}

export function milesToKm(mi: number): number {
  return mi * 1.60934;
}

/** L/100km -> MPG (US). 235.214583 / L/100km */
export function lPer100ToMpgUS(lPer100: number): number {
  if (!lPer100 || lPer100 <= 0) return 0;
  return 235.214583 / lPer100;
}

export function mpgUSToLPer100(mpg: number): number {
  if (!mpg || mpg <= 0) return 0;
  return 235.214583 / mpg;
}

/** Acceleration 0-100 km/h estimate to 0-60 mph. 0-60 mph ≈ 0-96.56 km/h, roughly 3-4% quicker. Use factor 0.96 when 0-60 not published. */
export function estimate0to60From0to100(s0to100: number): number {
  return Math.round(s0to100 * 0.96 * 10) / 10;
}

export function formatPrice(value: number, currency = "USD", locale = "en-US"): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value.toLocaleString()}`;
  }
}

export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
