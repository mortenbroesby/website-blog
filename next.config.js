const analyzeBuild = process.env.ANALYZE === "true";

const path = require("path");
const withMdxFm = require("next-mdx-frontmatter");
const withPlugins = require("next-compose-plugins");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: analyzeBuild,
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "./src"),
    };

    if (analyzeBuild) {
      config.plugins.push(new DuplicatePackageCheckerPlugin());
    }

    return config;
  },
};

const configWithMDX = withMdxFm()(nextConfig);
const configWithAnalyzer = withPlugins([withBundleAnalyzer], configWithMDX);

module.exports = configWithAnalyzer;
