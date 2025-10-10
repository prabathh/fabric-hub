import { FirestoreUserData, UserData, UserRole } from '@/types/auth'; 

export const isAuthorized = (role: UserRole | null): boolean => {
  return role === "super" || role === "admin";
};

export const isDashboardPath = (path: string): boolean => {
    return path.toLowerCase().startsWith('/dashboard');
};

export const mapCurrentUserToProfile = (user: UserData | null) => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "", 
    email: user?.email || "",
    phone: user?.phone || "",
    country: user?.country || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
});

export const extractProfileFields = (data: FirestoreUserData) => ({
    firstName: data.firstName || null,
    lastName: data.lastName || null,
    imageUrl: data.imageUrl || null,
    address: data.address || null,
    phone: data.phone || null,
    country: data.country || null,
    city: data.city || null,
    postalCode: data.postalCode || null,
});

export const getErrorMessage = (err: unknown): string => {
  if (typeof err === "object" && err !== null && "message" in err) {
    return (err as { message?: string }).message || 'An unknown error occurred.';
  }
  return 'An unknown error occurred.';
};

export const formatCurrency = (amount: number) => `Rs ${amount.toFixed(2)}`;