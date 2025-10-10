"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import SideNav from "../SideNav";
import { SHOP_NAV_CATEGORIES } from "@/constants/shopCategories";

export default function ShopNav() {
  const router = useRouter();
  const [isSideOpen, setIsSideOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  // Dynamic Top Position Calculation (Handles responsiveness)
  useEffect(() => {
    const updateOffset = () => {
      if (navRef.current) {
        setTopOffset(navRef.current.getBoundingClientRect().bottom);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // NEW: Outside Click Functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target as Node)
      ) {
        setIsSideOpen(false);
      }
    };

    if (isSideOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideOpen]);
  
  return (
    <div ref={navRef} className="w-full flex px-6 pb-4 relative z-40">
      {/* Left: Shop All Button + State Toggle */}
      <div className="relative z-50">
        <button
          onClick={() => setIsSideOpen(true)}
          className="flex items-center gap-2 text-gray-800 font-semibold"
        >
          {isSideOpen ? <FaBarsStaggered className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          <span>Shop All</span>
        </button>

        {/* SideNav Panel */}
        <SideNav 
          sideNavRef={sideNavRef}
          topOffset={topOffset}
          isOpen={isSideOpen}
          onClose={(open) => setIsSideOpen(open)}
        />
        
      </div>

      {/* Center / Desktop: Other buttons */}
      <div className="hidden md:flex mx-auto items-center gap-10 text-md">
        {SHOP_NAV_CATEGORIES?.map((cat) => (
          <button
            key={cat.slug}
            className={`font-semibold ${
              cat.special
                ? "text-red-500 font-bold"
                : "text-gray-800 hover:text-red-500"
            }`}
            onClick={() => router.replace(`/shop/${cat.slug}`)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
