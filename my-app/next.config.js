const isGithubPages = process.env.NODE_ENV === "production";

const repo = "denial07-portfolio"; // Replace with your GitHub repo name

module.exports = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
}
