import { withContentlayer } from "next-contentlayer";

import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.lifloelectronics.co.ke"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

export default withContentlayer(nextConfig);
