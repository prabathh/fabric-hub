"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/Dashboard";
import { Loading } from "@/components/common";
import ProductModal from "@/components/Modal/ProductModal";

//TODO : image upload
import item_1 from "../../../../../public/assets/item_1.png";

const HEADER_TYPES = ["Image", "Name", "Supplier", "Price", "Stock"];

export default function InventoryCategoryPage() {
  const router = useRouter();
  const { category } = useParams() as { category: string };
  const categories = useCategoryStore((s) => s.categories);
  const cat = categories.find((c) => c.id === category) ?? { id: "", name: "" };
  const { products, isLoading, loadProducts } = useProductStore();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadProducts(category);
  }, [category, loadProducts]);

  const handleItemClick = (itemId: string) => {
    router.push(`/dashboard/inventory/${category}/${itemId}`);
  };

  return (
    <div className="flex-1 w-full flex flex-col p-8 space-y-8 min-h-screen">
      <PageHeader
        label={cat?.name || ""}
        description={cat?.description || ""}
        button={"Add Item"}
        onClick={() => setModalOpen(true)}
        Icon={FaPlus}
      />
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        category={{ id: cat?.id, name: cat?.name }}
      />
      <div className="border-gray-100 flex-1 overflow-hidden">
        <div className="overflow-y-auto max-h-[80vh] rounded-xl">
          {isLoading ? (
            <Loading size="medium" />
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white sticky top-0 z-50">
                <tr>
                  {HEADER_TYPES.map((item) => {
                    return (
                      <th
                        key={item}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products?.map((item) => (
                  <tr
                    onClick={() => handleItemClick(item.id)}
                    key={item.id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          //TODO: image upload part
                          src={item_1}
                          //src={item.image || "/images/placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="50px"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rs{item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <span
                        className={
                          item.stock < 1000 ? "text-red-500" : "text-green-600"
                        }
                      >
                        {item.stock.toLocaleString()} m
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {products?.length === 0 && !isLoading && (
          <p className="text-center text-gray-500 py-10">
            No items found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
