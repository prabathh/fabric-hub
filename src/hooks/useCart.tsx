import { useState } from "react";
import { INITIAL_CART_ITEMS } from "@/constants/shopCategories";

export const useCart = () => {
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
    const [promoCode, setPromoCode] = useState("");

    const updateQuantity = (itemId: string, change: number) => {
        setCartItems((prev) => {
            const newItems = prev.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + change }
                    : item
            ).filter(item => item.quantity > 0);
            return newItems;
        });
    };

    const removeItem = (itemId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    
    const shipping = 15.0;
    const couponDiscount = 45.0; 

    const total = subtotal + shipping - couponDiscount;

    const savingsPercentage = subtotal > 0
        ? (couponDiscount / (subtotal + couponDiscount)) * 100
        : 0;

    return {
        cartItems,
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
