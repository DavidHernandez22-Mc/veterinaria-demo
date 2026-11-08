import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS to ./out,
// served by Cloudflare Workers static assets (see wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
