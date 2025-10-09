"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { OrderItem } from "@/types/order";
import { FaArrowLeft } from "react-icons/fa";

interface ViewOrderPageProps {
  orderId?: string;
  date?: string;
  customerName?: string;
  status?: "Completed" | "Pending" | "Cancelled";
  items?: OrderItem[];
  subtotal?: number;
  shipping?: number;
  discount?: number;
}

export default function ViewOrderPage({
  orderId = "#0001",
  date = "23 September 2025",
  customerName = "Arthur Morgan",
  status = "Completed",
  items = [
    {
      id: "1",
      name: "Cotton Blend Marrakech Bloom - CB-MB-2025",
      code: "CB-MB-2025",
      colour: "Blue",
      price: 2500,
      quantity: 1,
      image: "/assets/cotton.png",
    },
    {
      id: "2",
      name: "Linen Blend Marrakech Bloom - LB-MB-2025",
      code: "LB-MB-2025",
      colour: "Blue",
      price: 1500,
      quantity: 1,
      image: "/assets/cotton.png",
    },
  ],
  subtotal = 4000,
  shipping = 1000,
  discount = 0,
}: ViewOrderPageProps) {
  const router = useRouter();
  const total = subtotal + shipping - discount;

  return (
    <div className="flex-1 w-full flex flex-col p-8 space-y-8 min-h-screen">
     
      <button
        onClick={() => router.push("/dashboard/sales")}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 mb-4"
      >
        <FaArrowLeft className="text-gray-700 w-4 h-4" />
      </button>

      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold">{orderId}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {date} | {customerName}
          </p>
        </div>
        <span
          className={`px-4 py-1 text-sm font-medium rounded-full ${
            status === "Completed"
              ? "bg-green-100 text-green-700"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Items List */}
      <div className="space-y-5">
        {(items || []).map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 mt-6 pt-4 text-sm">
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">Rs {subtotal.toLocaleString()}.00</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">Rs {shipping.toLocaleString()}.00</span>
        </div>
        {/* {that block only runs if discount > 0.} */}
        {discount > 0 && (
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">
              - Rs {discount.toLocaleString()}.00
            </span>
          </div>
        )}
        <div className="flex justify-between py-2 mt-2 border-t border-gray-100">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-bold">
            Rs {total.toLocaleString()}.00
          </span>
        </div>
      </div>

      {/* Invoice Button */}
      <div className="mt-8 flex justify-center">
        <Button
          theme="dark"
          size="medium"
          className="rounded-xl"
          onClick={() => alert("Invoice generated successfully!")}
        >
          Generate Invoice
        </Button>
      </div>
    </div>
  );
}

interface OrderItemCardProps {
  item: OrderItem;
}

function OrderItemCard({ item }: OrderItemCardProps) {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
      
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className="object-cover"
        />
      </div>

      {/* product info */}
      <div className="flex-1 min-w-0 px-4">
        <p className="text-lg font-semibold truncate">{item.name}</p>
        <p className="text-md text-gray-500 mt-1">Colour: {item.color}</p>
      </div>

      {/* price & quantity */}
      <div className="flex flex-col items-end text-right">
        <p className="text-lg font-bold">
          Rs {itemTotal.toLocaleString()}.00
        </p>
        <p className="text-md text-gray-500 mt-1">Qty: {item.quantity}</p>
      </div>
    </div>
  );
}
