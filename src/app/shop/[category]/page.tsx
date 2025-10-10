"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ItemCard, ShopFilters } from "@/components/Shop";
import { FaFilter, FaTimes } from "react-icons/fa";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import { Button, Loading } from "@/components/common";
import { useProductList } from "@/hooks/useProductList";
import { useRouter } from "next/navigation";

// TODO Image Imports
import item_1 from "../../../../public/assets/item_1.png";
import item_2 from "../../../../public/assets/item_2.png";
import item_3 from "../../../../public/assets/item_3.png";
import item_4 from "../../../../public/assets/item_4.png";
const rotatingImages = [item_1, item_2, item_3, item_4];

export default function CategoryPage() {
  const router = useRouter();
  const { category: id } = useParams() as { category: string };
  const { items, loading, pageName } = useProductList(id);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const itemsToDisplay = items.products;
  
  const onItemClick = (itemId: string) => {
    router.push(`/shop/${id}/${itemId}`);
  };

  return (
    <div className="w-full overflow-auto p-6 mx-auto relative">
      {" "}
      <Breadcrumbs
        items={[{ label: "Home", href: "/shop" }, { label: pageName! }]}
      />
      
      <div className="flex justify-between items-center mb-4 md:hidden relative z-30">
        <h1 className="text-2xl font-bold uppercase">{pageName}</h1>
        <Button
          size="small"
          onClick={() => setIsMobileFilterOpen((prev) => !prev)}
          className="p-2 bg-gray-100 rounded-lg flex items-center space-x-2 text-gray-700"
        >
          {isMobileFilterOpen ? (
            <FaTimes className="w-4 h-4" />
          ) : (
            <FaFilter className="w-4 h-4" />
          )}
          <span>{isMobileFilterOpen ? "Close Filters" : "Filter Options"}</span>
        </Button>
      </div>

      {isMobileFilterOpen && (
        <div
          className="absolute top-[110px] left-0 right-0 z-20 md:hidden 
                       bg-white shadow-xl border border-gray-200 rounded-lg p-4 mx-6 max-h-[80vh] overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-3">{pageName} Filters</h2>
          <ShopFilters />
          <Button
            size="small"
            theme="attention"
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          >
            <FaTimes className="w-5 h-5" />
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        <aside
          className={`col-span-1 md:block md:pr-6 md:border-r border-gray-200 hidden md:relative md:p-0 md:shadow-none`}
        >
          {loading ? (
            <Loading size="small" />
          ) : (
            <h1 className="hidden md:block text-3xl font-bold uppercase mb-3">
              {pageName}
            </h1>
          )}
          <p className="text-sm text-gray-600 mb-4">
            Browse all our {pageName?.toLowerCase()} items and use the filter to
            refine your options!
          </p>
          <div className="border-t border-gray-200 my-4" />
          <ShopFilters />
        </aside>

        <main className="col-span-1 md:col-span-3">
          {loading ? (
            <Loading size="medium" />
          ) : itemsToDisplay.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {itemsToDisplay.map((item, idx) => (
                  <ItemCard
                    key={item.id}
                    image={rotatingImages[idx % rotatingImages.length]}
                    name={item.name}
                    price={item.price}
                    handleClick={() => onItemClick(item.id)}
                  />
                ))}
              </div>

              {items.hasMore && (
                <div className="text-center mt-8">
                  <Button className="px-6 py-2 bg-gray-800 text-white hover:bg-red-500 transition-colors">
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                No Products Found
              </h2>
              <p className="text-gray-600 mt-2">
                {`We couldn't find any items matching the current filters in **${pageName}**. Try adjusting your criteria!`}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
