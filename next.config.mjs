/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'AIzaSyBLx620AeBQnveLI0c7kflx282CNVlJQU8',
    SECRET_KEY: 'IDT-ReGate26',
    URL_API: 'https://web.gate26.co.kr',
    NEXT_PUBLIC_SENDBIRD_APP_ID:
      process.env.NODE_ENV === "production"
        ? '78B8D84A-E617-493C-98CA-2D15F647923B' // 운영 환경
        : '66FCC048-72FA-40D7-BCE7-89F42D63600B', // 개발 환경

    // vercel환경
    NEXT_PUBLIC_SENDBIRD_APP_ID:
      process.env.VERCEL_ENV === 'production'
        ? '78B8D84A-E617-493C-98CA-2D15F647923B' // 운영
        : '66FCC048-72FA-40D7-BCE7-89F42D63600B', // 개발 또는 preview
  },
  images: {
    domains: [
      'http://192.168.0.20:40009',
      'resource.gate26.co.kr',
      'd2x6bq0qfvknb8.cloudfront.net',
      'https://dmsxpx4f2ky7d.cloudfront.net',
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     require('./src/scripts/generate-sitemap-json');
  //   }
  //   return config;
  // },
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
        // destination: 'https://cdpartners.gate26.co.kr/:path*',
        permanent: false,
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/api/backoffice/:path*',
  //       // destination: 'http://localhost:40004/:path*',
  //       destination: 'http://192.168.0.63:40009/:path*',
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
