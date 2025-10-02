import { create } from "zustand";
import { UserData } from "@/types/auth";

interface AuthStore {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
  isAuthLoading: boolean;
  setIsAuthLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  isAuthLoading: true,
  setIsAuthLoading: (loading) => set({ isAuthLoading: loading }),
}));