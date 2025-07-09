// app/jobs/new/page.tsx
import JobForm from "../../../../components/JobForm";

export default function NewJobPage() {
  // This is a Server Component - no Supabase client here
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Post New Job</h1>
      <JobForm />
    </div>
  );
}
