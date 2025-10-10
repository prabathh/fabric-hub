"use client";

import { useRouter } from "next/navigation";
import CartItem from "@/components/Shop/CartItem";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/common";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import { formatCurrency } from "@/helper/utils";

export default function CartPage() {
  const {
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
  } = useCart();

  const router = useRouter();
  const itemCount = cartItems.length;

  return (
    <div className="p-6 w-full mx-auto">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[{ label: "Home", href: "/shop" }, { label: "Cart" }]}
      />
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-1">
        <div className="md:col-span-3">
          <div className="hidden md:flex justify-between items-center text-sm text-gray-500 px-4">
            <span className="flex-1">Product</span>
            <span className="mr-6">Quantity</span>
            <span className="w-32 text-right">Price</span>
            <span className="w-4 pl-4"></span>
          </div>
          <div className="overflow-y-auto max-h-[55vh]">
            {itemCount === 0 ? (
              <p className="text-center text-gray-500 py-10">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))
            )}
          </div>
          <h2 className="text-xl font-semibold mt-4 hidden md:block">
            Your Items ({itemCount})
          </h2>
        </div>

        <div className="md:col-span-1 h-fit">
          <h2 className="text-md font-semibold mb-4 uppercase">
            Order Summary
          </h2>
          <div className="space-y-3 mb-6">
            <div className="flex">
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-red-500 focus:border-red-500 text-sm"
              />
              <button className="p-2 bg-gray-800 text-white rounded-r hover:bg-gray-700 text-sm">
                Apply
              </button>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Coupon</span>
              <span className="text-red-500">
                -{formatCurrency(couponDiscount)}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-300 my-4" />

          {couponDiscount > 0 && (
            <p className="text-sm text-red-600 font-semibold mb-4">
              You save {formatCurrency(couponDiscount)} 
              {/* ({savingsPercentage.toFixed(0)}%) */}
            </p>
          )}

          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-xl font-bold">{formatCurrency(total)}</span>
          </div>

          <Button
            theme="secondary"
            onClick={() => router.push("/shop/cart/checkout")}
            disabled={itemCount === 0}
            className="w-full"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
