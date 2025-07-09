import Link from "next/link";
import { Job } from "../lib/types";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
            <p className="text-gray-600">{job.company_name}</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {job.job_type}
          </span>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{job.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{job.location}</span>
          <Link
            href={`/jobs/${job.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
