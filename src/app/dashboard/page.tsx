import { createClient } from "../../lib/superbase";
import Link from "next/link";
import JobCard from "@/components/JobCard";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Job Postings</h1>
        <Link
          href="/dashboard/jobs/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Post a Job
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="relative">
              <JobCard job={job} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link
                  href={`/dashboard/jobs/${job.id}`}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">You havent posted any jobs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
