// Movie Slider Component Class
class MovieSlider {
  constructor(containerId, title, movies) {
    this.containerId = containerId;
    this.title = title;
    this.movies = movies;
    this.init();
  }

  async init() {
    await this.loadComponent();
    this.render();
    this.setupControls();
  }

  async loadComponent() {
    const response = await fetch('../src/components/movie-slider.html');
    const html = await response.text();
    document.getElementById(this.containerId).innerHTML = html;
  }

  render() {
    const container = document.getElementById(this.containerId);
    const titleEl = container.querySelector('.slider-title');
    const sliderContainer = container.querySelector('.slider-container');
    
    titleEl.textContent = this.title;
    
    if (!this.movies || this.movies.length === 0) {
      sliderContainer.innerHTML = '<div class="text-gray-500 text-center py-10">No movies available</div>';
      return;
    }

    sliderContainer.innerHTML = this.movies.map(movie => {
      const isTV = movie.name && !movie.title;
      const detailUrl = isTV ? `tv-detail.html?id=${movie.id}` : `movie-detail.html?id=${movie.id}`;
      
      return `
        <div class="flex-shrink-0 w-36 sm:w-40 lg:w-48 bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer" onclick="window.location.href='${detailUrl}'">
          <div class="relative">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                 alt="${movie.title || movie.name}" 
                 class="w-full h-52 sm:h-60 lg:h-72 object-cover"
                 onerror="this.src='https://via.placeholder.com/500x750?text=No+Image'">
            <div class="absolute top-1 sm:top-2 right-1 sm:right-2 bg-black/70 text-white px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
              ⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}
            </div>
            ${isTV ? '<div class="absolute top-1 sm:top-2 left-1 sm:left-2 bg-blue-600 text-white px-1 sm:px-2 py-1 rounded text-xs">TV</div>' : ''}
          </div>
          <div class="p-2 sm:p-3">
            <h3 class="text-white font-semibold text-xs sm:text-sm truncate">${movie.title || movie.name}</h3>
            <p class="text-gray-400 text-xs mt-1">${movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || 'TBD'}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  setupControls() {
    const container = document.getElementById(this.containerId);
    const leftBtn = container.querySelector('.slider-left');
    const rightBtn = container.querySelector('.slider-right');
    const slider = container.querySelector('.slider-container');
    
    if (leftBtn && rightBtn && slider) {
      // Responsive scroll distance
      const getScrollDistance = () => {
        const width = window.innerWidth;
        if (width < 640) return 300; // Mobile
        if (width < 1024) return 400; // Tablet
        return 600; // Desktop
      };
      
      leftBtn.onclick = () => slider.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
      rightBtn.onclick = () => slider.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
    }
  }
}

export default MovieSlider;