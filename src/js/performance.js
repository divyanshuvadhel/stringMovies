// Performance optimization utilities
class PerformanceOptimizer {
  constructor() {
    this.imageCache = new Map();
    this.apiCache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Lazy loading for images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Debounce function for search
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Cache API responses
  cacheAPIResponse(key, data) {
    this.apiCache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getCachedAPIResponse(key) {
    const cached = this.apiCache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    this.apiCache.delete(key);
    return null;
  }

  // Preload critical images
  preloadImage(src) {
    if (!this.imageCache.has(src)) {
      const img = new Image();
      img.src = src;
      this.imageCache.set(src, img);
    }
  }

  // Optimize scroll performance
  throttleScroll(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Initialize performance optimizations
  init() {
    // Setup lazy loading
    this.setupLazyLoading();

    // Optimize scroll events
    const optimizedScroll = this.throttleScroll(() => {
      // Handle scroll events
    }, 100);

    window.addEventListener('scroll', optimizedScroll);

    // Preload critical resources
    this.preloadCriticalResources();
  }

  preloadCriticalResources() {
    // Preload hero images and critical assets
    const criticalImages = [
      'https://image.tmdb.org/t/p/w500', // Common poster size
      'https://image.tmdb.org/t/p/original' // Backdrop size
    ];

    criticalImages.forEach(src => this.preloadImage(src));
  }
}

// Initialize performance optimizer
const performanceOptimizer = new PerformanceOptimizer();
document.addEventListener('DOMContentLoaded', () => {
  performanceOptimizer.init();
});

export default performanceOptimizer;