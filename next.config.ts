import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // experimental: {
  //   reactCompiler: true,
  // },
  output: "standalone",
  images: {
    domains: ['s3.shopinka.ir', 'api.domingo.ir', 'car.vimascript.ir'],
  },
};

export default nextConfig;
