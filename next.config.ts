// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'https://krnxnqgtplepjvgcmrvv.supabase.co', // Supabase storage domain
      'lh3.googleusercontent.com' // If using Google auth
    ],
  },
  // Enable SWC minification (recommended by Vercel)
  swcMinify: true,
  // Output standalone for better performance (optional)
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // Enable React compiler if using (optional)
  experimental: {
    reactCompiler: process.env.NODE_ENV === 'production',
  },
  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

export default nextConfig