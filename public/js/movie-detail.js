import { getMovieDetails, getMovieCredits, getSimilarMovies, getMovieVideos, getPopularMovies, getUpcomingMovies, getMovieRecommendations } from "../src/js/data.js";
import MovieSlider from "../src/js/movieSlider.js";

// Get movie ID from URL parameters
function getMovieIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Format runtime
function formatRuntime(minutes) {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Load movie details
async function loadMovieDetails() {
  const movieId = getMovieIdFromURL();
  
  if (!movieId) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const [movieDetails, credits, similarMovies, videos, popularMovies, upcomingMovies, recommendations] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getSimilarMovies(movieId),
      getMovieVideos(movieId),
      getPopularMovies(),
      getUpcomingMovies(),
      getMovieRecommendations(movieId)
    ]);

    renderMovieDetails(movieDetails, credits, similarMovies, videos, popularMovies, upcomingMovies, recommendations);
    
  } catch (error) {
    console.error('Error loading movie details:', error);
    document.getElementById('loading').innerHTML = '<div class="text-red-500 text-center">Failed to load movie details</div>';
  }
}

// Render movie details
function renderMovieDetails(movie, credits, similar, videos, popular, upcoming, recommendations) {
  // Hide loading, show content
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('movie-content').classList.remove('hidden');

  // Set page title
  document.title = `${movie.title} - StringMovies`;

  // Backdrop
  if (movie.backdrop_path) {
    document.getElementById('backdrop-container').innerHTML = 
      `<img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="w-full h-full object-cover" alt="${movie.title}">`;
  }

  // Poster
  document.getElementById('movie-poster').src = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/400x600?text=No+Image';

  // Basic info
  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-year').textContent = movie.release_date?.split('-')[0] || 'TBD';
  document.getElementById('movie-runtime').textContent = formatRuntime(movie.runtime);
  document.getElementById('movie-rating').textContent = `⭐ ${movie.vote_average?.toFixed(1)}`;
  document.getElementById('movie-overview').textContent = movie.overview;

  // Genres
  const genresContainer = document.getElementById('movie-genres');
  genresContainer.innerHTML = movie.genres?.map(genre => 
    `<span class="bg-gray-700 px-3 py-1 rounded-full text-sm">${genre.name}</span>`
  ).join('') || '';

  // Director
  const director = credits.crew?.find(person => person.job === 'Director');
  document.getElementById('movie-director').textContent = director?.name || 'N/A';

  // Top cast
  const topCast = credits.cast?.slice(0, 3) || [];
  document.getElementById('movie-cast').innerHTML = topCast.map(actor => actor.name).join(', ');

  // Cast grid
  renderCastGrid(credits.cast?.slice(0, 18) || [], credits.crew || []);

  // Setup review section
  renderReviewSection(movie.id, 'movie');

  // Setup movie sliders
  setupMovieSliders(recommendations.results || [], similar.results || [], popular.results || [], upcoming.results || []);

  // Setup trailer functionality
  setupTrailerModal(videos.results || []);
}

// Render cast grid
function renderCastGrid(cast, crew) {
  const castGrid = document.getElementById('cast-grid');
  
  // Combine cast and key crew members
  const director = crew.find(person => person.job === 'Director');
  const writer = crew.find(person => person.job === 'Writer' || person.job === 'Screenplay');
  const producer = crew.find(person => person.job === 'Producer');
  
  const keyPeople = [];
  if (director) keyPeople.push({...director, character: 'Director'});
  if (writer) keyPeople.push({...writer, character: 'Writer'});
  if (producer) keyPeople.push({...producer, character: 'Producer'});
  
  const allPeople = [...keyPeople, ...cast];
  
  castGrid.innerHTML = allPeople.map(person => `
    <div class="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform">
      <img src="${person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : 'https://via.placeholder.com/300x400?text=No+Photo'}" 
           class="w-full h-48 object-cover" alt="${person.name}">
      <div class="p-3">
        <p class="font-semibold text-sm truncate">${person.name}</p>
        <p class="text-xs text-gray-400 truncate">${person.character || person.job}</p>
      </div>
    </div>
  `).join('');
}

// Setup movie sliders
function setupMovieSliders(recommendations, similar, popular, upcoming) {
  new MovieSlider('recommendations-slider', 'Recommended for You', recommendations);
  new MovieSlider('similar-slider', 'More Like This', similar);
  new MovieSlider('popular-slider', 'Popular Movies', popular);
  new MovieSlider('upcoming-slider', 'Coming Soon', upcoming);
}

// Render review section
function renderReviewSection(id, type) {
  const reviewSection = document.getElementById('review-section');
  reviewSection.innerHTML = `
    <div class="bg-gray-900 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold mb-4">Write a Review</h3>
      <div class="space-y-4">
        <input type="text" id="reviewer-name" placeholder="Your Name" class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg">
        <div class="flex items-center gap-2">
          <span>Rating:</span>
          <div id="star-rating" class="flex gap-1">
            ${[1,2,3,4,5].map(i => `<span class="star cursor-pointer text-2xl text-gray-400 hover:text-amber-400" data-rating="${i}">★</span>`).join('')}
          </div>
        </div>
        <textarea id="review-text" placeholder="Write your review..." class="w-full bg-gray-800 text-white px-4 py-2 rounded-lg h-24"></textarea>
        <button id="submit-btn" onclick="submitReview('${id}', '${type}')" class="bg-amber-400 text-black px-6 py-2 rounded-lg hover:bg-amber-500">Submit Review</button>
      </div>
    </div>
    <div id="reviews-list"></div>
  `;
  
  setupStarRating();
  loadReviews(id, type);
}

function setupStarRating() {
  const stars = document.querySelectorAll('.star');
  let selectedRating = 0;
  
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.rating);
      updateStars(selectedRating);
    });
  });
  
  function updateStars(rating) {
    stars.forEach((star, index) => {
      star.classList.toggle('text-amber-400', index < rating);
      star.classList.toggle('text-gray-400', index >= rating);
    });
  }
  
  window.getSelectedRating = () => selectedRating;
}

window.submitReview = async function(id, type) {
  const name = document.getElementById('reviewer-name').value.trim();
  const rating = window.getSelectedRating();
  const text = document.getElementById('review-text').value.trim();
  const submitBtn = document.getElementById('submit-btn');
  
  if (!name || !rating || !text) {
    alert('Please fill all fields');
    return;
  }
  
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;
  
  const reviewData = {
    name,
    rating,
    text,
    date: new Date().toLocaleDateString()
  };
  
  try {
    console.log('Importing Firebase...');
    const { addReview } = await import('../src/js/firebase.js');
    console.log('Submitting review with data:', { id, type, reviewData });
    const success = await addReview(id, type, reviewData);
    console.log('Review submission result:', success);
    
    if (success) {
      document.getElementById('reviewer-name').value = '';
      document.getElementById('review-text').value = '';
      document.querySelectorAll('.star').forEach(star => star.classList.replace('text-amber-400', 'text-gray-400'));
      window.getSelectedRating = () => 0;
      await loadReviews(id, type);
    } else {
      alert('Failed to submit review. Please try again.');
    }
  } catch (error) {
    console.error('Review submission error:', error);
    alert('Failed to submit review. Error: ' + error.message);
  }
  
  submitBtn.textContent = 'Submit Review';
  submitBtn.disabled = false;
};

async function loadReviews(id, type) {
  const reviewsList = document.getElementById('reviews-list');
  reviewsList.innerHTML = '<div class="text-center py-4">Loading reviews...</div>';
  
  const { getReviews } = await import('../src/js/firebase.js');
  const reviews = await getReviews(id, type);
  
  if (reviews.length === 0) {
    reviewsList.innerHTML = '<p class="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>';
    return;
  }
  
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  
  reviewsList.innerHTML = `
    <div class="bg-gray-800 rounded-lg p-4 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="text-2xl font-bold text-amber-400">${avgRating}</div>
          <div class="flex">
            ${[1,2,3,4,5].map(i => `<span class="text-lg ${i <= Math.round(avgRating) ? 'text-amber-400' : 'text-gray-400'}">★</span>`).join('')}
          </div>
        </div>
        <div class="text-gray-400">${reviews.length} review${reviews.length !== 1 ? 's' : ''}</div>
      </div>
    </div>
    ${reviews.map(review => `
      <div class="bg-gray-900 rounded-lg p-4 mb-4">
        <div class="flex justify-between items-start mb-2">
          <h4 class="font-semibold">${review.name}</h4>
          <div class="flex items-center gap-2">
            <div class="flex">
              ${[1,2,3,4,5].map(i => `<span class="text-sm ${i <= review.rating ? 'text-amber-400' : 'text-gray-400'}">★</span>`).join('')}
            </div>
            <span class="text-xs text-gray-400">${review.date}</span>
          </div>
        </div>
        <p class="text-gray-300">${review.text}</p>
      </div>
    `).join('')}
  `;
}

// Setup trailer modal
function setupTrailerModal(videos) {
  const trailerBtn = document.getElementById('watch-trailer-btn');
  const modal = document.getElementById('trailer-modal');
  const closeBtn = document.getElementById('close-trailer');
  const container = document.getElementById('trailer-container');
  
  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube') || videos[0];
  
  if (!trailer) {
    trailerBtn.disabled = true;
    trailerBtn.textContent = 'No Trailer Available';
    trailerBtn.classList.add('opacity-50', 'cursor-not-allowed');
    return;
  }
  
  trailerBtn.onclick = () => {
    container.innerHTML = `<iframe src="https://www.youtube.com/embed/${trailer.key}?autoplay=1" class="w-full h-full" frameborder="0" allowfullscreen></iframe>`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };
  
  closeBtn.onclick = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    container.innerHTML = '';
  };
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  };
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', loadMovieDetails);