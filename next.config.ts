import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'j1ag6l14g8.ufs.sh',
        pathname: '/f/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;