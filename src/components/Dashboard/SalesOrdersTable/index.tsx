"use client";

import React, { useState } from "react";

interface Order {
  id: string;
  date: string;
  customer: string;
  amount: string;
  payment: string;
}

const SalesOrdersTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"retail" | "wholesale">("retail");

  const retailOrders: Order[] = [
    { id: "#0001", date: "01 - 01 - 2025", customer: "Walk-in Customer", amount: "Rs 4,000", payment: "Cash" },
    { id: "#0002", date: "01 - 01 - 2025", customer: "Walk-in Customer", amount: "Rs 3,000", payment: "Cash" },
    { id: "#0003", date: "01 - 01 - 2025", customer: "Online", amount: "Rs 10,000", payment: "Cash" },
  ];

  const wholesaleOrders: Order[] = [
    { id: "#1001", date: "02 - 01 - 2025", customer: "ABC Traders", amount: "Rs 25,000", payment: "Card" },
    { id: "#1002", date: "03 - 01 - 2025", customer: "XYZ Distributors", amount: "Rs 19,000", payment: "Cash" },
  ];

  const currentOrders = activeTab === "retail" ? retailOrders : wholesaleOrders;

  return (
    <div>
      {/* Toggle Slider */}
      <div className="flex justify-center mb-6">
        <div className="relative flex bg-white shadow-sm rounded-full border border-gray-200 w-[400px]">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-gray-100 rounded-full transition-transform duration-300 ${
              activeTab === "wholesale" ? "translate-x-full" : ""
            }`}
          />
          <button
            onClick={() => setActiveTab("retail")}
            className={`flex-1 z-100 text-center py-2 rounded-full font-medium transition-colors duration-300 ${
              activeTab === "retail" ? "text-black" : "text-gray-400"
            }`}
          >
            Retail orders
          </button>
          <button
            onClick={() => setActiveTab("wholesale")}
            className={`flex-1 z-100 text-center py-2 rounded-full font-medium transition-colors duration-300 ${
              activeTab === "wholesale" ? "text-black" : "text-gray-400"
            }`}
          >
            Wholesale orders
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 font-medium text-gray-700">Order Details</th>
              <th className="py-3 px-6 font-medium text-gray-700">Customer</th>
              <th className="py-3 px-6 font-medium text-gray-700">Amount</th>
              <th className="py-3 px-6 font-medium text-gray-700">Payment</th>
              <th className="py-3 px-6 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-gray-500">Date : {order.date}</div>
                </td>
                <td className="py-4 text-md font-extralight px-6">{order.customer}</td>
                <td className="py-4 text-md font-extralight px-6">{order.amount}</td>
                <td className="py-4 text-md font-extralight px-6">{order.payment}</td>
                <td className="py-4 text-md font-extralight px-6 text-blue-500 cursor-pointer hover:underline">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesOrdersTable;
