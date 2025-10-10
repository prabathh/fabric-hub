import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

export const useCart = () => {
  const {
    items: zustandItems,
    updateQuantity: zustandUpdateQuantity,
    removeItem: zustandRemoveItem,
  } = useCartStore();
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (itemId: string, change: number) => {
    const currentItem = zustandItems.find((item) => item.product.id === itemId);
    const newQuantity = (currentItem?.quantity || 0) + change;
    zustandUpdateQuantity(itemId, newQuantity);
  };

  const removeItem = (itemId: string) => {
    zustandRemoveItem(itemId);
  };

  const subtotal = zustandItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = 15.0;
  const couponDiscount = 45.0;
  const total = subtotal + shipping - couponDiscount;
  const savingsPercentage =
    subtotal > 0 ? (couponDiscount / (subtotal + couponDiscount)) * 100 : 0;

  return {
    cartItems: zustandItems,
    promoCode,
    setPromoCode,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    couponDiscount,
    total,
    savingsPercentage,
  };
};
