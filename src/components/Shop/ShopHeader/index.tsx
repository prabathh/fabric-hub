"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegHeart, FaSearch, FaUser } from "react-icons/fa";
import { LuUserRound, LuShoppingCart } from "react-icons/lu";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/common";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import logo from "../../../../public/assets/logo.png";
import { useCartStore } from "@/store/useCartStore";

export default function ShopHeader() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuthStore();
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      handleNavigation("/shop");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const userName =
    currentUser?.firstName || currentUser?.lastName
      ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()
      : "Guest";

  return (
    <header className="w-full pl-4 pr-8 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-0">
        {/* Logo */}
        <Link href="/shop" className="flex-shrink-0 order-1">
          <Image src={logo} alt="Fabric Hub" width={180} priority />
        </Link>

        {/* Search bar */}
        <div className="order-3 w-full md:order-2 md:flex-1 md:mx-6 md:w-auto flex justify-center">
          <div className="relative w-full max-w-[653px] h-[50px]">
            <input
              type="text"
              placeholder="Search for fabric type"
              className="w-full h-full pl-4 pr-12 border border-[#6F6F6F] rounded-full focus:ring-red-500 focus:border-red-500 focus:outline-none"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center cursor-pointer">
              <FaSearch className="text-white w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="order-2 md:order-3 flex items-center gap-4 md:gap-6">
          <div className="relative" ref={menuRef}>
            <LuUserRound
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-red-500 transition-colors"
            />
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {currentUser.imageUrl ? (
                          <Image
                            src={currentUser.imageUrl}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <FaUser className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <Button
                        theme="attention"
                        className="w-full h-[4vh]"
                        size="small"
                        onClick={() => handleNavigation(`/shop/user-profile`)}
                      >
                        My Profile
                      </Button>
                      <Button
                        theme="attention"
                        className="w-full h-[4vh]"
                        size="small"
                        //onClick={() => handleNavigation(`/shop/userprofile`)}
                      >
                        My Orders
                      </Button>
                      {currentUser.role !== "user" && (
                        <Link
                          href="/dashboard"
                          className="block text-gray-700 hover:text-red-500 transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                    <Button
                      theme="attention"
                      className="w-full bg-red-500 hover:bg-red-600 text-white mt-3"
                      onClick={handleLogout}
                      size="small"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-gray-600">
                      Sign in to manage your account and orders.
                    </p>
                    <Button
                      theme="dark"
                      className="w-full"
                      onClick={() => handleNavigation(`/login`)}
                    >
                      Sign In / Register
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <FaRegHeart
            onClick={() => router.push(`/shop/wish-list`)}
            className="w-6 h-6 cursor-pointer text-gray-700 hover:text-red-500 transition-colors"
          />
          <div className="relative inline-block">
            <LuShoppingCart
              onClick={() => router.push(`/shop/cart`)}
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-red-500 transition-colors"
            />

            {/* Cart Count Badge */}
            {cartItemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 inline-flex items-center justify-center 
                         w-5 h-5 text-xs font-bold leading-none text-white bg-red-500 
                         rounded-full transform translate-x-1/2 -translate-y-1/2"
              >
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
