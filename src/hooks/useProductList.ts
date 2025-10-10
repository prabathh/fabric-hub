// import { useState, useEffect } from "react";
// import { AVAILABLE_TAGS } from "@/constants/shopCategories";
// import { useCategoryStore } from "@/store/useCategoryStore";
// import { fetchProductsByCategory, fetchProductsByTag } from "@/lib/product";
// import { FetchProductsResult } from "@/types/product";

// interface ProductListState {
//   items: FetchProductsResult;
//   loading: boolean;
//   pageName: string | null;
// }

// const initialFetchResult: FetchProductsResult = {
//   products: [],
//   lastDoc: null,
//   hasMore: false,
// };

// export const useProductList = (id: string, forceFetch: boolean = false) => {
// const { categories } = useCategoryStore(); 
//   const [state, setState] = useState<ProductListState>({
//     items: initialFetchResult,
//     loading: true,
//     pageName: null,
//   });

//   useEffect(() => {
//     const loadProducts = async () => {
//       setState((prev) => ({
//         ...prev,
//         loading: true,
//         items: initialFetchResult,
//         pageName: null,
//       }));

//       let fetchResult: FetchProductsResult = initialFetchResult;
//       let pageName: string | null = null;

//       const categoryMatch = categories.find((c) => c.id === id);
//       const tagMatch = AVAILABLE_TAGS.find((f) => f.id === id);

//       try {
//         if (categoryMatch) {
//           pageName = categoryMatch.name;
//           fetchResult = await fetchProductsByCategory(id);
//         } else if (tagMatch) {
//           pageName = tagMatch.name;
//           fetchResult = await fetchProductsByTag(id);
//         }
//       } catch (error) {
//         console.error(`Failed to fetch products for ${id}:`, error);
//       }

//       setState({
//         items: fetchResult,
//         loading: false,
//         pageName,
//       });
//     };

//     loadProducts();
//   }, [id, categories, forceFetch]);

//   return state;
// };


// @/hooks/useProductList.ts (or wherever your hook resides)

import { useState, useEffect } from "react";
import { AVAILABLE_TAGS } from "@/constants/shopCategories";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductCacheStore } from "@/store/useProductCacheStore"; // NEW: Import cache store
import { fetchProductsByCategory, fetchProductsByTag } from "@/lib/product";
import { FetchProductsResult } from "@/types/product";

interface ProductListState {
  items: FetchProductsResult;
  loading: boolean;
  pageName: string | null;
}

const initialFetchResult: FetchProductsResult = {
  products: [],
  lastDoc: null,
  hasMore: false,
};

export const useProductList = (id: string, forceFetch: boolean = false) => {
  const { categories } = useCategoryStore();
  const { getCache, setCache } = useProductCacheStore(); // Access cache methods
    
  const [state, setState] = useState<ProductListState>({
    items: initialFetchResult,
    loading: true,
    pageName: null,
  });

  useEffect(() => {
    const loadProducts = async () => {
      const cachedData = getCache(id);
      
      if (cachedData && !forceFetch) {
        const categoryMatch = categories.find((c) => c.id === id);
        const tagMatch = AVAILABLE_TAGS.find((f) => f.id === id);
    
        const pageName = categoryMatch?.name || tagMatch?.name || null;
        
        setState({
          items: cachedData,
          loading: false,
          pageName,
        });
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: true,
        items: initialFetchResult,
        pageName: null,
      }));

      let fetchResult: FetchProductsResult = initialFetchResult;
      let pageName: string | null = null;

      const categoryMatch = categories.find((c) => c.id === id);
      const tagMatch = AVAILABLE_TAGS.find((f) => f.id === id);

      try {
        if (categoryMatch) {
          pageName = categoryMatch.name;
          fetchResult = await fetchProductsByCategory(id);
        } else if (tagMatch) {
          pageName = tagMatch.name;
          fetchResult = await fetchProductsByTag(id);
        }
      } catch (error) {
        console.error(`Failed to fetch products for ${id}:`, error);
      }

      if (fetchResult.products.length > 0) {
        setCache(id, fetchResult);
      }

      setState({
        items: fetchResult,
        loading: false,
        pageName,
      });
    };

    if (categories.length > 0 || AVAILABLE_TAGS.some(t => t.id === id)) {
        loadProducts();
    }
  }, [id, categories, forceFetch, getCache, setCache]); // Add cache methods to deps

  return state;
};