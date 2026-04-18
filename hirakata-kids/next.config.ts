import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // When heroImage support is wired up in frontmatter, these formats will
  // be emitted automatically for any <Image> usage.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
