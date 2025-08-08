async function loadComponent(path, elementId) {
  try {
    const placeholder = document.getElementById(elementId);
    if (!placeholder) {
      console.log(`Element not found: ${elementId}`);
      return;
    }

    const response = await fetch(path);
    if (!response.ok) {
      console.log(`Failed to load component: ${path}`);
      return;
    }
    
    const html = await response.text();
    placeholder.innerHTML = html;
    
    // Initialize mobile menu after nav component is loaded
    if (elementId === 'nav-placeholder') {
      setTimeout(initializeMobileMenu, 0);
    }
    
  } catch (error) {
    console.log(`Error loading component: ${error}`);
  }
}

// Mobile menu initialization
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close menu when clicking on links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Use relative paths for Firebase hosting
  const basePath = './src/components/';
  loadComponent(`${basePath}nav.html`, 'nav-placeholder');
  loadComponent(`${basePath}footer.html`, 'footer-placeholder');
});
