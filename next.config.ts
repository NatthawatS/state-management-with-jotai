import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Learn more here - https://nextjs.org/docs/advanced-features/compiler#module-transpilation
  // Required for UI css to be transpiled correctly 👇
  transpilePackages: ['jotai-devtools'],
};

export default nextConfig;
