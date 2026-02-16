import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // experimental: {
  //   reactCompiler: true,
  // },
  output: "standalone",
  images: {
    domains: ['s3.shopinka.ir', 'shopinka-dev.s3.ir-thr-at1.arvanstorage.ir']
  },
};

export default nextConfig;
