"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import {ShippingDetails, OrderSummary} from "@/components/Shop";
import { INITIAL_CART_ITEMS } from "@/constants/shopCategories";

export default function CheckoutPage() {
  return (
    <div className="p-6 w-full mx-auto h-screen overflow-auto">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/shop" },
          { label: "Cart", href: "/shop/cart" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-10">
          <section className="px-6">
            <h2 className="text-lg font-semibold mb-4">Information</h2>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded mb-2 text-sm"
            />
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-red-500 font-medium cursor-pointer">
                Sign In
              </span>
            </p>
          </section>
        <ShippingDetails />
        </div>
        <div className="h-full md:pl-8 md:border-l border-gray-300">
          <OrderSummary onPay={() => {}} items={INITIAL_CART_ITEMS} shipping={1000} />
        </div>
      </div>
    </div>
  );
}
