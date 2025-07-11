const isGithubPages = process.env.NODE_ENV === "production";
const repo = "denial07-portfolio"; // GitHub repo name

module.exports = {
  output: "export", // Needed for static HTML export (GitHub Pages requires this)
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  images: { unoptimized: true }, // Required if using `next/image` with `next export`
  basePath: isGithubPages ? `/${repo}` : "", // Ensures routing works on GitHub Pages
  assetPrefix: isGithubPages ? `/${repo}/` : "", // Ensures assets load correctly
};
