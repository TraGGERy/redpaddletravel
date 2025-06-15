/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.travel-assets.com','wallpaperaccess.com','travelandleisure.com','content.api.news', 'www.travelandleisure.com', 'media-cdn.tripadvisor.com','iabtravel.com','content.r9cdn.net','images.unsplash.com', 'randomuser.me','wildtimessafaris.com','zimbabwetourism.net', 'cdn.britannica.com', 'dynamic-media-cdn.tripadvisor.com','cdn.audleytravel.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;