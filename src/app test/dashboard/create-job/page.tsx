"use client";

import CreateJobView from "@/components/Dashboard/JobView/CreateJob";

export default function CreateJobPage() {

  return (
    <CreateJobView
      onSearch={() => {
        /* TODO: handle search navigation to VehicleInfoForm */
      }}
    />
  );
}
