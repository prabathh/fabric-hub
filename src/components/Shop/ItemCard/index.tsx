"use client";

import { FaRegHeart } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";

interface ItemCardProps {
  image: string | StaticImageData;
  name: string;
  price: number;
  handleClick: () => void;
}

export default function ItemCard({ image, name, price, handleClick }: ItemCardProps) {

  return (
        <div onClick={handleClick} className="relative w-full group cursor-pointer">
            <div className="relative w-full aspect-[4/5] overflow-hidden" >
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button 
                    className="absolute top-2 right-2 text-white bg-opacity-50 p-2 rounded-full hover:bg-red-500 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <FaRegHeart className="w-5 h-5" />
                </button>
            </div>
            <div className="mt-2 flex flex-col items-start space-y-1">
                <span className="text-gray-800 font-medium">{name}</span>
                <span className="text-gray-600">Rs.{price}</span>
            </div>
        </div>
    );
}


