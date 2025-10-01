"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { getAuth, signOut } from "firebase/auth";
import LeftNav from "@/components/Dashboard/LeftNav";
import { useServiceStore } from "@/store/useServiceStore";

interface DashboardLayoutProps {
  children: ReactNode;
}

//TODO: Move to a constants file
//TODO fixed types and get list from store
const NAV_ITEMS = [
  { id: "createJob", label: "Create Job", route: 'dashboard/create-job' },
  { id: "ongoingJobs", label: "Ongoing Jobs", route: 'dashboard/ongoing-jobs' },
  { id: "completedJobs", label: "Completed Jobs", route: 'dashboard/completed-jobs' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedLocation, setLocation, activeNav, setNav } = useServiceStore();

  // useEffect(() => {
  //   // Redirect to select location if none
  //   if (!selectedLocation) {
  //     router.replace("/select-location");
  //   }
  // }, [selectedLocation, router, pathname, setNav]);

  const handleLogout = async () => {
    const auth = getAuth();
    // setNav(NAV_ITEMS[0]);
    // setLocation(null); // clear selected location
    await signOut(auth); // Sign out the user
  };

  const handleNavigate = (nav: { id: string; label: string, route: string }) => {
    router.push(`/${nav.route}`);
    //setNav(nav);
  }

  return (
    <div className="">
      <LeftNav
        navItems={NAV_ITEMS}
        activeNav={activeNav}
        setActiveNav={handleNavigate}
        onLogout={handleLogout}
        selectedLocation={selectedLocation}
      />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}