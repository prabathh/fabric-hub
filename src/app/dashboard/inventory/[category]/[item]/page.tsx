"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useProductStore } from "@/store/useProductStore";
import { Button, Dropdown, Input } from "@/components/common";
import { PageHeader } from "@/components/Dashboard";
import type { Product } from "@/types/product";
import { AVAILABLE_TAGS } from "@/constants/shopCategories";

//TODO : image upload
import item_1 from "../../../../../../public/assets/item_1.png";


export default function ItemView() {
  const { item } = useParams() as { item: string };
  const { products } = useProductStore();
  const productData = products?.find((prod) => prod.id === item);

  const [itemData, setItemData] = useState<Partial<Product>>({});
  const [editableData, setEditableData] = useState<Partial<Product>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableData(productData ?? {});
    setItemData(productData ?? {});
  }, [productData]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setItemData((prev) => ({ ...prev!, ...editableData }));
    setIsEditing(false);
    console.log("Saved Data:", editableData);
    alert("Changes saved successfully!");
  };

  const handleCancel = () => {
    setEditableData(itemData);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tags: string[]) => {
    setEditableData((prev) => ({ ...prev, tags }));
  };

  if (!productData) {
    return <div className="p-8">Product not found</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col p-8 space-y-8 bg-gray-50 min-h-screen">
      <PageHeader label={itemData.name || "Product Detail"} description="" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-1">
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              //TODO: image upload part
              src={item_1}
              //src={itemData.images?.[0] || "/placeholder.png"}
              alt={itemData.name || "Product"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-8">
            <Input
              label="Item Name"
              type="text"
              name="name"
              value={itemData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Supplier"
              type="text"
              name="supplier"
              value={itemData.supplier}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-8">
            <Input
              label="Unit Price"
              name="price"
              type="number"
              value={itemData.price}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Current Stock Level"
              name="stock"
              type="number"
              value={itemData.stock}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-8">
            <Input
              label="Description"
              name="description"
              value={itemData.description}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <Dropdown
            label="Tags"
            options={AVAILABLE_TAGS}
            value={editableData.tags ?? []}
            onChange={handleTagChange}
            placeholder="Select tags"
            disabled={!isEditing}
          />
          <div className="mt-6 pt-4 text-sm text-gray-500">
            <p>
              <span className="font-medium text-gray-700">Item ID:</span>{" "}
              {itemData.id?.toUpperCase()}
            </p>
            <p className="mt-1">
              <span className="font-medium text-gray-700">Category:</span>{" "}
              {itemData.category?.name ?? "-"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        {isEditing ? (
          <>
            <Button theme="success" onClick={handleSave}>
              <>
                <FaSave className="w-4 h-4" />
                <span>Save</span>
              </>
            </Button>
            <Button theme="secondary" onClick={handleCancel}>
              <>
                <FaTimes className="w-4 h-4" />
                <span>Cancel</span>
              </>
            </Button>
          </>
        ) : (
          <Button theme="secondary" onClick={handleEdit}>
            <>
              <FaEdit className="w-4 h-4" />
              <span>Edit Details</span>
            </>
          </Button>
        )}
      </div>
    </div>
  );
}
