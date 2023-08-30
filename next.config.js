/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "plus.unsplash.com"},
            {hostname: "images.unsplash.com"}
        ]
    },
    reactStrictMode: false
}

module.exports = nextConfig
