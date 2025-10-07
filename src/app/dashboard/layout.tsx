"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useServiceStore } from "@/store/useServiceStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { isAuthorized } from "@/helper/utils";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LeftNav } from "@/components/Dashboard";
import { DASH_NAV_ITEMS } from "@/constants/shopCategories";
import { Nav } from "@/types/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isAuthLoading, setCurrentUser } = useAuthStore();
  const { loadCategories } = useCategoryStore();
  const { setNav, activeNav } = useServiceStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthLoading) return;

    const isUserAuthorized = currentUser && isAuthorized(currentUser.role);
    if (!isUserAuthorized) {
      router.replace("/shop");
      return;
    }

    // Load INIT Data
    // Only load categories once the user is confirmed to be authorized
    loadCategories();
  }, [isAuthLoading, currentUser, router, loadCategories]);

  useEffect(() => {
    const sortedNavItems = [...DASH_NAV_ITEMS].sort(
      (a, b) => b.route.length - a.route.length
    );
    const matchingItem = sortedNavItems.find((item) => {
      const itemRoute = item.route.endsWith("/")
        ? item.route
        : item.route + "/";
      const currentPath = pathname.endsWith("/") ? pathname : pathname + "/";
      return currentPath.startsWith(itemRoute);
    });
    if (matchingItem && matchingItem.id !== activeNav.id) {
      setNav(matchingItem);
    }
  }, [pathname, setNav, activeNav]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      router.replace("/shop");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleNavClick = (nav: Nav) => {
    setNav(nav);
    router.replace(nav.route);
  };

  if (currentUser && isAuthorized(currentUser.role)) {
    return (
      <div className="w-full h-screen flex flex-row">
        <LeftNav
          setActiveNav={handleNavClick}
          onLogout={handleLogout}
          isUserLoggedIn={!!currentUser}
        />
        <div className="bg-gray-100 w-full">{children}</div>
      </div>
    );
  }
}
