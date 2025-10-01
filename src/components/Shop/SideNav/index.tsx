"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SHOP_NAV_CATEGORIES } from "@/constants/shopCategories";

interface SideNavProps {
  isOpen: boolean;
  sideNavRef: React.RefObject<HTMLDivElement | null>; 
  topOffset: number;
  onClose: (open: boolean) => void;
}

export default function SideNav({ isOpen, sideNavRef, topOffset, onClose }: SideNavProps) {
  const router = useRouter();

  // Handle button navigation
  const handleNavigation = (slug: string) => {
    router.push(`/shop/${slug}`);
    onClose(false);
  };

  return (
    <div
      ref={sideNavRef}
      style={{ top: topOffset }}
      className={`fixed left-0 bottom-0 md:w-[400px] w-3/5 bg-white z-50 transform transition-transform duration-300 shadow-lg overflow-y-auto border-1 border-gray-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="flex flex-col gap-3 p-4">
        {SHOP_NAV_CATEGORIES?.map((cat) => (
          <button
            key={cat.slug}
            className={`${
              cat.special
                ? "text-red-500 font-semibold text-left"
                : "text-gray-800 hover:text-blue-600 text-left"
            } p-2 text-lg`}
            onClick={() => handleNavigation(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
