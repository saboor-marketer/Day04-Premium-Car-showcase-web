import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react";
import type { UnitSystem } from "../utils/formatSpecifications";

interface AppState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  compareIds: string[];
  toggleCompare: (id: string) => boolean;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  canAddCompare: boolean;
  unit: UnitSystem;
  setUnit: (u: UnitSystem) => void;
  toggleUnit: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppState | null>(null);

function readLS(key: string, fallback: string[]): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => readLS("autoelite-favorites", []));
  const [compareIds, setCompareIds] = useState<string[]>(() => readLS("autoelite-compare", []));
  const [unit, setUnitState] = useState<UnitSystem>(() => {
    try {
      return (localStorage.getItem("autoelite-unit") as UnitSystem) || "metric";
    } catch {
      return "metric";
    }
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try { localStorage.setItem("autoelite-favorites", JSON.stringify(favorites)); } catch {}
  }, [favorites]);
  useEffect(() => {
    try { localStorage.setItem("autoelite-compare", JSON.stringify(compareIds)); } catch {}
  }, [compareIds]);

  const setUnit = useCallback((u: UnitSystem) => {
    setUnitState(u);
    try { localStorage.setItem("autoelite-unit", u); } catch {}
  }, []);
  const toggleUnit = useCallback(() => {
    setUnitState((p) => {
      const n = p === "metric" ? "imperial" : "metric";
      try { localStorage.setItem("autoelite-unit", n); } catch {}
      return n;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const clearFavorites = useCallback(() => setFavorites([]), []);

  const toggleCompare = useCallback(
    (id: string): boolean => {
      let added = false;
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((c) => c !== id);
        if (prev.length >= 3) return prev;
        added = true;
        return [...prev, id];
      });
      return added;
    },
    []
  );
  const removeCompare = useCallback((id: string) => {
    setCompareIds((prev) => prev.filter((c) => c !== id));
  }, []);
  const clearCompare = useCallback(() => setCompareIds([]), []);
  const isInCompare = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  const value = useMemo<AppState>(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      compareIds,
      toggleCompare,
      removeCompare,
      clearCompare,
      isInCompare,
      canAddCompare: compareIds.length < 3,
      unit,
      setUnit,
      toggleUnit,
      searchQuery,
      setSearchQuery,
    }),
    [favorites, compareIds, unit, searchQuery, toggleFavorite, isFavorite, clearFavorites, toggleCompare, removeCompare, clearCompare, isInCompare, setUnit, toggleUnit]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
