"use client";

import { useServiceStore } from "@/store/useServiceStore";
import { PageHeader } from "@/components/Dashboard";
import { SALES_CARD_DATA } from "@/constants/shopCategories";
import { IconType } from "react-icons";
import SalesOrdersTable from "@/components/Dashboard/SalesOrdersTable";

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

export default function InventoryPage() {
	const { activeNav } = useServiceStore();

	return (
		<div className="flex-1 w-full flex flex-col p-8 space-y-8 min-h-screen">
			<PageHeader
				label={activeNav.label}
				description={"Stay on top of your sales"}
				// button={"+ Add Category"}
				// theme="dark"
				// onClick={() => setModalOpen(true)}
				// Icon={FaPlus}
			/>
			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{SALES_CARD_DATA?.map((stat, index) => (
					<DashboardCard key={index} {...stat} />
				))}
			</section>
			<SalesOrdersTable />
		</div>
	);
}
