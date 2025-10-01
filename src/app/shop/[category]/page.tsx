"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  SHOP_CATEGORIES,
  SAMPLE_ITEMS,
  MOCK_FILTERS,
} from "@/constants/shopCategories";
import { ItemCard } from "@/components/Shop";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function CategoryPage() {
  const { category } = useParams() as { category: string };
  const cat = SHOP_CATEGORIES.find((c) => c.slug === category);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // NOTE: In a real app, you would filter items by cat.slug here:
  const itemsToDisplay = SAMPLE_ITEMS;

  if (!cat) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold">Category not found</h1>
        <p className="text-gray-600 mt-2">
          The category you’re looking for doesn’t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto p-6 mx-auto">
      {/* 1. Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 space-x-2">
        <span>Home</span>
        <span>&gt;</span>
        <span className="font-medium text-gray-800">{cat.name}</span>
      </div>

      {/* MOBILE FILTER TOGGLE BUTTON */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h1 className="text-2xl font-bold uppercase">{cat.name}</h1>
        <button
          onClick={() => setIsMobileFilterOpen((prev) => !prev)}
          className="p-2 bg-gray-100 rounded-lg flex items-center space-x-2 text-gray-700"
        >
          {isMobileFilterOpen ? (
            <FaTimes className="w-4 h-4" />
          ) : (
            <FaFilter className="w-4 h-4" />
          )}
          <span>{isMobileFilterOpen ? "Close Filters" : "Filter Options"}</span>
        </button>
      </div>

      {/* 2. Main Layout: Grid Structure */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        <aside
          className={`col-span-1 md:block border-r md:pr-6 md:border-r border-gray-200 ${
            isMobileFilterOpen ? "block" : "hidden"
          }`}
        >
          <h1 className="hidden md:block text-3xl font-bold uppercase mb-3">
            {cat.name}
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Browse all our new arrivals here and use the filter to refine your
            options!
          </p>
          <div className="border-t border-gray-200 my-4" /> {/* 1px border */}
          {/* FILTER OPTIONS */}
          <div className="space-y-6">
            {/* Price Filter */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Price Range</h3>
              <input type="range" min="0" max="500" className="w-full" />
              <p className="text-sm text-gray-500">$0 - $500</p>
            </div>

            {/* General Filters */}
            {Object.entries(MOCK_FILTERS).map(([key, options]) => (
              <div key={key} className="space-y-2">
                <h3 className="font-semibold text-gray-800">{key}</h3>
                <div className="flex flex-col space-y-1 text-sm">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 text-gray-700 hover:text-red-500 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-red-500 focus:ring-red-500"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT COLUMN (3/4): Product Grid */}
        <main className="col-span-1 md:col-span-3">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {itemsToDisplay.map((item, idx) => (
              <ItemCard
                key={idx}
                image={item.image}
                name={item.name}
                price={item.price}
                itemId={item.id}
                categoryId={cat.slug}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
