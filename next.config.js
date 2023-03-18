/** @type {import('next').NextConfig} */
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
    ],
  },
};

module.exports = nextConfig;
