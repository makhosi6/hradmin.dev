const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = withPWA({disable: process.env.NODE_ENV === "development"})(nextConfig);