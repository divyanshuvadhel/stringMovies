import { getToprated, getTodayTop, getFeaturedMovies, getNewRelease } from "../../src/js/data.js";
import MovieSlider from "../../src/js/movieSlider.js";
import ErrorHandler from "../../src/js/errorHandler.js";

// Loading state Management
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '<div class="flex justify-center items-center py-10"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>';
  }
}

// Error handling
function showError(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `<div class="text-red-500 text-center py-10">${message}</div>`;
  }
}

// Initialize app
async function initializeApp() {
  try {
    // Show loading states
    showHeroLoading();
    showLoading('fetured-carousel');
    showLoading('top-picks-carousel');
    showLoading('new-carousel');

    // Fetch data concurrently
    const [toprated, topToday, featuredMovies, newReleases] = await Promise.all([
      getToprated(),
      getTodayTop(),
      getFeaturedMovies(),
      getNewRelease()
    ]);

    // Initialize hero section with time evey 10sec
    initializeHero(featuredMovies?.results?.[0]);
    
    setInterval(() => {
      initializeHero(featuredMovies?.results?.[Math.floor(Math.random() * 10)]);
    }, 10000);

    
    // Setup movie sliders
    new MovieSlider('fetured-movies', 'Featured Today', featuredMovies?.results);
    new MovieSlider('topPics-movies', 'Top Picks', toprated?.results);
    new MovieSlider('new-movies', 'New Release', newReleases?.results);
    
  } catch (error) {
    console.error('Failed to initialize app:', error);
    ErrorHandler.showAPIError('fetured-carousel');
    ErrorHandler.showAPIError('top-picks-carousel');
    ErrorHandler.showAPIError('new-carousel');
  }
}

// Hero loading state
function showHeroLoading() {
  const heroBackground = document.querySelector('#hero-background');
  const heroTitle = document.querySelector('#hero-movieTitle span');
  const heroDescription = document.querySelector('#description');
  
  if (heroBackground) {
    heroBackground.innerHTML = '<div class="flex justify-center items-center h-full"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>';
  }
  if (heroTitle) heroTitle.textContent = 'Loading...';
  if (heroDescription) heroDescription.textContent = 'Loading movie information...';
}

// Hero section initialization
  const heroElements = {
    backgroundImg: document.querySelector('#hero-background'),
    title: document.querySelector('#hero-movieTitle span'),
    description: document.querySelector('#description'),
    viewDetails: document.querySelector('#viewDetails')
  };

function initializeHero(movie) {
  if (!movie) return;
  

  
  if (heroElements.backgroundImg) {
    heroElements.backgroundImg.innerHTML = `<img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title}" class="w-full h-full object-cover">`;
  }
  
  if (heroElements.title) {
    heroElements.title.textContent = movie.title || movie.name;
  }
  
  if (heroElements.description) {
    heroElements.description.textContent = movie.overview;
  }
  
  if (heroElements.viewDetails) {
    heroElements.viewDetails.href = `movie-detail.html?id=${movie.id}`;
  }
}

// Render movie sections
function renderMovieSection(movies, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !movies) return;
  
  container.innerHTML = movies.map(movie => `
    <div class="flex-shrink-0 w-48 bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer" onclick="window.location.href='movie-detail.html?id=${movie.id}'">
      <div class="relative">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
             alt="${movie.title || movie.name}" 
             class="w-full h-72 object-cover"
             onerror="this.src='https://via.placeholder.com/500x750?text=No+Image'">
        <div class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          ⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}
        </div>
      </div>
      <div class="p-3">
        <h3 class="text-white font-semibold text-sm truncate">${movie.title || movie.name}</h3>
        <p class="text-gray-400 text-xs mt-1">${movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || 'TBD'}</p>
      </div>
    </div>
  `).join('');
}

// Carousel controls
function initializeCarouselControls() {
  const carousels = [
    { left: 'featured-left', right: 'featured-right', carousel: 'fetured-carousel' },
    { left: 'toppicks-left', right: 'toppicks-right', carousel: 'top-picks-carousel' },
    { left: 'new-left', right: 'new-right', carousel: 'new-carousel' }
  ];
  
  carousels.forEach(({ left, right, carousel }) => {
    const leftBtn = document.getElementById(left);
    const rightBtn = document.getElementById(right);
    const carouselEl = document.getElementById(carousel);
    
    if (leftBtn && rightBtn && carouselEl) {
      leftBtn.onclick = () => carouselEl.scrollBy({ left: -600, behavior: 'smooth' });
      rightBtn.onclick = () => carouselEl.scrollBy({ left: 600, behavior: 'smooth' });
    }
  });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);