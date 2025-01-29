import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'k.kakaocdn.net',
      'cakeway.s3.ap-northeast-2.amazonaws.com',
      'img1.kakaocdn.net',
    ],
    remotePatterns: [
      {
        protocol: 'https', // ✅ HTTPS 강제
        hostname: 'img1.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
