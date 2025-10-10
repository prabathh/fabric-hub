"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/useCategoryStore";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

interface SideNavProps {
  isOpen: boolean;
  sideNavRef: React.RefObject<HTMLDivElement | null>;
  topOffset: number;
  onClose: (open: boolean) => void;
}

export default function SideNav({
  isOpen,
  sideNavRef,
  topOffset,
  onClose,
}: SideNavProps) {
  const router = useRouter();
  const { categories } = useCategoryStore();

  // Handle button navigation
  const handleNavigation = (slug: string) => {
    router.push(`/shop/${slug}`);
    onClose(false);
  };

  return (
    <div
      ref={sideNavRef}
      style={{ top: topOffset }}
      className={`fixed left-0 bottom-0 md:w-[25vw] w-3/5 bg-white z-50 transform transition-transform duration-300 shadow-lg overflow-y-auto border-1 border-gray-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="flex flex-col justify-between w-full h-full p-4">
        <div className="flex flex-col gap-3 w-full">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              className="w-full text-gray-800 hover:bg-red-50 hover:text-red-600 hover:font-semibold text-left p-3 text-lg font-semibold flex justify-between cursor-pointer"
              onClick={() => handleNavigation(cat.id)}
            >
              <span className="">{cat.name}</span>
              <TbArrowBigRightLinesFilled className="w-5 h-5 text-red-500" />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
