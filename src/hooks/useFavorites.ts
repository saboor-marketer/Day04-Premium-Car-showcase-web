import { useApp } from "../context/AppContext";

export function useFavorites() {
  const { favorites, toggleFavorite, isFavorite, clearFavorites } = useApp();
  return { favorites, toggleFavorite, isFavorite, clearFavorites, count: favorites.length };
}
