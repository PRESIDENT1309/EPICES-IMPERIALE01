/**
 * Performance optimization utilities for Google ranking factors
 * Includes image optimization, resource preloading, and performance monitoring
 */

/**
 * Generate optimized image URLs with size and quality parameters
 */
export function optimizeImageUrl(
  url: string,
  width?: number,
  quality: number = 80,
  format: 'webp' | 'jpg' | 'png' = 'webp'
): string {
  if (!url) return '';
  
  // For local images
  if (url.startsWith('/')) {
    return url;
  }
  
  // For Supabase or external images
  if (url.includes('supabase')) {
    const params = new URLSearchParams();
    if (width) params.append('width', width.toString());
    params.append('quality', quality.toString());
    params.append('format', format);
    return `${url}?${params.toString()}`;
  }
  
  return url;
}

/**
 * Preload critical resources for performance
 */
export function preloadCriticalResources(): void {
  // Preload fonts
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
  link.as = 'style';
  document.head.appendChild(link);

  // DNS prefetch for external services
  const dnsPrefetch = document.createElement('link');
  dnsPrefetch.rel = 'dns-prefetch';
  dnsPrefetch.href = 'https://supabase.com';
  document.head.appendChild(dnsPrefetch);
}

/**
 * Initialize performance monitoring using Web Vitals
 */
export function initPerformanceMonitoring(): void {
  if ('PerformanceObserver' in window) {
    // Observe Largest Contentful Paint (LCP)
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const perfEntry = entry as any;
          console.log('LCP:', perfEntry.renderTime || perfEntry.loadTime);
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.debug('LCP not supported');
    }

    // Observe First Input Delay (FID)
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const perfEntry = entry as any;
          console.log('FID:', perfEntry.processingDuration);
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.debug('FID not supported');
    }

    // Observe Cumulative Layout Shift (CLS)
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const perfEntry = entry as any;
          console.log('CLS:', perfEntry.value);
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.debug('CLS not supported');
    }
  }
}

/**
 * React hook for lazy loading images using Intersection Observer
 */
export function useLazyLoad(ref: React.RefObject<HTMLElement> | null): void {
  React.useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    const images = ref.current.querySelectorAll('img[data-src]');
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [ref]);
}

/**
 * Cache headers configuration for different asset types
 */
export const CACHE_HEADERS = {
  // Static assets - cache for 1 year
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable',
  },
  // HTML pages - cache for 1 hour
  html: {
    'Cache-Control': 'public, max-age=3600, must-revalidate',
  },
  // API responses - cache for 5 minutes
  api: {
    'Cache-Control': 'public, max-age=300, must-revalidate',
  },
  // Images - cache for 1 week
  images: {
    'Cache-Control': 'public, max-age=604800',
  },
};

/**
 * Performance audit checklist
 */
export const PERFORMANCE_CHECKLIST = {
  coreWebVitals: [
    '✓ LCP (Largest Contentful Paint): < 2.5s',
    '✓ FID (First Input Delay): < 100ms',
    '✓ CLS (Cumulative Layout Shift): < 0.1',
  ],
  imageOptimization: [
    '✓ Use WebP format with fallbacks',
    '✓ Responsive images with srcset',
    '✓ Lazy load below-the-fold images',
    '✓ Compress images < 50KB',
  ],
  codeOptimization: [
    '✓ Minify CSS and JavaScript',
    '✓ Code splitting with dynamic imports',
    '✓ Remove unused CSS (Tailwind)',
    '✓ Tree shake unused code',
  ],
  caching: [
    '✓ Configure cache headers',
    '✓ Enable compression (gzip)',
    '✓ Browser caching enabled',
  ],
};

// Import React for useLazyLoad hook
import React from 'react';

export default {
  optimizeImageUrl,
  preloadCriticalResources,
  initPerformanceMonitoring,
  useLazyLoad,
  CACHE_HEADERS,
  PERFORMANCE_CHECKLIST,
};
