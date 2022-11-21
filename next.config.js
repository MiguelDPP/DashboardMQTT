/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/dashboard/edit/',
  //       destination: '/dashboard/',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
