"use client";

import { ReactNode, useEffect } from "react";
import { ShopHeader, ShopNavRow } from "@/components/Shop";
import { useCategoryStore } from "@/store/useCategoryStore";

export default function ShopLayout({ children }: { children: ReactNode }) {
  const { loadCategories } = useCategoryStore();

  useEffect(() => {
      // Load INIT Data
      // Only load categories once the user is confirmed to be authorized
      loadCategories();
    }, [loadCategories]);
  return (
    <div className="flex flex-col h-screen w-full">
      <ShopHeader />
      <ShopNavRow />
      <div className="flex-1 w-full overflow-auto">{children}</div>
    </div>
  );
}
