// actions/createJob.ts
'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function createJob(formData: FormData) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const jobData = {
    title: formData.get('title'),
    company_name: formData.get('company_name'),
    description: formData.get('description'),
    location: formData.get('location'),
    job_type: formData.get('job_type'),
    user_id: user.id
  };

  const { error } = await supabase.from('jobs').insert(jobData);
  if (error) throw error;
  
  return { success: true };
}