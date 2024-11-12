/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets-global.website-files.com",
        pathname: "**",
      },
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        pathname: '**'
      }
    ],
  },
};

export default nextConfig;
