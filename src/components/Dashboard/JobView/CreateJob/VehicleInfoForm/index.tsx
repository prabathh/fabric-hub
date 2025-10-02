"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";

interface VehicleInfoFormProps {
  vehicleNumber: string;
  vehicleData?: {
    make?: string;
    model?: string;
    year?: string;
    owner?: string;
    [key: string]: string | undefined;
  };
  onSave?: () => void;
  onStartJob?: () => void;
}

export default function VehicleInfoForm({
  vehicleNumber,
  vehicleData,
  onSave,
  onStartJob,
}: VehicleInfoFormProps) {
  const [isEditing, setIsEditing] = useState(!vehicleData); // enable inputs if new vehicle
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    owner: "",
    ...vehicleData,
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    // if (onSave) onSave({ ...form, vehicleNumber });
    // if (onStartJob) onStartJob({ ...form, vehicleNumber });
  };

  const handleStartJob = () => {
    // if (onStartJob) onStartJob({ ...form, vehicleNumber });
  };

  return (
    <div className="min-h-screen p-4 relative w-full">
      <h1 className="text-xl font-bold mb-4">Vehicle Details: {vehicleNumber}</h1>

      <div className="space-y-4 max-w-md">
        <Input
          label="Make"
          value={form.make}
          onChange={(e) => handleChange("make", e.target.value)}
          disabled={!isEditing}
        />
        <Input
          label="Model"
          value={form.model}
          onChange={(e) => handleChange("model", e.target.value)}
          disabled={!isEditing}
        />
        <Input
          label="Year"
          value={form.year}
          onChange={(e) => handleChange("year", e.target.value)}
          disabled={!isEditing}
        />
        <Input
          label="Owner"
          value={form.owner}
          onChange={(e) => handleChange("owner", e.target.value)}
          disabled={!isEditing}
        />
      </div>

      <div className="absolute bottom-12 right-4 flex gap-2">
        {vehicleData ? (
          <>
            <Button theme="secondary" size="medium" onClick={handleEdit}>
              Edit
            </Button>
            <Button theme="primary" size="medium" onClick={handleStartJob}>
              Start Job
            </Button>
          </>
        ) : (
          <Button theme="primary" size="medium" onClick={handleSave}>
            Save & Start Job
          </Button>
        )}
      </div>
    </div>
  );
}
