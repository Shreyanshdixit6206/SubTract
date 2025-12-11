/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production build optimizations
  reactStrictMode: true,
  
  // Enable SWC minification for smaller bundle size
  swcMinify: true,
  
  // Compress assets
  compress: true,
  
  // Image optimization
  images: {
    domains: ['localhost', 'logo.clearbit.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Cache optimization
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  },

  // Webpack config optimization
  webpack: (config, { isServer }) => {
    // Only apply optimizations in production
    if (process.env.NODE_ENV === 'production') {
      // Enable tree shaking and remove unused code
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // Default split chunks is fine for Next.js
    // Just ensure production optimizations work
    return config;
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-popover',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'lucide-react',
    ],
  },

  // Production source maps disabled to reduce bundle
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig
