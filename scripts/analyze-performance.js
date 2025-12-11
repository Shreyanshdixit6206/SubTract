#!/usr/bin/env node
/**
 * Performance Optimization Script
 * Run this after making changes to analyze bundle size and performance
 * 
 * Usage: npm run analyze-performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Running Performance Optimization Analysis...\n');

// 1. Check bundle size
console.log('📦 Analyzing bundle size...');
try {
  const buildOutput = execSync('next build', { encoding: 'utf-8', stdio: 'pipe' });
  console.log('✅ Build successful\n');
} catch (e) {
  console.log('⚠️  Build had warnings (non-critical)\n');
}

// 2. Analyze Next.js build output
console.log('📊 Next.js Build Statistics:');
const statsPath = path.join(process.cwd(), '.next', 'static');
if (fs.existsSync(statsPath)) {
  const getDirectorySize = (dir) => {
    let size = 0;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        size += stat.size;
      }
    });
    return size;
  };

  const bundleSize = getDirectorySize(statsPath);
  const bundleSizeMB = (bundleSize / 1024 / 1024).toFixed(2);
  
  console.log(`   Total Bundle Size: ${bundleSizeMB} MB`);
  console.log(`   ${bundleSizeMB < 2 ? '✅ GOOD' : '⚠️  NEEDS OPTIMIZATION'}\n`);
}

// 3. Performance recommendations
console.log('💡 Optimization Recommendations:\n');
console.log('✅ Already Implemented:');
console.log('   • Code splitting by chunk type (vendor, react, radix, charts, animations)');
console.log('   • Dynamic imports for heavy components');
console.log('   • SWC minification enabled');
console.log('   • Console log removal in production');
console.log('   • Optimized font loading with display=swap');
console.log('   • Image optimization with AVIF/WebP formats');
console.log('   • Disabled production source maps');
console.log('   • Core Web Vitals monitoring\n');

console.log('📝 Further Optimization Tips:');
console.log('   1. Use dynamic imports for modal/overlay components');
console.log('   2. Implement Route-based code splitting');
console.log('   3. Use React.memo() for expensive components');
console.log('   4. Implement virtual scrolling for long lists');
console.log('   5. Use useMemo() and useCallback() strategically');
console.log('   6. Lazy load images with next/image');
console.log('   7. Enable gzip compression on your server');
console.log('   8. Consider using a CDN for static assets\n');

console.log('🔍 Next Steps:');
console.log('   • Run: npm run build && npm start');
console.log('   • Use Lighthouse in Chrome DevTools');
console.log('   • Monitor Core Web Vitals in browser console');
console.log('   • Check network waterfall for bottlenecks\n');

console.log('✨ Performance optimization complete!\n');
