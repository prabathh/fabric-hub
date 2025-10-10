"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { Product } from "@/types/product";

//TODO Temporary Image Imports for rotation
import item_1 from "../../../../public/assets/item_1.png";
import item_2 from "../../../../public/assets/item_2.png";
import item_3 from "../../../../public/assets/item_3.png";

type ImageSource = StaticImageData | string;
interface CartItem {
  product: Product;
  quantity: number;
}
interface CartItemProps {
  item: CartItem;
  updateQuantity: (productId: string, change: number) => void;
  removeItem: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  updateQuantity,
  removeItem,
}) => {
  const { product, quantity } = item;

  //TODO
  const productCarouselImages: ImageSource[] = [item_1, item_2, item_3];
  const [mainImage, setMainImage] = useState<ImageSource>(
    productCarouselImages[0]
  );

  // // TODO: Uncomment and adapt this useEffect when 'product.images' is stored in the database.
  // // This effect ensures the mainImage is initialized with the product's primary image
  // useEffect(() => {
  //     if (product.images && product.images.length > 0) {
  //         setMainImage(product.images[0] as ImageSource);
  //     } else {
  //         // Fallback to a placeholder or default if no images are provided
  //         setMainImage(item_1); // Using your temporary static image as fallback
  //     }
  // }, [product.images]);

  // // TODO: Remove this temporary useEffect after dynamic images are implemented
  // // This ensures the static image is used as the default display image on load.
  useEffect(() => {
    setMainImage(productCarouselImages[0]);
  }, [productCarouselImages]);

  const handleUpdateQuantity = (change: number) => {
    updateQuantity(product.id, change);
  };

  const handleRemoveItem = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b">
      <div className="flex space-x-4 flex-1 w-full md:w-auto">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 sm:w-36 sm:h-36 max-w-[200px] max-h-[200px] flex-shrink-0 mb-2">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          {productCarouselImages.length > 1 && (
            <div className="flex overflow-x-auto space-x-1 w-24 sm:w-36">
              {productCarouselImages.map((imgUrl, index) => (
                <div
                  key={index}
                  className={`relative w-10 h-10 flex-shrink-0 border transition-all duration-150 cursor-pointer rounded-sm ${
                    mainImage === imgUrl
                      ? "border-red-500 ring-1 ring-red-300"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setMainImage(imgUrl)}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center flex-1">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500">
            {product.description || "No description provided."}
          </p>
          <div className="flex items-center border border-gray-300 rounded mt-2 md:hidden max-w-[11vh]">
            <button
              onClick={() => handleUpdateQuantity(-1)}
              disabled={quantity <= 1}
              className="p-2 disabled:text-gray-400"
              aria-label="Decrease quantity"
            >
              <FaMinus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">
              {quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(1)}
              className="p-2"
              aria-label="Increase quantity"
            >
              <FaPlus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center border border-gray-300 rounded mr-4 flex-shrink-0">
        <button
          onClick={() => handleUpdateQuantity(-1)}
          disabled={quantity <= 1}
          className="p-2 hover:bg-gray-100 disabled:text-gray-400"
          aria-label="Decrease quantity"
        >
          <FaMinus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center text-base font-semibold">
          {quantity}
        </span>
        <button
          onClick={() => handleUpdateQuantity(1)}
          className="p-2 hover:bg-gray-100"
          aria-label="Increase quantity"
        >
          <FaPlus className="w-3 h-3" />
        </button>
      </div>

      <div className="w-full md:w-20 lg:w-32 text-right flex-shrink-0 mt-4 md:mt-0">
        <p className="font-semibold text-lg">
          Rs{(product.price * quantity).toFixed(2)}
        </p>
        <p className="text-xs text-gray-500">
          Rs{product.price.toFixed(2)} each
        </p>
      </div>

      <div className="pl-4 flex-shrink-0 mt-4 md:mt-0">
        <button
          onClick={handleRemoveItem}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label={`Remove ${product.name} from cart`}
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
