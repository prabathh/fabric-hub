"use client";

import Image from "next/image";
import { OrderItem } from "@/types/order"; 

interface OrderItemCardProps {
  item: OrderItem;
}

export default function OrderItemCard({ item }: OrderItemCardProps) {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex space-x-4 sm:space-x-5 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{item.name}</p>
        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
        <p className="text-xs text-gray-500">
          Unit Price: Rs {item.price.toLocaleString()}.00
        </p>
        <p className="text-base font-bold mt-1">
          Rs {itemTotal.toLocaleString()}.00
        </p>
      </div>
    </div>
  );
}