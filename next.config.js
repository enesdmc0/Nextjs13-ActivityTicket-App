/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "plus.unsplash.com"},
            {hostname: "images.unsplash.com"}
        ]
    }
}

module.exports = nextConfig
