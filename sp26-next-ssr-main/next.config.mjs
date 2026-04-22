/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app',
        permanent: true, // Returns 308
      },
      {
        source: '/products',
        destination: '/app',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
