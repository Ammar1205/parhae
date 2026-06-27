import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimize images from Firebase Storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google auth profile images
      },
    ],
  },

  // Externalize firebase-admin from server bundles
  serverExternalPackages: ['firebase-admin'],

  // Turbopack config for faster dev builds
  experimental: {},
};

export default nextConfig;
