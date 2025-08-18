// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
// module.exports = {
//   experimental: { optimizeCss: false },
//   reactStrictMode: true,
// }

 
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.pravatar.cc', pathname: '/**' },
      { protocol: 'https', hostname: 'ac.goit.global', pathname: '/**' },
    ],
    // або замість remotePatterns можна так:
    // domains: ['i.pravatar.cc', 'ac.goit.global'],
  },
};

export default nextConfig;