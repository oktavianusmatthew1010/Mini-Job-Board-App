import { notFound } from "next/navigation";
import { createClient } from "../../../../lib/superbase";
import ApplyButton from "@/components/ApplyButton";

export const dynamic = "force-dynamic";
type tParams = Promise<{ slug: string[] }>;

export default async function JobDetailPage(props: { params: tParams }) {
  const { slug } = await props.params;
  const productID = slug[1];

  const supabase = createClient();

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", productID)
    .single();

  if (error || !job) {
    console.error("Error fetching job:", error);
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-lg text-gray-600">{job.company_name}</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {job.job_type}
            </span>
          </div>

          <div className="mt-6 flex items-center text-sm text-gray-500 mb-2">
            <svg
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {job.location}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Job Description
            </h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{job.description}</p>
            </div>
          </div>

          <div className="mt-8">
            <ApplyButton jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
