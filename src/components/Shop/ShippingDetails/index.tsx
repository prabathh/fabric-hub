"use client";
import { useState, ChangeEvent } from "react";

interface FormData {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export default function ShippingDetails() {
  const [formData, setFormData] = useState<FormData>({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [shippingMethod, setShippingMethod] = useState<"colombo" | "outside" | "pickup">("colombo");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Shipping Address Section */}
      <section className="px-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <form className="space-y-4">
          {/* Country */}
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {/* First Name | Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {/* City | Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </form>
      </section>

      {/* Shipping Method Section */}
      <section className="px-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="py-2">Destination</th>
                <th className="py-2">Estimated Arrival</th>
                <th className="py-2 text-right">Shipping Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setShippingMethod("colombo")}
              >
                <td className="py-3">
                  <input
                    type="radio"
                    checked={shippingMethod === "colombo"}
                    onChange={() => setShippingMethod("colombo")}
                    className="mr-2"
                  />
                  Colombo District (0–15)
                </td>
                <td className="py-3">3–4 Working Day</td>
                <td className="py-3 text-right">Rs 1,000.00</td>
              </tr>
              <tr
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setShippingMethod("outside")}
              >
                <td className="py-3">
                  <input
                    type="radio"
                    checked={shippingMethod === "outside"}
                    onChange={() => setShippingMethod("outside")}
                    className="mr-2"
                  />
                  Outside Colombo District
                </td>
                <td className="py-3">3–4 Working Day</td>
                <td className="py-3 text-right">Rs 1,500.00</td>
              </tr>
              <tr
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setShippingMethod("pickup")}
              >
                <td className="py-3">
                  <input
                    type="radio"
                    checked={shippingMethod === "pickup"}
                    onChange={() => setShippingMethod("pickup")}
                    className="mr-2"
                  />
                  Store Pickup
                </td>
                <td className="py-3">-</td>
                <td className="py-3 text-right">Free</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
