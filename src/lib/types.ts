export type Job = {
  id: string;
  title: string;
  company_name: string;
  description: string;
  location: string;
  job_type: "Full-Time" | "Part-Time" | "Contract";
  created_at: string;
  user_id: string;
};

export type JobFormData = {
  title: string;
  company_name: string;
  description: string;
  location: string;
  job_type: "Full-Time" | "Part-Time" | "Contract";
};
