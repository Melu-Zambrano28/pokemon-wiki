/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: { subsets: ['latin'], weight: ['200', '300', '800'] },
      },
    ],
  },
}

module.exports = nextConfig
