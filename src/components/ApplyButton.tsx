// src/components/ApplyButton.tsx
'use client'

import { createClient } from '../lib/superbase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ApplyButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleApply = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // In a real app, you would store applications in a separate table
      // For now, we'll just simulate the application
      setApplied(true)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleApply}
      disabled={applied || loading}
      className={`w-full py-3 px-4 rounded-md text-white font-medium ${
        applied 
          ? 'bg-green-500' 
          : 'bg-indigo-600 hover:bg-indigo-700'
      }`}
    >
      {loading ? 'Processing...' : applied ? 'Applied!' : 'Apply Now'}
    </button>
  )
}