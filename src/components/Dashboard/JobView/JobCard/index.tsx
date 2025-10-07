"use client";

import { Button } from "@/components/common/Button";
import Image, { StaticImageData } from "next/image";


interface VehicleInfo {
  number: string;
  make: string;
  model: string;
  year?: string;
  owner?: string;
  imageUrl?: string | StaticImageData;
}

interface JobCardProps {
  vehicle: VehicleInfo;
  services?: {
    id: string;
    label: string;
    status: string;
    disabled?: boolean;
  }[] | null;
  payment?: string;
  onServiceClick?: (serviceId: string) => void; // optional callback for ongoing jobs
  completed?: boolean; // flag to indicate if the job is completed
}

export default function JobCard({
  vehicle,
  services,
  payment,
  onServiceClick,
  completed,
}: JobCardProps) {
  const { number: vehicleNumber, make, model, year, owner, imageUrl } = vehicle;
  
  const getButtonTheme = (status: string) => {
    switch (status) {
      case "done":
        return "success"; 
      case "ongoing":
        return "secondary";
      case "pending":
      default:
        return "primary";
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl p-6 shadow-lg min-w-[460px] max-w-[560px] h-[240px]">
      <div className="flex flex-row items-center gap-3">
        {/* Vehicle Image */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`Vehicle ${vehicleNumber}`}
            width={100}
            height={100}
            className="w-30 h-30 object-cover rounded-md"
            style={{ objectFit: "cover", borderRadius: "0.375rem" }}
          />
        )}

        {/* Vehicle Info */}
        <div className="space-y-1 text-center">
          <p className="text-sm font-bold">{vehicleNumber}</p>
          <p className="text-xs">
            {make} {model}
          </p>
          {year && <p className="text-xs">{year}</p>}
          {owner && <p className="text-xs">{owner}</p>}
        </div>
      </div>
      {/* Service Buttons */}
      {completed ? (
        <Button theme={payment === 'done' ? 'success' : 'secondary'} size="small">
          Payment {payment}
        </Button>
      ) : (
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          {services?.map((service) => (
            <Button
              key={service.id}
              theme={getButtonTheme(service.status)}
              size="small"
              disabled={service.disabled}
              onClick={() => onServiceClick && onServiceClick(service.id)}
            >
              {service.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
