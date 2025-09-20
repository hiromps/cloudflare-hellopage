/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to enable API routes
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;