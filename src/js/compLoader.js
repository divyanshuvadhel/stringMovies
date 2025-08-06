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
    
  } catch (error) {
    console.log(`Error loading component: ${error}`);
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Use relative paths that work in both dev and production
  const basePath = window.location.pathname.includes('/public/') ? '../src/components/' : './src/components/';
  loadComponent(`${basePath}nav.html`, 'nav-placeholder');
  loadComponent(`${basePath}footer.html`, 'footer-placeholder');
});
