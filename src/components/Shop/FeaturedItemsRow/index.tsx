"use client";

import { useState } from "react";
import ItemCard from "../ItemCard";
import { Button } from "@/components/common/Button";
import { useProductList } from "@/hooks/useProductList";
import { useRouter } from "next/navigation";

// TODO Image Imports
import item_1 from "../../../../public/assets/item_1.png";
import item_2 from "../../../../public/assets/item_2.png";
import item_3 from "../../../../public/assets/item_3.png";
import item_4 from "../../../../public/assets/item_4.png";
import { Product } from "@/types/product";
import { Loading } from "@/components/common";
const rotatingImages = [item_1, item_2, item_3, item_4];

// const filterButtons = ["New Arrivals", "Best Sellers", "Offers"];
const filterButtons = ["New Arrivals"]

export default function FeaturedItemsRow() {
  const [selected, setSelected] = useState("New Arrivals");
  const router = useRouter();
  const { items, loading } = useProductList('new-arrivals');
  const itemsToDisplay = items.products;
  const onItemClick = (itemId: string) => {
    router.push(`/shop/'new-arrivals'/${itemId}`);
  };

  if (loading) {
    return (
      <Loading size="large" />
    )
  }

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
        {itemsToDisplay.map((item: Product, idx: number) => (
          <ItemCard
                              key={item.id}
                              image={rotatingImages[idx % rotatingImages.length]}
                              name={item.name}
                              price={item.price}
                              handleClick={() => onItemClick(item.id)}
                            />
            // <ItemCard
            //   key={item.id}
            //   itemId={item.id}
            //   image={item.image}
            //   name={item.name}
            //   price={item.price}
            //   categoryId={"new-arrivals"}
            // />
        ))}
      </div>

      <Button theme="secondary" size="medium" className="mt-6 mx-auto block">
        Show more
      </Button>
    </div>
  );
}
