// components/Shop/OrderSummary.tsx
"use client";

import { IoCartOutline } from "react-icons/io5";

interface OrderItem {
  name: string;
  code: string;
  color: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  shipping: number;
  coupon?: string;
}

export default function OrderSummary({ items, shipping, coupon = "-" }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shipping;

  return (
    // <div className="h-full pl-8 border-l border-gray-300">
    <div>
      <h2 className="text-lg font-semibold mb-8 flex items-center space-x-2">
        <span className="text-xl">
          <IoCartOutline />
        </span>
        <span>Your Order</span>
      </h2>

      {/* Items */}
      <div className="space-y-8 mb-10">
        {items.map((item, idx) => (
          <div key={idx} className="flex space-x-5">
            <div className="w-30 h-30 bg-gray-200 rounded" />
            <div className="flex-1">
              <p className="text-base font-semibold">{`${item.name} - ${item.code}`}</p>
              <p className="text-sm text-gray-600">Colour: {item.color}</p>
              <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
              <p className="text-sm text-gray-600 mt-1">Unit: Rs {item.price.toLocaleString()}.00</p>
              <p className="text-base font-bold mt-2">Rs {(item.price * item.quantity).toLocaleString()}.00</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calculations */}
      <div>
        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs {subtotal.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Rs {shipping.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon</span>
            <span>{coupon}</span>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4" />

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-xl font-bold">Rs {total.toLocaleString()}.00</span>
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full py-3 bg-black text-white font-bold uppercase rounded hover:bg-gray-900 transition-colors">
          Pay now
        </button>
      </div>
    </div>
  );
}
