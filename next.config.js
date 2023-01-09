const { redirect } = require('next/dist/server/api-utils');

module.exports = {
  poweredByHeader: false,
  ignoreBuildErrors: true,
  eslint: {
    ignoreDuringBuilds: true,
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
    ];
  },

  async redirects() {
    return [
      {
        source: '/backoffice/:path*',
        destination: 'http://localhost:40004/:path*',
        // destination: 'http://dbackoffice.gate26.co.kr/:path*',
        permanent: false,
      },
    ];
  },
};
