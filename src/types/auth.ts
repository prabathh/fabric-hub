// Define the central role union type (scalable)
export type UserRole = 'super' | 'admin' | 'user'; 
export const ALL_ROLES = ['super', 'admin', 'user'] as const;

// Define the central UserData interface
export interface UserData {
  uid: string;
  email: string | null;
  role: UserRole | null; 
}