// next.config.js
const isGithubPages = process.env.NODE_ENV === 'production';

const repo = 'denail07-portfolio'; // 👈 replace this with your GitHub repo name

module.exports = {
  output: 'export',
  basePath: isGithubPages ? `/${repo}` : '',
  trailingSlash: true,
  images: { unoptimized: true },
};
