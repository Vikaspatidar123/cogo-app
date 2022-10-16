/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode : true,
  swcMinify       : true,
  basePath        : '/app',
  assetPrefix     : '/app',
  webpack(config) {
    const newConfig = { ...config };
    newConfig.module.rules.push({
      test : /\.svg$/i,
      use  : [{ loader: '@svgr/webpack' }],
    });
    return config;
  },
};
