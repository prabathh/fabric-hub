"use client";

import { Button } from "@/components/common/Button";
import { DASH_NAV_ITEMS } from "@/constants/shopCategories";
import Image from "next/image";
import { IconType } from "react-icons";
import { useServiceStore } from "@/store/useServiceStore";
import logo from "../../../../public/assets/logo.png";

interface Nav {
  id: string;
  label: string;
  route: string;
  icon: IconType
}
interface LeftNavProps {
  setActiveNav: (nav: Nav) => void;
  onLogout: () => void;
  isUserLoggedIn: boolean;
}
interface SideNavItemProps {
  nav: Nav;
  activeNav: Nav;
  setActiveNav: (nav: Nav) => void;
}

const SideNavItem: React.FC<SideNavItemProps> = ({ nav, activeNav, setActiveNav }) => {
  const isActive = activeNav.id === nav.id;
  const baseClasses =
    "flex items-center w-full py-2 px-3 rounded-xl text-left transition-colors duration-150 cursor-pointer hover:bg-gray-300/50";
  const activeHoverClasses = "bg-gray-300/50";

  return (
    <div
      onClick={() => setActiveNav(nav)}
      className={`${baseClasses} ${
        isActive
          ? activeHoverClasses + " font-semibold" : ""
      }`}
    >
      {nav.icon && (
        <div className="mr-3">
          <nav.icon className="w-5 h-5" />
        </div>
      )}
      <span className="flex-1 text-left">{nav.label}</span>
    </div>
  );
};

export default function LeftNav({
  setActiveNav,
  onLogout,
  isUserLoggedIn,
}: LeftNavProps) {
  const { activeNav } = useServiceStore();
  return (
    <div className="w-1/4 border-r py-6 px-4 flex flex-col h-screen border-gray-200">
      <Image src={logo} alt="Fabric Hub" width={180} />
      <div className="border-t border-gray-200 mb-4" />

      <nav className="flex flex-col flex-1">
        <div className="space-y-2 flex-1">
          {DASH_NAV_ITEMS.map((nav: Nav) => (
            <SideNavItem
              key={nav.id}
              nav={nav}
              activeNav={activeNav}
              setActiveNav={setActiveNav}
            />
          ))}
        </div>

        {isUserLoggedIn && (
          <Button
            theme="secondary"
            size="small"
            onClick={onLogout}
            className="w-full mt-6"
          >
            Log Out
          </Button>
        )}
      </nav>
    </div>
  );
}
