import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['k.kakaocdn.net', 'drive.google.com'], // 카카오 도메인 추가
  },
};

export default nextConfig;
