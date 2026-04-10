/**
 * OPTIMISATIONS PERFORMANCE POUR GOOGLE RANKING
 * Caching, monitoring, best practices
 */

// ============================================
// 1. CACHE STRATEGY POUR VERCEL
// ============================================

export const CACHE_HEADERS = {
  // Pages HTML (court cache - changent souvent)
  html: {
    'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400'
  },
  
  // Assets statiques (long cache - changent jamais)
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable'
  },
  
  // API responses (court cache - peuvent changer)
  api: {
    'Cache-Control': 'public, max-age=60, s-maxage=300'
  },
  
  // Images (moyen cache)
  images: {
    'Cache-Control': 'public, max-age=86400, s-maxage=31536000'
  }
};

// ============================================
// 2. UTILS POUR URLS IMAGES OPTIMISÉES
// ============================================

/**
 * Optimize image URLs pour Vercel/Cloudinary
 * Réduit taille et améliore performance
 */
export function optimizeImageUrl(
  originalUrl: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number; // 60-90
    format?: 'webp' | 'jpg' | 'png';
  }
): string {
  const q = options?.quality || 80;
  const w = options?.width;
  const h = options?.height;
  const fmt = options?.format || 'webp';

  // Si via Vercel Image Optimization
  if (originalUrl.includes('vercel.app')) {
    const params = [
      w && `w=${w}`,
      h && `h=${h}`,
      `q=${q}`,
      `f=${fmt}`
    ].filter(Boolean).join('&');
    
    return `${originalUrl}?${params}`;
  }

  return originalUrl;
}

// ============================================
// 3. PRELOAD CRITICAL RESOURCES
// ============================================

export function preloadCriticalResources() {
  if (typeof document === 'undefined') return;

  // Précharger fonts importantes
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.href = '/fonts/inter-var.woff2';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);

  // Prefetch DNS pour domaines externes
  ['https://images.pexels.com', 'https://www.googletagmanager.com'].forEach(domain => {
    const prefetch = document.createElement('link');
    prefetch.rel = 'dns-prefetch';
    prefetch.href = domain;
    document.head.appendChild(prefetch);
  });
}

// ============================================
// 4. PERFORMANCE MONITORING
// ============================================

export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Web Vitals - Google's core metrics
  window.addEventListener('load', () => {
    // Largest Contentful Paint (LCP)
    const largest = performance.getEntriesByType('largest-contentful-paint');
    if (largest.length > 0) {
      console.log(`LCP: ${largest[largest.length - 1].startTime}ms`);
    }

    // First Input Delay (FID)
    const first = performance.getEntriesByType('first-input');
    if (first.length > 0) {
      console.log(`FID: ${(first[0] as any).processingDuration}ms`);
    }

    // Cumulative Layout Shift (CLS)
    let cls = 0;
    performance.getEntriesByType('layout-shift').forEach(entry => {
      if (!(entry as any).hadRecentInput) {
        cls += (entry as any).value;
      }
    });
    console.log(`CLS: ${cls}`);
  });
}

// ============================================
// 5. LAZY LOAD HOOK REACT
// ============================================

export function useLazyLoad(ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
}

// ============================================
// 6. AUDIT SEO Checklist
// ============================================

export const SEO_AUDIT_CHECKLIST = {
  'Technical SEO': {
    'robots.txt': { status: 'done', url: '/robots.txt' },
    'sitemap.xml': { status: 'done', url: '/sitemap.xml' },
    'meta viewports': { status: 'done' },
    'canonical tags': { status: 'done' },
    'HTTPS': { status: 'done' },
    'Mobile responsive': { status: 'pending' },
    'Page speed': { status: 'pending' },
    'Core Web Vitals': { status: 'pending' }
  },
  'On-Page SEO': {
    'Title tags (60 chars)': { status: 'done' },
    'Meta descriptions (160 chars)': { status: 'done' },
    'H1 unique': { status: 'done' },
    'H2/H3 structure': { status: 'done' },
    'Image alt text': { status: 'pending' },
    'Internal linking': { status: 'pending' },
    'Keyword density': { status: 'pending' }
  },
  'Local SEO': {
    'Google Business Profile': { status: 'pending' },
    'Local keywords': { status: 'done' },
    'Geo tags': { status: 'done' },
    'Address/Phone': { status: 'done' }
  },
  'Off-Page SEO': {
    'Backlinks': { status: 'pending' },
    'Social media': { status: 'pending' },
    'Reviews management': { status: 'pending' }
  }
};

// Import React pour la fonction useLazyLoad
import React from 'react';
