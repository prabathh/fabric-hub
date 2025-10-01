"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SAMPLE_ITEMS, ITEM_COLORS } from "@/constants/shopCategories";
import Image, { StaticImageData } from "next/image";
import { FaPlus, FaMinus, FaTruck } from "react-icons/fa";

export default function ItemView() {
  const { item } = useParams() as { item: string };
  const [selectedColor, setSelectedColor] = useState(ITEM_COLORS[0].name);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<StaticImageData | string>("");

  // Find the item by ID. Assumes the id in SAMPLE_ITEMS is a string like 'item8'
  const product = SAMPLE_ITEMS.find((p) => p.id === item);

  // Set initial main image
  useEffect(() => {
    if (product && product.image) {
      setMainImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500 text-3xl">
        Product not found for ID: {item}
      </div>
    );
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="p-6 w-full mx-auto">
      {/* 1. Breadcrumb (Placeholder) */}
      <div className="text-sm text-gray-500 mb-6 space-x-2">
        <span>Home</span>
        <span>&gt;</span>
        <span>New Arrivals</span>
        <span>&gt;</span>
        <span className="font-medium text-gray-800">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative w-full aspect-[600/560] max-h-[560px] bg-gray-100 overflow-hidden mb-4">
            {/* Main Product Image */}
            <Image src={mainImage} alt={product.name} fill priority />
          </div>

          {/* Thumbnail Carousel */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex space-x-3 w-fit flex-nowrap">
              {[
                product.image,
                product.image,
                product.image,
                product.image,
                product.image,
                product.image,
              ].map((imgUrl, index) => (
                <div
                  key={index}
                  // FIX: Responsive max size: w-36 h-40 (approx 144px x 160px)
                  // Added flex-shrink-0 to guarantee the size
                  className={`relative w-32 h-35 flex-shrink-0 border transition-all duration-150 ${
                    mainImage === imgUrl
                      ? "border-red-500 ring-2 ring-red-300"
                      : "border-gray-200"
                  }`}
                  onClick={() => setMainImage(imgUrl)}
                >
                  <Image
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Details & Actions */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold uppercase">{product.name}</h1>
          <p className="text-xl text-gray-700 font-semibold">{product.price}</p>

          <div className="text-sm text-gray-600 space-y-2">
            <p>Details: High-quality material blend for superior comfort.</p>
            <p>SKU: {item.toUpperCase()}-X01</p>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <p className="font-medium text-sm text-gray-800">Color:</p>
            <div className="flex space-x-3">
              {ITEM_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-150`}
                  style={{
                    backgroundColor: color.hex,
                    borderColor:
                      selectedColor === color.name ? "#000" : "transparent",
                  }}
                />
              ))}
            </div>
            <p className="text-sm">
              Selected Color:{" "}
              <span className="font-semibold">{selectedColor}</span>
            </p>
          </div>

          {/* Quantity Adjustment */}
          <div className="flex items-center space-x-4 pt-4">
            <span className="text-base font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={decrementQuantity}
                className="p-3 hover:bg-gray-100 disabled:text-gray-400"
                disabled={quantity <= 1}
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <span className="w-12 text-center text-lg font-semibold">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-3 hover:bg-gray-100"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button className="flex-1 py-3 border border-red-500 text-red-500 font-bold uppercase hover:bg-red-50 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 py-3 bg-red-500 text-white font-bold uppercase hover:bg-red-600 transition-colors">
              Buy Now
            </button>
          </div>

          <div className="flex items-center space-x-2 pt-5">
            <FaTruck className="w-5 h-5" />
            {/* Delivery Time */}
            <p className="text-sm text-gray-600">
              <span className="font-bold">Delivery Time:</span> 3-4 working days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
