import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  
  images: {
    domains: [
      'krnxnqgtplepjvgcmrvv.supabase.co', 
      'lh3.googleusercontent.com',
    ],
  },

  // Optional: Output standalone build for Docker/Vercel serverless
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  experimental: {
    // Optional React Compiler (only if using React 19+ with @react/compiler)
    reactCompiler: process.env.NODE_ENV === 'production',
  },

  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
