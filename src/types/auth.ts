// Define the central role union type (scalable)
export type UserRole = 'super' | 'admin' | 'user'; 
export const ALL_ROLES = ['super', 'admin', 'user'] as const;

// Define the central UserData interface
export interface UserData {
  uid: string;
  email: string | null;
  role: UserRole | null; 
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
}

export interface PasswordFormValues {
  currentPassword: "";
  newPassword: "";
  confirmNewPassword: "";
}