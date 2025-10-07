"use client";

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { isAuthorized, isDashboardPath } from "@/helper/utils";
import { fetchUserRole } from "@/lib/user";
import { UserRole } from "@/types/auth";
import { usePathname, useRouter } from "next/navigation";
import { Loading } from "@/components/common";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCurrentUser, setIsAuthLoading, isAuthLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await fetchUserRole(user.uid);
        const userRole = role as UserRole | null;
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          role: userRole,
        });
        if (isAuthorized(userRole) && !isDashboardPath(pathname)) {
          router.replace("/dashboard");
        }
      } else {
        setCurrentUser(null);
        if (isDashboardPath(pathname)) {
          router.replace("/shop");
        }
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, [pathname, router, setCurrentUser, setIsAuthLoading]);

  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
