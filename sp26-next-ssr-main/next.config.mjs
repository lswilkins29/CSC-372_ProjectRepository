/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon',
        permanent: true, // Returns 308
      },
    ];
  },
};

export default nextConfig;
