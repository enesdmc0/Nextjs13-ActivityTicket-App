/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "plus.unsplash.com"}
        ]
    }
}

module.exports = nextConfig
