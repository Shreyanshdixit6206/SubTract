/**
 * Performance Monitoring Utility
 * Tracks Web Vitals and component render times
 */

// Core Web Vitals tracking
export interface WebVitals {
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  TTFB: number; // Time to First Byte
}

// Performance marks
const performanceMarks = new Map<string, number>();

/**
 * Start measuring performance
 */
export function measureStart(label: string): void {
  if (typeof window === 'undefined') return;
  performanceMarks.set(label, performance.now());
}

/**
 * End measuring and log duration
 */
export function measureEnd(label: string, logThreshold = 100): number {
  if (typeof window === 'undefined') return 0;
  
  const startTime = performanceMarks.get(label);
  if (!startTime) {
    console.warn(`No start mark found for: ${label}`);
    return 0;
  }

  const duration = performance.now() - startTime;
  
  if (duration > logThreshold && process.env.NODE_ENV === 'development') {
    console.log(`⏱️  ${label}: ${duration.toFixed(2)}ms`);
  }

  performanceMarks.delete(label);
  return duration;
}

/**
 * Track Core Web Vitals
 */
export function initCoreWebVitals(onMetrics?: (metrics: Partial<WebVitals>) => void): void {
  if (typeof window === 'undefined') return;

  const vitals: Partial<WebVitals> = {};

  // Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        vitals.LCP = Math.round(lastEntry.renderTime || lastEntry.loadTime);
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        vitals.FCP = Math.round(entries[entries.length - 1].startTime);
      });

      fcpObserver.observe({ entryTypes: ['paint'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            vitals.CLS = Math.round(clsValue * 1000) / 1000;
          }
        }
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Report metrics
      if (onMetrics) {
        // Report after page load
        window.addEventListener('load', () => {
          setTimeout(() => onMetrics(vitals), 0);
        });
      }
    } catch (e) {
      console.error('Core Web Vitals tracking error:', e);
    }
  }
}

/**
 * Monitor component render times
 */
export function useRenderPerformance(componentName: string): void {
  if (typeof window === 'undefined') return;

  const startTime = performance.now();

  if (process.env.NODE_ENV === 'development') {
    const renderTime = performance.now() - startTime;
    if (renderTime > 16.67) { // 60fps threshold
      console.warn(`⚠️  Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
  }
}

/**
 * Memory usage monitoring
 */
export function getMemoryUsage(): number | null {
  if (typeof window === 'undefined') return null;
  
  const memory = (performance as any).memory;
  if (!memory) return null;
  
  return Math.round(memory.usedJSHeapSize / 1048576); // Convert to MB
}

/**
 * Log performance metrics to console
 */
export function logPerformanceMetrics(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  const memory = getMemoryUsage();
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  console.group('📊 Performance Metrics');
  console.log(`DOM Content Loaded: ${Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)}ms`);
  console.log(`Page Load Time: ${Math.round(navigation.loadEventEnd - navigation.loadEventStart)}ms`);
  console.log(`First Paint: ${Math.round(navigation.responseEnd - navigation.fetchStart)}ms`);
  if (memory) console.log(`Heap Used: ${memory}MB`);
  console.groupEnd();
}

/**
 * Disable expensive operations on slow connections
 */
export function isSlowNetwork(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  const connection = (navigator as any).connection || (navigator as any).mozConnection;
  if (!connection) return false;
  
  return connection.effectiveType === '2g' || connection.effectiveType === '3g';
}
