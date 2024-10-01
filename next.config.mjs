/** @type {import('next').NextConfig} */
const clientName = process?.env?.NEXT_PUBLIC_CLIENT_NAME || 'qa';

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
};

export default nextConfig;
