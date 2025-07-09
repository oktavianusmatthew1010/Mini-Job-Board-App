// src/app/page.tsx
import { createClient } from "../lib/superbase"; // Fixed path and typo
import JobFilter from "@/components/JobFilter";
import JobCard from "@/components/JobCard";

type tParams = Promise<{
  searchParams: {
    job_type?: string | string[];
    location?: string | string[];
  };
}>;

export default async function Home(props: { params: tParams }) {
  const { searchParams } = await props.params;
  const supabase = createClient();

  let query = supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  // Safely extract and type the search parameters
  const jobType =
    typeof searchParams.job_type === "string"
      ? searchParams.job_type
      : Array.isArray(searchParams.job_type)
        ? searchParams.job_type[0]
        : undefined;

  const location =
    typeof searchParams.location === "string"
      ? searchParams.location
      : Array.isArray(searchParams.location)
        ? searchParams.location[0]
        : undefined;

  // Apply filters if parameters exist
  if (jobType) {
    query = query.eq("job_type", jobType);
  }

  if (location) {
    query = query.eq("location", location);
  }

  const { data: jobs, error } = await query;

  if (error) {
    console.error("Error fetching jobs:", error);
    // You might want to handle this error differently in production
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Next Opportunity
        </h1>
        <p className="text-gray-600">Browse the latest job postings</p>
      </div>

      <JobFilter initialJobType={jobType} initialLocation={location} />

      <div className="grid grid-cols-1 gap-6">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {error
                ? "Error loading jobs. Please try again."
                : "No jobs found. Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
