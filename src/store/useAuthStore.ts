import { create } from "zustand";
import { AuthStore } from "@/types/auth";

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  isAuthLoading: true,
  setIsAuthLoading: (loading) => set({ isAuthLoading: loading }),
}));
