import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static2.finnhub.io',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/relay-XHg9/static/(.*)',
        destination: 'https://eu-assets.i.posthog.com/static/$1',
      },
      {
        source: '/relay-XHg9/(.*)',
        destination: 'https://eu.i.posthog.com/$1',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
