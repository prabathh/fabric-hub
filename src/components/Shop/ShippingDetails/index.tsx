"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/common";
import { ShippingFormValues } from "@/types/order";
import { phoneValidation, requiredValidation } from "@/helper/validation";
import { SHIPPING_OPTIONS } from "@/constants/shopCategories";

type ShippingMethod = "colombo" | "outside" | "pickup";

export default function ShippingDetails() {
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("colombo");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingFormValues>({
    mode: "onBlur",
    defaultValues: {
      country: "Sri Lanka",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    },
  });

  const onSubmit = (data: ShippingFormValues) => {
    console.log("Shipping Address Submitted:", data);
    console.log("Selected Shipping Method:", shippingMethod);
  };

  return (
    <div className="space-y-8">
      <section className="px-4 sm:px-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Country"
            placeholder="Country/Region"
            error={errors.country}
            {...register("country", requiredValidation)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="First Name"
              error={errors.firstName}
              {...register("firstName", requiredValidation)}
            />
            <Input
              label="Last Name"
              placeholder="Last Name"
              error={errors.lastName}
              {...register("lastName", requiredValidation)}
            />
          </div>
          <Input
            label="Street Address"
            placeholder="Street Address"
            error={errors.address}
            {...register("address", requiredValidation)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="City"
              error={errors.city}
              {...register("city", requiredValidation)}
            />
            <Input
              label="Postal Code"
              placeholder="Postal Code"
              error={errors.postalCode}
              {...register("postalCode", requiredValidation)}
            />
          </div>
          <Input
            type="tel"
            label="Phone"
            placeholder="Phone Number"
            error={errors.phone}
            {...register("phone", phoneValidation)}
          />
        </form>
      </section>
      <section className="px-4 sm:px-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-gray-300">
                <th className="py-2 px-1">Destination</th>
                <th className="py-2">Estimated Arrival</th>
                <th className="py-2 text-right">Shipping Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(SHIPPING_OPTIONS).map(([key, option]) => (
                <tr
                  key={key}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setShippingMethod(key as ShippingMethod)}
                >
                  <td className="py-3 px-1">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === key}
                      onChange={() => setShippingMethod(key as ShippingMethod)}
                      className="mr-2 text-red-500 focus:ring-red-500"
                    />
                    {option.destination}
                  </td>
                  <td className="py-3">{option.arrival}</td>
                  <td className="py-3 text-right font-medium">{option.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
