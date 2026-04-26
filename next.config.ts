import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    domains: ["localhost", "127.0.0.1"],
    loader: 'custom',
    loaderFile: './loader.ts', 
  },}
  ;

export default nextConfig;




