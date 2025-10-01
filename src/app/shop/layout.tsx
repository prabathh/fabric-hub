"use client";

import { ReactNode } from "react";
import { ShopHeader, ShopNavRow } from "@/components/Shop";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <ShopHeader />
      <ShopNavRow />
      <div className="flex-1 w-full overflow-auto">{children}</div>
    </div>
  );
}
