import { searchMovies } from './data.js';

class SearchHandler {
  constructor() {
    this.searchInput = null;
    this.searchResults = null;
    this.debounceTimer = null;
    this.init();
  }

  init() {
    // Wait for navigation to load
    setTimeout(() => this.setupSearch(), 100);
  }

  setupSearch() {
    this.searchInput = document.querySelector('input[placeholder="Search movies..."]');
    if (!this.searchInput) {
      // Try again after a short delay
      setTimeout(() => this.setupSearch(), 500);
      return;
    }

    // Create search results container
    this.createSearchResults();
    
    // Add event listeners
    this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    this.searchInput.addEventListener('focus', () => this.showResults());
    document.addEventListener('click', (e) => this.handleClickOutside(e));
  }

  createSearchResults() {
    this.searchResults = document.createElement('div');
    this.searchResults.className = 'absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-lg mt-1 max-h-96 overflow-y-auto z-50 hidden';
    this.searchInput.parentElement.appendChild(this.searchResults);
  }

  handleSearch(query) {
    clearTimeout(this.debounceTimer);
    
    if (query.length < 2) {
      this.hideResults();
      return;
    }

    this.debounceTimer = setTimeout(async () => {
      try {
        const results = await searchMovies(query);
        this.displayResults(results.results?.slice(0, 8) || []);
      } catch (error) {
        console.error('Search error:', error);
      }
    }, 300);
  }

  displayResults(movies) {
    if (movies.length === 0) {
      this.searchResults.innerHTML = '<div class="p-4 text-gray-400">No movies found</div>';
    } else {
      this.searchResults.innerHTML = movies.map(movie => `
        <div class="flex items-center p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-600 last:border-b-0" onclick="window.location.href='movie-detail.html?id=${movie.id}'">
          <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/92x138?text=No+Image'}" 
               class="w-12 h-18 object-cover rounded mr-3" alt="${movie.title}">
          <div class="flex-1">
            <h4 class="text-white font-semibold text-sm">${movie.title}</h4>
            <p class="text-gray-400 text-xs">${movie.release_date?.split('-')[0] || 'TBD'} • ⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}</p>
          </div>
        </div>
      `).join('');
    }
    this.showResults();
  }

  showResults() {
    this.searchResults.classList.remove('hidden');
  }

  hideResults() {
    this.searchResults.classList.add('hidden');
  }

  handleClickOutside(e) {
    if (!this.searchInput?.parentElement.contains(e.target)) {
      this.hideResults();
    }
  }
}

export default SearchHandler;