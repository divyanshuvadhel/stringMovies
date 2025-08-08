import API_CONFIG from './config.js';

// Simplified API fetch function
async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': API_CONFIG.API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Get top rated movies
async function getToprated() {
  return fetchFromAPI('/movie/top_rated?language=en-US&page=1');
}

// Get trending content for today
async function getTodayTop() {
  return fetchFromAPI('/trending/all/day?language=en-US');
}

// Get featured movies (trending movies)
async function getFeaturedMovies() {
  return fetchFromAPI('/trending/movie/day?language=en-US');
}

// Get new releases (now playing)
async function getNewRelease() {
  return fetchFromAPI('/movie/now_playing?language=en-US&page=1');
}

// Get movie details
async function getMovieDetails(movieId) {
  return fetchFromAPI(`/movie/${movieId}?language=en-US`);
}

// Get movie credits (cast and crew)
async function getMovieCredits(movieId) {
  return fetchFromAPI(`/movie/${movieId}/credits?language=en-US`);
}

// Get similar movies
async function getSimilarMovies(movieId) {
  return fetchFromAPI(`/movie/${movieId}/similar?language=en-US&page=1`);
}

// Get movie videos (trailers)
async function getMovieVideos(movieId) {
  return fetchFromAPI(`/movie/${movieId}/videos?language=en-US`);
}

// Get popular movies
async function getPopularMovies() {
  return fetchFromAPI('/movie/popular?language=en-US&page=1');
}

// Get upcoming movies
async function getUpcomingMovies() {
  return fetchFromAPI('/movie/upcoming?language=en-US&page=1');
}

// Get movie recommendations
async function getMovieRecommendations(movieId) {
  return fetchFromAPI(`/movie/${movieId}/recommendations?language=en-US&page=1`);
}

// Search movies
async function searchMovies(query) {
  return fetchFromAPI(`/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`);
}

// Get TV shows
async function getPopularTVShows() {
  return fetchFromAPI('/tv/popular?language=en-US&page=1');
}

async function getTopRatedTVShows() {
  return fetchFromAPI('/tv/top_rated?language=en-US&page=1');
}

async function getOnTheAirTVShows() {
  return fetchFromAPI('/tv/on_the_air?language=en-US&page=1');
}

// Get trending week
async function getTrendingWeek() {
  return fetchFromAPI('/trending/movie/week?language=en-US');
}

// TV Show APIs
async function getTVDetails(tvId) {
  return fetchFromAPI(`/tv/${tvId}?language=en-US`);
}

async function getTVCredits(tvId) {
  return fetchFromAPI(`/tv/${tvId}/credits?language=en-US`);
}

async function getSimilarTVShows(tvId) {
  return fetchFromAPI(`/tv/${tvId}/similar?language=en-US&page=1`);
}

async function getTVVideos(tvId) {
  return fetchFromAPI(`/tv/${tvId}/videos?language=en-US`);
}

export { getToprated, getTodayTop, getFeaturedMovies, getNewRelease, getMovieDetails, getMovieCredits, getSimilarMovies, getMovieVideos, getPopularMovies, getUpcomingMovies, getMovieRecommendations, searchMovies, getPopularTVShows, getTopRatedTVShows, getOnTheAirTVShows, getTrendingWeek, getTVDetails, getTVCredits, getSimilarTVShows, getTVVideos };