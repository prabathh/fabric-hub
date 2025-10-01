"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';

interface CartItemData {
    id: string;
    image: StaticImageData | string;
    name: string;
    price: number;
    details: string;
    quantity: number;
}

interface CartItemProps {
    item: CartItemData;
    updateQuantity: (itemId: string, change: number) => void;
    removeItem: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="flex justify-between items-center py-4 border-b">
            {/* Column 1 (Product Details - 3/5 width) */}
            <div className="flex space-x-4 flex-1">
                <div className="relative w-24 h-24 sm:w-36 sm:h-36 max-w-[200px] max-h-[200px] flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.details}</p>
                    {/* Quantity Adjust Button (Mobile View - hidden on large screens for simplicity) */}
                    <div className="flex items-center border border-gray-300 rounded mt-2 md:hidden">
                        <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="p-2 disabled:text-gray-400"><FaMinus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2"><FaPlus className="w-3 h-3" /></button>
                    </div>
                </div>
            </div>

            {/* Column 2 (Quantity - Web View) */}
            <div className="hidden md:flex items-center border border-gray-300 rounded mr-4">
                <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="p-2 hover:bg-gray-100 disabled:text-gray-400"><FaMinus className="w-3 h-3" /></button>
                <span className="w-8 text-center text-base font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-100"><FaPlus className="w-3 h-3" /></button>
            </div>

            {/* Column 3 (Price) */}
            <div className="w-20 sm:w-32 text-right">
                <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
            </div>

            {/* Column 4 (Delete Button) */}
            <div className="pl-4">
                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <FaTrashAlt className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;