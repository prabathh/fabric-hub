import { useState, useEffect } from "react";
import { Product } from "@/types/product"; 
import { fetchProductById } from "@/lib/product"; 
import { useProductCacheStore } from "@/store/useProductCacheStore";

interface ProductDetailState {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

export const useProductDetail = (productId: string) => {
    const [state, setState] = useState<ProductDetailState>({
        product: null,
        loading: true,
        error: null,
    });
    
    const { cache } = useProductCacheStore(); 

    useEffect(() => {
        if (!productId) {
            setState({ product: null, loading: false, error: "Product ID is missing." });
            return;
        }

        const loadProduct = async () => {
            setState(prev => ({ ...prev, loading: true, error: null }));
            
            let fetchedProduct: Product | null = null;
            
            for (const key in cache) {
                const result = cache[key];
                const cachedItem = result.products.find(p => p.id === productId);
                if (cachedItem) {
                    fetchedProduct = cachedItem;
                    break; 
                }
            }

            if (!fetchedProduct) {
                try {
                    fetchedProduct = await fetchProductById(productId);
                } catch (err) {
                    const errorMessage = (err as Error).message || "An unknown error occurred while fetching the product.";
                    setState({ product: null, loading: false, error: errorMessage });
                    return;
                }
            }

            setState({
                product: fetchedProduct,
                loading: false,
                error: fetchedProduct ? null : "Product not found.",
            });
        };

        loadProduct();
    }, [productId, cache]); 

    return state;
};