// Component loader with error handling and performance optimization
class ComponentLoader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  async loadComponent(name, elementId) {
    try {
      // Check cache first
      if (this.cache.has(name)) {
        document.getElementById(elementId).innerHTML = this.cache.get(name);
        return;
      }

      // Check if already loading
      if (this.loadingPromises.has(name)) {
        const html = await this.loadingPromises.get(name);
        document.getElementById(elementId).innerHTML = html;
        return;
      }

      // Create loading promise
      const loadingPromise = fetch('/src/components/' + name + '.html')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load component: ' + name);
          }
          return response.text();
        })
        .then(html => {
          this.cache.set(name, html);
          this.loadingPromises.delete(name);
          return html;
        });

      this.loadingPromises.set(name, loadingPromise);
      const html = await loadingPromise;
      document.getElementById(elementId).innerHTML = html;
      
    } catch (error) {
      console.error('Error loading component ' + name + ':', error);
      document.getElementById(elementId).innerHTML = '<div class="error">Failed to load ' + name + '</div>';
    }
  }
}

// Initialize app
const componentLoader = new ComponentLoader();

// DOM Content Loaded handler
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Show loading indicator
    const loading = document.getElementById('loading');
    if (loading) loading.classList.remove('hidden');

    // Load components concurrently
    await Promise.all([
      componentLoader.loadComponent('nav', 'nav'),
      componentLoader.loadComponent('footer', 'footer')
    ]);

    // Update current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Initialize page-specific functionality
    initializePage();

    // Hide loading indicator
    if (loading) loading.classList.add('hidden');

  } catch (error) {
    console.error('Error initializing app:', error);
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
  }
});

// Page-specific initialization
function initializePage() {
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }

  // Active navigation highlighting
  highlightActiveNavigation();
}

// Contact form handler
function handleContactForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // Here you would typically send data to a server
  console.log('Form submitted:', data);
  
  // Show success message (replace with actual form handling)
  alert('Thank you for your message! We will get back to you soon.');
  event.target.reset();
}

// Highlight active navigation
function highlightActiveNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (
      (currentPath === '/' && href === '/') ||
      (currentPath !== '/' && href === currentPath) ||
      (currentPath.includes(href) && href !== '/')
    ) {
      link.classList.add('text-blue-300', 'font-semibold');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Error handling for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});