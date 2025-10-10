import { create } from 'zustand';
import { FetchProductsResult } from '@/types/product'; 

interface CachedProductData {
    [id: string]: FetchProductsResult;
}

interface ProductCacheState {
    cache: CachedProductData;
    setCache: (id: string, data: FetchProductsResult) => void;
    getCache: (id: string) => FetchProductsResult | undefined;
}

export const useProductCacheStore = create<ProductCacheState>((set, get) => ({
    cache: {},
    setCache: (id, data) => set((state) => ({
        cache: {
            ...state.cache,
            [id]: data,
        },
    })),
    getCache: (id) => get().cache[id],
}));