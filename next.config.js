/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "swiperjs.com",
      },
      {
        protocol: "https",
        hostname: "api.fri7a.com",
      },
    ],
  },
};

module.exports = nextConfig;
