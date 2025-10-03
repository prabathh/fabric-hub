"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { UserRole } from "@/types/auth";
import { LeftNav } from "@/components/Dashboard";

// Helper function to check required permissions
const isAuthorized = (role: UserRole | null): boolean => {
  return role === "super" || role === "admin";
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isAuthLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Only run checks after the Firebase initialization is complete
    if (!isAuthLoading) {
      // CONDITION 1: Check Authentication Status
      if (!currentUser) {
        // If not authenticated, redirect to login
        router.replace("/shop");
        return;
      }

      // CONDITION 2: Check Authorization Role
      if (!isAuthorized(currentUser.role)) {
        router.replace("/shop");
      }
    }
  }, [isAuthLoading, currentUser, router]);

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Verifying Access...
      </div>
    );
  }

  // 2. If the user is authenticated AND authorized, render the dashboard content.
  if (currentUser && isAuthorized(currentUser.role)) {
    return (
      <>
        <LeftNav
          selectedLocation={{id: "ongoing-jobs", name: "Ongoing Jobs"}}
          navItems={[
            {
              id: "ongoing-jobs",
              label: "Ongoing Jobs",
              route: "/dashboard/ongoing-jobs",
            },
            {
              id: "completed-jobs",
              label: "Completed Jobs",
              route: "/dashboard/completed-jobs",
            },
            {
              id: "manage-locations",
              label: "Manage Locations",
              route: "/dashboard/manage-locations",
            },
            {
              id: "manage-users",
              label: "Manage Users",
              route: "/dashboard/manage-users",
            },
          ]}
          activeNav={{ id: "", label: "", route: "" }}
          setActiveNav={() => {}}
          onLogout={() => {
            // useAuthStore.getState().logout();
            // router.replace("/login");
          }}
        />
        {children}
      </>
    );
  }

  // 3. Fallback: If loading is false but the user failed the checks, this prevents
  return null;
}
