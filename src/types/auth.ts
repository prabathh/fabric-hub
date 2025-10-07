import { StaticImageData } from "next/image";

export type UserRole = 'super' | 'admin' | 'user'; 

export const ALL_ROLES = ['super', 'admin', 'user'] as const;

export interface UserData {
  uid: string;
  email: string | null;
  role: UserRole | null; 
  firstName: string | null;
  lastName: string | null;
  imageUrl: StaticImageData | null;
  
  // FIX: Allow null for these optional/nullable fields
  address: string | null; 
  phone: string | null;
  country: string | null;
  city: string | null;
  postalCode: string | null;
}

export interface AuthStore {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
  isAuthLoading: boolean;
  setIsAuthLoading: (loading: boolean) => void;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  imageUrl?: StaticImageData | null;
}

export interface PasswordFormValues {
  currentPassword: "";
  newPassword: "";
  confirmNewPassword: "";
}

export interface FirestoreUserData {
    role?: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: StaticImageData | null;
    address?: string | null;
    phone?: string | null;
    country?: string | null;
    city?: string | null;
    postalCode?: string | null;
}
