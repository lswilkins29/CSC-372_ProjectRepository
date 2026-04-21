/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true, // Returns 308
      },
    ];
  },
};

export default nextConfig;
