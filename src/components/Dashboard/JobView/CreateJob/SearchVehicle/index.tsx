"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";

interface VehicleSearchViewProps {
  onSearch: (vehicleNumber: string) => void;
}

export default function VehicleSearchView({ onSearch }: VehicleSearchViewProps) {
  const [vehicleNumber, setVehicleNumber] = useState("");

  const handleSearch = () => {
    if (!vehicleNumber.trim()) return;
    onSearch(vehicleNumber.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full space-y-4">
      <div className="flex flex-col gap-4 w-1/2">
        <Input
          type="text"
          placeholder="Enter vehicle number (ABC-1111, AB-1111, 11-1111, 111-1111)"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
        />
        <Button
          theme="primary"
          size="medium"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      
    </div>
  );
}