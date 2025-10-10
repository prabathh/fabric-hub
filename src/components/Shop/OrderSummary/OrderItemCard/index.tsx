import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import item_1 from "../../../../../public/assets/item_2.png";
import { formatCurrency } from "@/helper/utils";

interface SummaryItem {
  product: Product;
  quantity: number;
}

interface OrderItemCardProps {
  item: SummaryItem;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item }) => {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center space-x-3">
        <div className="relative w-16 h-16 flex-shrink-0 border rounded">
          <Image
            //TODO image
            //src={imageSrc}
            src={item_1}
            alt={product.name}
            fill
            className="object-cover rounded"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Quantity Badge */}
          <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 bg-gray-700 text-white text-xs rounded-full">
            {quantity}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{product.name}</span>
          <span className="text-xs text-gray-500">
            Unit Price: {formatCurrency(product.price)}
          </span>
        </div>
      </div>
      <span className="font-semibold text-sm">{formatCurrency(itemTotal)}</span>
    </div>
  );
};

export default OrderItemCard;
