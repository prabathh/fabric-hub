"use client";

import { useState } from "react";
import ItemCard from "../ItemCard";
import { Button } from "@/components/common/Button/Button";
import { SAMPLE_ITEMS } from "@/constants/shopCategories";

const filterButtons = ["New Arrivals", "Best Sellers", "Offers"];

export default function FeaturedItemsRow() {
  const [selected, setSelected] = useState("New Arrivals");

  return (
    <div className="w-full p-8">
      {/* Filter Buttons */}
      <div className="flex justify-center mb-6 gap-6">
        {filterButtons.map((btn) => (
          <button
            key={btn}
            onClick={() => setSelected(btn)}
            className={`pb-1 font-medium ${
              selected === btn
                ? "border-b-2 border-red-500"
                : "border-b-2 border-transparent"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-items-center">
        {SAMPLE_ITEMS.map((item, idx) => (
            <ItemCard
              key={idx}
              itemId={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              categoryId={"new-arrivals"}
            />
        ))}
      </div>

      <Button theme="secondary" size="medium" className="mt-6 mx-auto block">
        Show more
      </Button>
    </div>
  );
}
