/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'node-bucket.storage.c2.liara.space',
      },
    ],
  },
};

export default nextConfig;
