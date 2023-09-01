/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "plus.unsplash.com"},
            {hostname: "images.unsplash.com"},
            {hostname: "res.cloudinary.com"}
        ]
    },
    reactStrictMode: false
}

module.exports = nextConfig
