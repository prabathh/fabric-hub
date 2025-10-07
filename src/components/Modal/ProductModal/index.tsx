"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { addProduct } from "@/lib/product";
import { Button, Dropdown, Input, Loading } from "@/components/common";
import { AVAILABLE_TAGS } from "@/constants/shopCategories";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  category: { id: string; name: string };
}

export interface ProductFormValues {
  name: string;
  description?: string;
  price: number;
  stock: number;
  supplier: string;
  tags: string[];
  images?: string[];
}

export default function ProductModal({ isOpen, onClose, category }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<ProductFormValues>({
    mode: "onChange",
    defaultValues: {
      tags: [],
      stock: 0,
      price: 0,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsLoading(true);
      await addProduct({
        id: `${category.id}-${Date.now()}`,
        ...data,
        category,
      });

      reset();
      onClose();
    } catch (err) {
      console.error("Failed to add product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Product Name"
            placeholder="e.g. Premium Linen Shirt"
            error={errors.name}
            {...register("name", { required: "Name is required" })}
          />
          <Input
            label="Description"
            placeholder="Optional description"
            error={errors.description}
            {...register("description")}
          />
          <Input
            label="Price"
            type="number"
            step="0.01"
            placeholder="Price"
            error={errors.price}
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be >= 0" },
              valueAsNumber: true,
            })}
          />
          <Input
            label="Stock"
            type="number"
            placeholder="Stock quantity"
            error={errors.stock}
            {...register("stock", {
              required: "Stock is required",
              min: { value: 0, message: "Stock must be >= 0" },
              valueAsNumber: true,
            })}
          />
          <Input
            label="Supplier"
            placeholder="Supplier Name"
            error={errors.supplier}
            {...register("supplier", { required: "Supplier is required" })}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                label="Pages"
                options={AVAILABLE_TAGS}
                value={field.value || []}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          {/* Image placeholder */}
          <div className="space-y-1">
            <label className="block text-sm font-medium mb-1">
              Images (placeholder)
            </label>
            <div className="w-full border border-dashed p-4 text-center text-gray-400 rounded-lg">
              Image upload placeholder
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <Button theme="attention" onClick={onClose}>
                  Cancel
                </Button>
                <Button theme="secondary" disabled={!isValid} type="submit">
                  Add
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
