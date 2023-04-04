/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "links.papareact.com",
      "images.unsplash.com",
      "www.google.com",
      "unsplash.com",
      "m.media-amazon.com",
      "plus.unsplash.com",
      "1.bp.blogspot.com",
      "a0.muscache.com",
      "avatars.dicebear.com",
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
};

module.exports = nextConfig;
