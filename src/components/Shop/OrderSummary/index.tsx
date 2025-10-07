// // components/Shop/OrderSummary.tsx
// "use client";

// import { IoCartOutline } from "react-icons/io5";
// import { Button } from "@/components/common";
// import { OrderItem } from "@/types/order";
// interface OrderSummaryProps {
//   items: OrderItem[];
//   shipping: number;
//   coupon?: string;
// }

// export default function OrderSummary({
//   items,
//   shipping,
//   coupon = "-",
// }: OrderSummaryProps) {
//   const subtotal = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const total = subtotal + shipping;

//   return (
//     // <div className="h-full pl-8 border-l border-gray-300">
//     <div>
//       <h2 className="text-lg font-semibold mb-8 flex items-center space-x-2">
//         <span className="text-xl">
//           <IoCartOutline />
//         </span>
//         <span>Your Order</span>
//       </h2>

//       {/* Items */}
//       <div className="space-y-8 mb-10">
//         {items.map((item, idx) => (
//           <div key={idx} className="flex space-x-5">
//             <div className="w-30 h-30 bg-gray-200 rounded" />
//             <div className="flex-1">
//               <p className="text-base font-semibold">{`${item.name}`}</p>
//               {/* <p className="text-sm text-gray-600">Colour: {item.color}</p> */}
//               <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
//               <p className="text-sm text-gray-600 mt-1">
//                 Unit: Rs {item.price.toLocaleString()}.00
//               </p>
//               <p className="text-base font-bold mt-2">
//                 Rs {(item.price * item.quantity).toLocaleString()}.00
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Calculations */}
//       <div>
//         <div className="text-sm text-gray-700 space-y-2">
//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>Rs {subtotal.toLocaleString()}.00</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Shipping</span>
//             <span>Rs {shipping.toLocaleString()}.00</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Coupon</span>
//             <span>{coupon}</span>
//           </div>
//         </div>

//         <div className="border-t border-gray-300 my-4" />

//         <div className="flex justify-between items-center">
//           <span className="text-lg font-bold">Total</span>
//           <span className="text-xl font-bold">
//             Rs {total.toLocaleString()}.00
//           </span>
//         </div>
//       </div>

//       <div className="mt-8">
//         <Button
//           theme="dark"
//           className="w-full duration-200"
//           onClick={() => alert("Proceeding to payment...")}
//         >
//           Pay Now
//         </Button>
//       </div>
//     </div>
//   );
// }


// components/Shop/OrderSummary.tsx

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
