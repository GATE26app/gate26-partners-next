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
};
