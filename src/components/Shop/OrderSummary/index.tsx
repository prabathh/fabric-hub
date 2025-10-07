"use client";

import React from 'react';
import { IoCartOutline } from "react-icons/io5";
import { Button } from "@/components/common";
import OrderItemCard from "./OrderItemCard"; 
import { OrderItem } from "@/types/order";
import { useOrderCalculations } from "@/hooks/useOrder";

interface OrderSummaryProps {
  items: OrderItem[];
  shipping: number;
  coupon?: string;
  onPay: () => void;
}

export default function OrderSummary({
  items,
  shipping,
  coupon = "N/A",
  onPay,
}: OrderSummaryProps) {
  const {
    formattedSubtotal,
    formattedShipping,
    formattedTotal,
  } = useOrderCalculations(items, shipping);

  return (
    <div className="bg-white px-6 md:px-8 ">
      <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
        <span className="text-2xl">
          <IoCartOutline />
        </span>
        <span>Your Order</span>
      </h2>
      <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No items in order.</p>
        ) : (
          items.map((item, idx) => <OrderItemCard key={idx} item={item} />)
        )}
      </div>
      <div>
        <div className="text-sm text-gray-700 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal</span>
            <span>{formattedSubtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Shipping</span>
            <span>{formattedShipping}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Coupon</span>
            <span className="text-gray-500">{coupon}</span>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4 pt-4" />
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Total</span>
          <span className="text-2xl font-bold text-red-600">
            {formattedTotal}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <Button
          theme="dark"
          className="w-full duration-200 py-3 text-lg font-semibold"
          onClick={onPay}
          disabled={items.length === 0}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}
