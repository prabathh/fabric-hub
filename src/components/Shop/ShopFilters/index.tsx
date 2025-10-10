"use client"

import { MOCK_FILTERS } from "@/constants/shopCategories";
import { FaTimes } from "react-icons/fa";

interface ShopFiltersProps {
    onClose?: () => void;
    isMobile?: boolean;
}

export default function ShopFilters({ onClose, isMobile }: ShopFiltersProps) {
    return (
        <div className="space-y-6 z-0">
            {isMobile && onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 md:hidden"
                >
                    <FaTimes className="w-6 h-6" />
                </button>
            )}

            {/* Price Filter */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Price Range</h3>
                <input
                    type="range"
                    min="0"
                    max="500"
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-red-500"
                />
                <p className="text-sm text-gray-500">$0 - $500</p>
            </div>
    
            {/* General Filters */}
            {Object.entries(MOCK_FILTERS).map(([key, options]) => (
                <div key={key} className="space-y-2">
                    <h3 className="font-semibold text-gray-800">{key}</h3>
                    <div className="flex flex-col space-y-1 text-sm">
                        {options.map((option) => (
                            <label
                                key={option}
                                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="rounded text-red-500 focus:ring-red-500"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
