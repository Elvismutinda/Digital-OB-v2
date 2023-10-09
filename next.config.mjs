import { withContentlayer } from "next-contentlayer";

import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.lifloelectronics.co.ke"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
    logging: {
      level: "verbose",
      fullUrl: true,
    },
  },
};

export default withContentlayer(nextConfig);
