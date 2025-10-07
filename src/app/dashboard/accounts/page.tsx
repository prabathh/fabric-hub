"use client";

import { useServiceStore } from "@/store/useServiceStore";
import { PageHeader } from "@/components/Dashboard";

export default function InventoryPage() {
  const { activeNav } = useServiceStore();

  return (
    <div className="flex-1 w-full flex flex-col p-8 space-y-8 min-h-screen">
      <PageHeader
        label={activeNav.label}
        description={"Stay on top of your accounts"}
        //button={"Add Category"}
        // onClick={() => setModalOpen(true)}
        // Icon={FaPlus}
      />
    </div>
  );
}
