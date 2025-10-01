'"use client";'

import {
  ShopImageSlider,
  FeaturedCategories,
  FeaturedItemsRow,
  ShopFooter,
} from "@/components/Shop";

export default function ShopPage() {
  return (
    <div className="w-full flex flex-col overflow-auto">
      <div className="flex-1 w-full flex flex-col">
        {/* Image Slider */}
        <ShopImageSlider />

        {/* Text Overlay */}
        <div className="w-full text-center py-10">
          <h2 className="text-[30px] font-semibold leading-tight">
            Where Fabric Meets Imagination
          </h2>
          <p className="mt-4  font-medium leading-relaxed max-w-3/4 text-center mx-auto">
            Unleash your creativity with globally sourced, premium fabrics and
            tools made for makers. From rare deadstock finds to luxury European
            textiles, FabricHub is your one-stop destination to dream, design,
            and craft without limits.
          </p>
        </div>

        {/* Featured Categories */}
        <FeaturedCategories />

        {/* Featured Items */}
        <FeaturedItemsRow />
        
        {/* Footer */}
        <ShopFooter />
      </div>
    </div>
  );
}
