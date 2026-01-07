/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
        // Disable optimization for external images to avoid 500 errors
        unoptimized: true,
    },
};

module.exports = nextConfig;
