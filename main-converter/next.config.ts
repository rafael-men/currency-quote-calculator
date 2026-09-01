import type { NextConfig } from "next";

const repoName = "currency-quote-calculator";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  output: "export", 
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
