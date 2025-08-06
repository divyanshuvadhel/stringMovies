import { getTVDetails, getTVCredits, getSimilarTVShows, getTVVideos, getPopularTVShows } from "../../src/js/data.js";
import MovieSlider from "../../src/js/movieSlider.js";

function getTVIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

async function loadTVDetails() {
  const tvId = getTVIdFromURL();
  
  if (!tvId) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const [tvDetails, credits, similarShows, videos, popularShows] = await Promise.all([
      getTVDetails(tvId),
      getTVCredits(tvId),
      getSimilarTVShows(tvId),
      getTVVideos(tvId),
      getPopularTVShows()
    ]);

    renderTVDetails(tvDetails, credits, similarShows, videos, popularShows);
    
  } catch (error) {
    console.error('Error loading TV details:', error);
    document.getElementById('loading').innerHTML = '<div class="text-red-500 text-center">Failed to load TV show details</div>';
  }
}

function renderTVDetails(tv, credits, similar, videos, popular) {
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('tv-content').classList.remove('hidden');

  document.title = `${tv.name} - StringMovies`;

  if (tv.backdrop_path) {
    document.getElementById('backdrop-container').innerHTML = 
      `<img src="https://image.tmdb.org/t/p/original${tv.backdrop_path}" class="w-full h-full object-cover" alt="${tv.name}">`;
  }

  document.getElementById('tv-poster').src = tv.poster_path 
    ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
    : 'https://via.placeholder.com/400x600?text=No+Image';

  document.getElementById('tv-title').textContent = tv.name;
  document.getElementById('tv-year').textContent = tv.first_air_date?.split('-')[0] || 'TBD';
  document.getElementById('tv-seasons').textContent = `${tv.number_of_seasons} Season${tv.number_of_seasons !== 1 ? 's' : ''}`;
  document.getElementById('tv-rating').textContent = `⭐ ${tv.vote_average?.toFixed(1)}`;
  document.getElementById('tv-overview').textContent = tv.overview;

  const genresContainer = document.getElementById('tv-genres');
  genresContainer.innerHTML = tv.genres?.map(genre => 
    `<span class="bg-gray-700 px-3 py-1 rounded-full text-sm">${genre.name}</span>`
  ).join('') || '';

  const creator = tv.created_by?.[0];
  document.getElementById('tv-creator').textContent = creator?.name || 'N/A';
  document.getElementById('tv-status').textContent = tv.status || 'N/A';

  renderCastGrid(credits.cast?.slice(0, 18) || [], credits.crew || []);
  renderReviewSection(tv.id, 'tv');
  
  new MovieSlider('similar-slider', 'Similar TV Shows', similar.results || []);
  new MovieSlider('popular-slider', 'Popular TV Shows', popular.results || []);

  setupTrailerModal(videos.results || []);
}

function renderCastGrid(cast, crew) {
  const castGrid = document.getElementById('cast-grid');
  const creator = crew.find(person => person.job === 'Executive Producer');
  const writer = crew.find(person => person.job === 'Writer');
  
  const keyPeople = [];
  if (creator) keyPeople.push({...creator, character: 'Creator'});
  if (writer) keyPeople.push({...writer, character: 'Writer'});
  
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
    if (e.target === modal) closeBtn.click();
  };
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
    const { addReview } = await import('../../src/js/firebase.js');
    const success = await addReview(id, type, reviewData);
    
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
    alert('Failed to submit review. Please check your connection.');
  }
  
  submitBtn.textContent = 'Submit Review';
  submitBtn.disabled = false;
};

async function loadReviews(id, type) {
  const reviewsList = document.getElementById('reviews-list');
  reviewsList.innerHTML = '<div class="text-center py-4">Loading reviews...</div>';
  
  const { getReviews } = await import('../../src/js/firebase.js');
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

document.addEventListener('DOMContentLoaded', loadTVDetails);