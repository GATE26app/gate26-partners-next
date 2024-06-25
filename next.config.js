const { redirect } = require('next/dist/server/api-utils');

module.exports = {
  poweredByHeader: false,
  ignoreBuildErrors: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [
      'http://192.168.0.20:40009',
      'resource.gate26.co.kr',
      'd2x6bq0qfvknb8.cloudfront.net',
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./src/scripts/generate-sitemap-json');
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      // {
      //   source: '/api/backoffice/:path*',
      //   destination: 'https://cdpartners.gate26.co.kr/:path*',
      // },
    ];
  },

  async redirects() {
    return [
      {
        source: '/api/backoffice/:path*',
        destination: 'https://cdpartners.gate26.co.kr/:path*',
        permanent: false,
      },
    ];
  },
};
