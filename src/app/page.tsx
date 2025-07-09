// src/app/page.tsx
import { createClient } from '../lib/superbase'
import JobFilter from '@/components/JobFilter'
import JobCard from '@/components/JobCard'

interface SearchParams {
  job_type?: string | string[]
  location?: string | string[]
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const supabase = createClient()
  let query = supabase.from('jobs').select('*').order('created_at', { ascending: false })

  // Safely extract and type the search parameters
  const jobType = typeof searchParams.job_type === 'string' 
    ? searchParams.job_type
    : Array.isArray(searchParams.job_type)
      ? searchParams.job_type[0]
      : undefined

  const location = typeof searchParams.location === 'string'
    ? searchParams.location
    : Array.isArray(searchParams.location)
      ? searchParams.location[0]
      : undefined

  // Apply filters if parameters exist
  if (jobType) {
    query = query.eq('job_type', jobType)
  }

  if (location) {
    query = query.eq('location', location)
  }

  const { data: jobs } = await query

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Opportunity</h1>
        <p className="text-gray-600">Browse the latest job postings</p>
      </div>

      <JobFilter initialJobType={jobType} initialLocation={location} />

      <div className="grid grid-cols-1 gap-6">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}