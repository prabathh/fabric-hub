"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { LuUserRound, LuShoppingCart } from "react-icons/lu";
import logo from "../../../../public/assets/logo.png";

export default function ShopHeader() {
  const router = useRouter();

  return (
    <header className="w-full pl-4 pr-6 py-4 border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-0">
        {/* Logo */}
        <Link href="/shop" className="flex-shrink-0 order-1">
          <Image src={logo} alt="Fabric Hub" width={180} />
        </Link>

        {/* Search bar */}
        <div className="order-3 w-full md:order-2 md:flex-1 md:mx-6 md:w-auto flex justify-center">
          <div className="relative w-full max-w-[653px] h-[50px]">
            <input
              type="text"
              placeholder="Search for fabric type"
              className="w-full h-full pl-4 pr-12 border border-[#6F6F6F] rounded-full focus:outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center cursor-pointer">
              <FaSearch className="text-white" />
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="order-2 md:order-3 flex items-center gap-4 md:gap-6">
          <LuUserRound onClick={() => router.push(`/login`)} className="w-6 h-6 cursor-pointer" />
          <FaRegHeart onClick={() => router.push(`/shop/wish-list`)} className="w-6 h-6 cursor-pointer" />
          <LuShoppingCart onClick={() => router.push(`/shop/cart`)} className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
