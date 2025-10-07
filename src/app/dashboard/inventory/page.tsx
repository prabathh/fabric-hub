"use client";

import { useState } from "react";
import { useServiceStore } from "@/store/useServiceStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/Dashboard";
import CategoryModal from "@/components/Modal/CategoryModal";
import { Loading } from "@/components/common";

export default function InventoryPage() {
  const router = useRouter();
  const { isLoading, categories } = useCategoryStore();
  const { activeNav } = useServiceStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCategoryClick = (slug: string) => {
    router.push(`/dashboard/inventory/${slug}`);
  };

  return (
    <div className="flex-1 w-full flex flex-col p-8 space-y-8 min-h-screen">
      <PageHeader
        label={activeNav.label}
        description={" Stay on top of your stock and manage item categories"}
        button={"Add Category"}
        onClick={() => setModalOpen(true)}
        Icon={FaPlus}
      />
      <CategoryModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      {isLoading ? (
        <Loading size="medium" />
      ) : (
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories?.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 
                         cursor-pointer transition-transform duration-200 
                         hover:shadow-xl hover:scale-[1.02] hover:border-red-300"
              >
                <h3 className="text-xl font-bold text-gray-800 space-x-4 mb-3">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
