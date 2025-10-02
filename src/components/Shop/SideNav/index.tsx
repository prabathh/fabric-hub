"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { SHOP_NAV_CATEGORIES } from "@/constants/shopCategories";
import { Button } from "@/components/common/Button/Button";
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
  const { setCurrentUser } = useAuthStore();

  // Handle button navigation
  const handleNavigation = (slug: string) => {
    router.push(`/shop/${slug}`);
    onClose(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      onClose(false);
      router.replace("/shop");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div
      ref={sideNavRef}
      style={{ top: topOffset }}
      className={`fixed left-0 bottom-0 md:w-[400px] w-3/5 bg-white z-50 transform transition-transform duration-300 shadow-lg overflow-y-auto border-1 border-gray-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="flex flex-col justify-between h-full p-4">
        <div className="flex flex-col gap-3">
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
        </div>
        <div className="mb-10">
          <Button
            theme="secondary"
            size="small"
            onClick={handleLogout}
            className="w-full mt-6"
          >
            Log Out
          </Button>
        </div>
      </nav>
    </div>
  );
}
