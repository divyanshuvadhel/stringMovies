// Global error handling utility
class ErrorHandler {
  static showError(message, containerId = null) {
    console.error('Application Error:', message);
    
    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = `
          <div class="flex flex-col items-center justify-center py-10 text-center">
            <div class="text-red-500 text-lg mb-2">⚠️ Error</div>
            <div class="text-gray-300">${message}</div>
            <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-amber-400 text-black rounded hover:bg-amber-500 transition">
              Retry
            </button>
          </div>
        `;
      }
    }
  }

  static showNetworkError(containerId = null) {
    this.showError('Network error. Please check your connection and try again.', containerId);
  }

  static showAPIError(containerId = null) {
    this.showError('Unable to load content. Please try again later.', containerId);
  }

  static handleAsyncError(asyncFn) {
    return async (...args) => {
      try {
        return await asyncFn(...args);
      } catch (error) {
        console.error('Async operation failed:', error);
        throw error;
      }
    };
  }
}

// Global error event listeners
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

export default ErrorHandler;