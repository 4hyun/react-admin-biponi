/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["bazar-website.s3.ap-south-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
