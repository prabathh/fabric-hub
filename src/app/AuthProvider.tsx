"use client";

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Your initialized auth instance
import { useAuthStore } from "@/store/useAuthStore";
import { fetchUserRole } from "@/lib/user";
import { UserRole } from "@/types/auth";
import { usePathname, useRouter } from "next/navigation";

// Helper function to check required permissions
const isAuthorized = (role: UserRole | null): boolean => {
  return role === "super" || role === "admin";
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCurrentUser, setIsAuthLoading, isAuthLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Subscribe to the Firebase authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in. Fetch role from DB.
        const role = await fetchUserRole(user.uid);

        // Set the user data in the global store
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          role: role as "super" | "admin" | "user" | null,
        });

        if (isAuthorized(role as UserRole | null)) {
          router.replace("/dashboard");
        }
      } else {
        // User is signed out. Clear the store.
        setCurrentUser(null);
        router.replace("/shop");
      }
      // Once the check is complete, set loading to false
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, [pathname, router, setCurrentUser, setIsAuthLoading]);

  if (isAuthLoading) {
    return (
      <span className="flex h-screen items-center justify-center gap-1 py-3">
        <span className="w-10 h-10 bg-red-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
        <span className="w-10 h-10 bg-red-500 rounded-full animate-bounce [animation-delay:-0.25s]"></span>
        <span className="w-10 h-10 bg-red-500 rounded-full animate-bounce"></span>
      </span>
    );
  }

  return <>{children}</>;
}
