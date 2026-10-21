import { useApp } from "../context/AppContext";

export function useUnitSystem() {
  const { unit, setUnit, toggleUnit } = useApp();
  return { unit, setUnit, toggleUnit, isMetric: unit === "metric" };
}
