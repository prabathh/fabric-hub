"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Loading } from "@/components/common";
import {
  categoryIdValidation,
  categoryNameValidation,
} from "@/helper/validation";
import { addCategory } from "@/lib/category";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryFormValues {
  id: string;
  name: string;
  description?: string;
}

export default function CategoryModal({ isOpen, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CategoryFormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      await addCategory({
        id: data.id,
        name: data.name,
        description: data.description,
      });

      reset();
      onClose();
    } catch (err) {
      // TODO optional: show toast or error message
      console.error("Failed to add category:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Category ID"
            placeholder="e.g. linen"
            error={errors.id}
            {...register("id", categoryIdValidation)}
          />
          <Input
            label="Name"
            placeholder="Category Name"
            error={errors.name}
            {...register("name", categoryNameValidation)}
          />
          <Input
            label="Description"
            placeholder="Optional description"
            {...register("description")}
          />
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
