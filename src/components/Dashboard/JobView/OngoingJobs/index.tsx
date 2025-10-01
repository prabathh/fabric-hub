"use client";
import { useState } from "react";
import JobCard from "../JobCard";
import sample_vehicle from "../../../../public/assets/sample_vehicle.jpg";
import sample_vehicle2 from "../../../../public/assets/sample_vehicle2.jpg";

//interface OngoingJobsViewProps {}

const mockJobs = [
  {
    id: "job1",
    vehicle: {
      number: "AAA-1111",
      make: "Toyota",
      model: "Corolla",
      year: "2020",
      owner: "John Doe",
      imageUrl: sample_vehicle,
    },
    services: [
      { id: "service1", label: "Service 1", status: "done" },
      { id: "service2", label: "Service 2", status: "ongoing" },
      { id: "service3", label: "Service 3", status: "pending" },
      { id: "service4", label: "Service 4", status: "pending" },
    ],
  },
  {
    id: "job2",
    vehicle: {
      number: "BB-1234",
      make: "Honda",
      model: "Civic",
      year: "2019",
      owner: "Jane Smith",
      imageUrl: sample_vehicle2,
    },
    services: [
      { id: "service1", label: "Service 1", status: "done" },
      { id: "service2", label: "Service 2", status: "done" },
      { id: "service3", label: "Service 3", status: "ongoing" },
      { id: "service4", label: "Service 4", status: "pending" },
    ],
  },
  {
    id: "job3",
    vehicle: {
      number: "CAA-1234",
      make: "Honda",
      model: "Civic",
      year: "2019",
      owner: "Jane Smith",
      imageUrl: sample_vehicle,
    },
    services: [
      { id: "service1", label: "Service 1", status: "done" },
      { id: "service2", label: "Service 2", status: "done" },
      { id: "service3", label: "Service 3", status: "done" },
      { id: "service4", label: "Service 4", status: "ongoing" },
    ],
  },
  {
    id: "job4",
    vehicle: {
      number: "CA-1234",
      make: "Honda",
      model: "Civic",
      year: "2019",
      owner: "Jane Smith",
      imageUrl: sample_vehicle2,
    },
    services: [
      { id: "service1", label: "Service 1", status: "done" },
      { id: "service2", label: "Service 2", status: "done" },
      { id: "service3", label: "Service 3", status: "done" },
      { id: "service4", label: "Service 4", status: "pending" },
    ],
  },
  {
    id: "job5",
    vehicle: {
      number: "CAA-1234",
      make: "Honda",
      model: "Civic",
      year: "2019",
      owner: "Jane Smith",
      imageUrl: sample_vehicle,
    },
    services: [
      { id: "service1", label: "Service 1", status: "done" },
      { id: "service2", label: "Service 2", status: "done" },
      { id: "service3", label: "Service 3", status: "pending" },
      { id: "service4", label: "Service 4", status: "ongoing" },
    ],
  },
  {
    id: "job6",
    vehicle: {
      number: "CA-1234",
      make: "Honda",
      model: "Civic",
      year: "2019",
      owner: "Jane Smith",
      imageUrl: sample_vehicle2,
    },
    services: [
      { id: "service1", label: "Service 1", status: "done" },
      { id: "service2", label: "Service 2", status: "done" },
      { id: "service3", label: "Service 3", status: "pending" },
      { id: "service4", label: "Service 4", status: "ongoing" },
    ],
  },
  {
    id: "job7",
    vehicle: {
      number: "CAA-1234",
      make: "Honda",
      model: "Civic",
      year: "2019",
      owner: "Jane Smith",
      imageUrl: sample_vehicle,
    },
    services: [
      { id: "service1", label: "Service 1", status: "pending" },
      { id: "service2", label: "Service 2", status: "done" },
      { id: "service3", label: "Service 3", status: "done" },
      { id: "service4", label: "Service 4", status: "ongoing" },
    ],
  },
  {
    id: "job8",
    vehicle: {
      number: "CA-1234",
      make: "Honda",
      model: "Civic",
      year: "2019",
      owner: "Jane Smith",
      imageUrl: sample_vehicle2,
    },
    services: [
      { id: "service1", label: "Service 1", status: "done" },
      { id: "service2", label: "Service 2", status: "done" },
      { id: "service3", label: "Service 3", status: "ongoing" },
      { id: "service4", label: "Service 4", status: "pending" },
    ],
  },
];

const OngoingJobsView = ({}) => {
  const [jobs, setJobs] = useState(mockJobs);

  const handleServiceClick = (jobId: string, serviceId: string) => {
    console.log("Clicked service:", jobId, serviceId);

    // Optional: update status locally for mock/demo
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              services: job.services.map((s) =>
                s.id === serviceId ? { ...s, status: "ongoing" } : s
              ),
            }
          : job
      )
    );
  };

  return (
    <div className="w-full max-h-[calc(100vh-2rem)] overflow-y-auto flex justify-center py-5">
      <div
        className="grid gap-6 w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(460px, max-content))",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            vehicle={job.vehicle}
            services={job.services}
            onServiceClick={(serviceId) =>
              handleServiceClick(job.id, serviceId)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default OngoingJobsView;
