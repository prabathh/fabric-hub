import { create } from "zustand";
import { fetchProductsByCategory } from "@/lib/product";
import { ProductStore } from "@/types/product";

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  lastDoc: null,
  hasMore: true,

  loadProducts: async (categoryId, forceFetch = false) => {
    const { products, isLoading } = get(); // Access current state using `get()`

    // Caching Check: If not forcing a fetch, data exists, and not loading, exit immediately.
    if (!forceFetch && products.length > 0 && !isLoading) {
        return;
    }

    // Prevent concurrent loading
    if (isLoading) {
        return;
    }

    // Initialize state: Clear products only if this is NOT a continuation load
    set({ isLoading: true, products: [], lastDoc: null, hasMore: true });

    try {
      const { products: newProducts, lastDoc, hasMore } = await fetchProductsByCategory(categoryId);
      set({ products: newProducts, lastDoc, hasMore });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  loadMoreProducts: async (categoryId) => {
    const { lastDoc, products, hasMore, isLoading } = get();
    if (!hasMore || isLoading) return;

    set({ isLoading: true });

    try {
      const result = await fetchProductsByCategory(categoryId, 10, lastDoc);
      set({
        products: [...products, ...result.products],
        lastDoc: result.lastDoc,
        hasMore: result.hasMore,
      });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set({ products: [], lastDoc: null, hasMore: true }),
}));
