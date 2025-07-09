// src/components/JobFilter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { jobTypes, locations } from "@/lib/constants";

export default function JobFilter({
  initialJobType = "",
  initialLocation = "",
}: {
  initialJobType?: string;
  initialLocation?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <select
            id="location"
            name="location"
            onChange={handleFilterChange}
            defaultValue={initialLocation}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="job_type"
            className="block text-sm font-medium text-gray-700"
          >
            Job Type
          </label>
          <select
            id="job_type"
            name="job_type"
            onChange={handleFilterChange}
            defaultValue={initialJobType}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
