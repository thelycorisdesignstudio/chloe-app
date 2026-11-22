import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Login and signup were removed; send old links to the home page.
  async redirects() {
    return [
      { source: '/login', destination: '/', permanent: false },
      { source: '/signup', destination: '/', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'thumb.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'olioli.ae',
      },
      {
        protocol: 'https',
        hostname: 'cdn-ilefodp.nitrocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thegreenplanetdubai.com',
      },
      {
        protocol: 'https',
        hostname: 'cdnentcms.emaar.com',
      },
      {
        protocol: 'https',
        hostname: 'www.aventuraparks.com',
      },
      {
        protocol: 'https',
        hostname: 'static.myconnect.ae',
      },
      {
        protocol: 'https',
        hostname: 'thenationalaquarium.ae',
      },
      {
        protocol: 'https',
        hostname: 'sharjahsafari.ae',
      },
      {
        protocol: 'https',
        hostname: 'dreamlanduae.com',
      },
      {
        protocol: 'https',
        hostname: 'janat-dilmun.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
