import { withContentlayer } from "next-contentlayer"

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  distDir: "build",
  experimental: {
    appDir: true,
  },
}

export default withContentlayer(nextConfig)
