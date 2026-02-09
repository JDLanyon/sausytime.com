import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}
 
export default nextConfig