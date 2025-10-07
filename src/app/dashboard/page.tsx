"use client";

import { useServiceStore } from "@/store/useServiceStore";
import { STATS_DATA } from "@/constants/shopCategories";
import { IconType } from "react-icons";
import { PageHeader } from "@/components/Dashboard";

interface DashboardCardProps {
  name: string;
  value: string;
  icon: IconType;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  name,
  value,
  icon: Icon,
  color,
}) => (
  <div
    className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between"
    style={{ minWidth: "200px", maxWidth: "250px", maxHeight: "150px" }}
  >
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div className="mt-4">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const { activeNav } = useServiceStore();

  return (
    <div className="flex-1 w-full flex flex-col p-8 space-y-8 min-h-screen">
      <PageHeader
        label={activeNav.label}
        description={"Welcome back! Here’s a quick overview of your dashboard."}
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA?.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-h-[300px]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Orders
          </h2>
          <p className="text-gray-500">
            List of latest customer orders goes here...
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-h-[300px]">
          <h2 className="text-xl font-bold text-red-500 mb-4">
            Low Stock Alerts
          </h2>
          <p className="text-gray-500">
            Critical inventory items requiring immediate attention...
          </p>
        </div>
      </section>
    </div>
  );
}
