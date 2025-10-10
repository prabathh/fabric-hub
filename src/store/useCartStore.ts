import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  getTotalItems: () => number;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeItem: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      addToCart: (product, quantity) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            return {
              items: [...state.items, { product, quantity }],
            };
          }
        });
      },
      updateQuantity: (productId: string, newQuantity: number) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? { ...item, quantity: newQuantity }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
    }),
    {
      name: "shopping-cart-storage",
    }
  )
);
