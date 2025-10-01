"use client";

import { useState } from "react";
import VehicleInfoForm from "./VehicleInfoForm";
import VehicleSearchView from "./SearchVehicle";

interface VehicleData {
  make?: string;
  model?: string;
  year?: string;
  owner?: string;
  [key: string]: string | undefined;
}

interface CreateJobViewProps {
  onSearch: (vehicleNumber: string) => void;
}

export default function CreateJobView({
  onSearch,
}: CreateJobViewProps) {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const handleSearch = (number: string) => {
    onSearch(number);
    setVehicleNumber(number); // Set vehicle number to show VehicleInfoForm

    // Mock fetching vehicle data
    const mockData: VehicleData = {
      make: "Toyota",
      model: "Corolla",
      year: "2020",
      owner: "John Doe",
    };
    setVehicleData(mockData);
  };

  return (
    <div className="p-6 w-full">
      {vehicleNumber ? (
        <VehicleInfoForm
          vehicleNumber={vehicleNumber}
          vehicleData={vehicleData ?? undefined}
          onSave={() => console.log("Save data:")}
          onStartJob={() => console.log("Start job with:")}
        />
      ) : (
        <VehicleSearchView onSearch={handleSearch} />
      )}
    </div>
  );
}
