"use client";

import Image from "next/image";
import cotton from "../../../../public/assets/cotton.png";
import polyester from "../../../../public/assets/polyster.png";
import linen from "../../../../public/assets/linen.png";

const categories = [
  { name: "COTTON", img: cotton },
  { name: "POLYESTER", img: polyester },
  { name: "LINEN", img: linen },
];

export default function FeaturedCategories() {
  return (
    <section className="w-full py-12">
      {/* Title */}
      <h2 className="text-center text-2xl font-medium mb-8">
        Featured Categories
      </h2>

      {/* Categories Row */}
      <div className="flex flex-row justify-center gap-8 px-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative flex-1 max-w-[320px] h-[300px] cursor-pointer overflow-hidden shadow-md"
          >
            {/* Background Image */}
            <Image
              src={cat.img}
              alt={cat.name}
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[rgba(217,217,217,0.5)] flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
