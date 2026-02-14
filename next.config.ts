import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    
    loader: 'custom',
    loaderFile: './loader.ts', 
  },}
  ;

export default nextConfig;




