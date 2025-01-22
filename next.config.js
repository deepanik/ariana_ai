/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['replicate.com', 'replicate.delivery'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 