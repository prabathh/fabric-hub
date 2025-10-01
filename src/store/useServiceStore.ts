import { create } from "zustand";

interface ServiceStore {
  selectedLocation: { id: string; name: string } | null;
  setLocation: (location: { id: string; name: string } | null) => void;
  activeNav: { id: string; label: string, route: string };
  //TODO: Fix type
  setNav: (nav: { id: string; label: string, route: string }) => void;
}

// Named export
export const useServiceStore = create<ServiceStore>((set) => ({
  selectedLocation: null,
  setLocation: (location) => set({ selectedLocation: location }),
  activeNav: { id: "createJob", label: "Create Job", route: 'dashboard/create-job' },
  setNav: (nav) => set({ activeNav: nav }),
}));
