"use client";
import { useState } from "react";
import JobCard from "../JobCard";
import sample_vehicle from "../../../../public/assets/sample_vehicle.jpg";
import sample_vehicle2 from "../../../../public/assets/sample_vehicle2.jpg";

// interface CompletedJobsViewProps {
//   selectedLocation?: { id: string; name: string } | null;
// }

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
    payment: 'pending'
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
    payment: 'done'
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
    payment: 'done'
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
    payment: 'pending'
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
    payment: 'done'
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
    payment: 'pending'
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
    payment: 'done'
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
    payment: 'pending'
  },
];

const CompletedJobsView = () => {
  const [jobs] = useState(mockJobs);

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
            completed={true}
            payment={job.payment}
          />
        ))}
      </div>
    </div>
  );
};

export default CompletedJobsView;
