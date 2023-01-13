/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: { subsets: ['latin'], weight: ['400', '300', '800'] },
      },
    ],
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
