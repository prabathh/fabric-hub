"use client";

import { Button } from "@/components/common/Button/Button";

interface LeftNavProps {
  //TODO: Fix type
  navItems: { id: string; label: string, route: string }[];
  activeNav: { id: string; label: string, route: string };
  setActiveNav: (nav: { id: string; label: string, route: string }) => void;
  onLogout: () => void;
  selectedLocation: { id: string; name: string } | null;
}

export default function LeftNav({
  navItems,
  activeNav,
  setActiveNav,
  onLogout,
  selectedLocation,
}: LeftNavProps) {
  return (
    <div className="w-1/4 border-r py-6 px-4 flex flex-col h-screen">
      <h1 className="text-xl font-bold mb-4 self-center">{selectedLocation?.name}</h1>
      <nav className="flex flex-col flex-1">
        <div className="space-y-2 flex-1">
          {navItems.map((nav) => (
            <Button
              key={nav.id}
              theme={activeNav.id === nav.id ? "primary" : "secondary"}
              size="medium"
              onClick={() => setActiveNav(nav)}
              className="w-full"
            >
              {nav.label}
            </Button>
          ))}
        </div>
        <Button
          theme="secondary"
          size="small"
          onClick={onLogout}
          className="w-full mt-6"
        >
          Log Out
        </Button>
      </nav>
    </div>
  );
}
