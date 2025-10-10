"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ITEM_COLORS } from "@/constants/shopCategories";
import Image, { StaticImageData } from "next/image";
import {
  FaPlus,
  FaMinus,
  FaTruck,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useCartStore } from "@/store/useCartStore";
import { Button, Loading } from "@/components/common";

//TODO Temporary Image Import
import item_1 from "../../../../../public/assets/item_1.png";
import item_2 from "../../../../../public/assets/item_2.png";
import item_3 from "../../../../../public/assets/item_3.png";
import item_4 from "../../../../../public/assets/item_4.png";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";

type ImageSource = StaticImageData | string;

export default function ItemView() {
  const { item: itemId } = useParams() as { item: string };
  const { product, loading, error } = useProductDetail(itemId);
  const { addToCart } = useCartStore();
  const [selectedColor, setSelectedColor] = useState(ITEM_COLORS[0].name);
  const [quantity, setQuantity] = useState(1);
  const [displayMessage, setDisplayMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(true);
  // State to hold the currently selected main image. Initialized with the static image.
  const [mainImage, setMainImage] = useState<ImageSource>(item_1);

  // // TODO: Uncomment and adapt this useEffect when 'product.image' is stored in the database.
  // useEffect(() => {
  //   if (product?.image) {
  //     // Use product.image (string URL) if available
  //     setMainImage(product.image as ImageSource);
  //   } else {
  //     // Fallback to static image if product is loaded but image URL is missing
  //     setMainImage(item_1);
  //   }
  // }, [product]);

  // // TODO: Remove this temporary useEffect after dynamic images are implemented.
  // This ensures the static image is used as the default display image on load.
  useEffect(() => {
    setMainImage(item_1);
  }, []);

  useEffect(() => {
    if (displayMessage) {
      const timer = setTimeout(() => {
        setDisplayMessage(null);
      }, 3000); // Clear after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount/message change
    }
  }, [displayMessage]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity);
      setIsSuccess(true);
      setDisplayMessage(`${quantity} x ${product.name} added to cart!`);
    } else {
      setIsSuccess(false);
      setDisplayMessage("Sorry, this item is out of stock.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loading size="medium" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg mx-auto max-w-lg">
        <h1 className="text-2xl font-semibold text-red-700">
          Product Load Error
        </h1>
        <p className="text-gray-600 mt-2">
          {product
            ? error
            : `Sorry, the product with ID "${itemId}" could not be found.`}
        </p>
      </div>
    );
  }

  const carouselImages: ImageSource[] = [
    item_1,
    item_2,
    item_3,
    item_4,
    item_1,
  ];

  return (
    <div className="p-6 w-full mx-auto">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/shop" },
          {
            label: product.category.name,
            href: `/shop/${product.category.id}`,
          },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative w-full aspect-[600/560] max-h-[560px] bg-gray-100 overflow-hidden mb-4">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              priority
              className="object-cover transition-opacity duration-300"
            />
          </div>

          {/* Thumbnail Carousel */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex space-x-3 w-fit flex-nowrap">
              {carouselImages.map((imgUrl, index) => (
                <div
                  key={index}
                  //TODO Uses imgUrl, which is currently the static item_1 object
                  className={`relative w-32 h-36 flex-shrink-0 border transition-all duration-150 cursor-pointer ${
                    mainImage === imgUrl
                      ? "border-red-500 ring-2 ring-red-300"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setMainImage(imgUrl)}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold uppercase">{product.name}</h1>
          <p className="text-3xl text-red-600 font-bold">
            Rs.{product.price.toFixed(2)}
          </p>

          <div className="text-sm text-gray-600 space-y-2 border-b pb-4">
            <p>{product.description || "No description provided."}</p>
            <p className="font-medium">
              Stock:{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0
                  ? `${product.stock}m in stock`
                  : "Out of Stock"}
              </span>
            </p>
            <p>SKU: {product.id.toUpperCase()}-X01</p>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <p className="font-medium text-sm text-gray-800">Color:</p>
            <div className="flex space-x-3">
              {ITEM_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-150 shadow-md`}
                  style={{
                    backgroundColor: color.hex,
                    outline:
                      selectedColor === color.name
                        ? `3px solid ${color.hex}`
                        : "none",
                    borderColor:
                      selectedColor === color.name ? "#fff" : "transparent",
                    boxShadow:
                      selectedColor === color.name ? "0 0 0 1px #000" : "none",
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
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="p-3 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <span className="w-12 text-center text-lg font-semibold select-none">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-3 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="pt-2">
            {displayMessage && (
              <div
                className={`flex items-center px-4 py-3 rounded border ${
                  isSuccess
                    ? "bg-green-100 border-green-400 text-green-700"
                    : "bg-red-100 border-red-400 text-red-700"
                }`}
                role="alert"
              >
                {isSuccess ? (
                  <FaCheckCircle className="mr-3 w-5 h-5" />
                ) : (
                  <FaExclamationTriangle className="mr-3 w-5 h-5" />
                )}
                <span className="block sm:inline font-medium">
                  {displayMessage}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <Button
              theme="attention"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 border border-red-500 text-red-500"
            >
              Add to Cart
            </Button>
            <Button
              theme="secondary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 border border-red-500"
            >
              Buy Now
            </Button>
          </div>

          <div className="flex items-center space-x-2 pt-5 border-t pt-4">
            <FaTruck className="w-5 h-5 text-red-500" />
            {/* Delivery Time */}
            <p className="text-sm text-gray-600">
              <span className="font-bold">Delivery Time:</span> 3-4 working days
              (Free shipping over $50)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
