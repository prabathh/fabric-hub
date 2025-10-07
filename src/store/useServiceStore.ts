import { create } from "zustand";
import { IconType } from "react-icons";
import { DASH_NAV_ITEMS } from "@/constants/shopCategories";

interface ServiceStore {
  activeNav: { id: string; label: string, route: string, icon: IconType };
  setNav: (nav: { id: string; label: string, route: string, icon: IconType }) => void;
}

// Named export
export const useServiceStore = create<ServiceStore>((set) => ({
  activeNav: DASH_NAV_ITEMS[0],
  setNav: (nav) => set({ activeNav: nav }),
}));
