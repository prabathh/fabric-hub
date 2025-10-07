import { create } from "zustand";
import { fetchCategories } from "@/lib/category";
import { CategoryStore } from "@/types/category";

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  loadCategories: async (forceFetch = false) => {
    const { categories, isLoading } = get();

    // Caching Check: If data exists, not loading, and not forcing a fetch, return early.
    if (!forceFetch && categories.length > 0 && !isLoading) {
      return;
    }

    // Prevent concurrent loading
    if (isLoading) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const data = await fetchCategories();
      set({ categories: data, isLoading: false });
    } catch (err) {
      console.error("Error fetching categories:", err);
      set({ error: "Failed to load categories", isLoading: false });
    }
  },
}));
