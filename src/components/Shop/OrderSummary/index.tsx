"use client";

import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { Button, Loading } from "@/components/common";
import OrderItemCard from "./OrderItemCard";
import { Product } from "@/types/product";
import { formatCurrency } from "@/helper/utils";

interface SummaryItem {
  product: Product;
  quantity: number;
}

interface OrderSummaryProps {
  items: SummaryItem[];
  subtotal: number;
  shipping: number;
  total: number;
  couponDiscount: number;
  onPay: () => void;
  loading: boolean;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
  couponDiscount,
  onPay,
  loading,
}: OrderSummaryProps) {
  return (
    <div className="bg-white px-6 md:px-8">
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
          items.map((item) => (
            <OrderItemCard key={item.product.id} item={item} />
          ))
        )}
      </div>
      <div>
        <div className="text-sm text-gray-700 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Shipping</span>
            <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Coupon Discount</span>
            <span className="text-red-500">
              -{formatCurrency(couponDiscount)}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4 pt-4" />
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Total</span>
          <span className="text-2xl font-bold text-red-600">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
      <div className="mt-8">
        {loading ? (
          <Loading size="medium" />
        ) : (
          <Button
            theme="dark"
            className="w-full duration-200 py-3 text-lg font-semibold"
            onClick={onPay}
            disabled={items.length === 0}
          >
            Pay Now
          </Button>
        )}
      </div>
    </div>
  );
}
