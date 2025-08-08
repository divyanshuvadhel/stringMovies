import { getPopularMovies, getToprated, getUpcomingMovies, getNewRelease } from "../src/js/data.js";
import MovieSlider from "../src/js/movieSlider.js";

async function loadMoviesPage() {
  try {
    const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
      getPopularMovies(),
      getToprated(),
      getUpcomingMovies(),
      getNewRelease()
    ]);

    new MovieSlider('popular-movies', 'Popular Movies', popular.results);
    new MovieSlider('toprated-movies', 'Top Rated Movies', topRated.results);
    new MovieSlider('upcoming-movies', 'Upcoming Movies', upcoming.results);
    new MovieSlider('nowplaying-movies', 'Now Playing', nowPlaying.results);
  } catch (error) {
    console.error('Error loading movies:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadMoviesPage);