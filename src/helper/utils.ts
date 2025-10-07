import { UserRole } from '@/types/auth'; 

export const isAuthorized = (role: UserRole | null): boolean => {
  return role === "super" || role === "admin";
};

export const isDashboardPath = (path: string): boolean => {
    return path.toLowerCase().startsWith('/dashboard');
};