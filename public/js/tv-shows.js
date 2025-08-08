import { getPopularTVShows, getTopRatedTVShows, getOnTheAirTVShows } from "../src/js/data.js";
import MovieSlider from "../src/js/movieSlider.js";

async function loadTVShowsPage() {
  try {
    const [popular, topRated, onTheAir] = await Promise.all([
      getPopularTVShows(),
      getTopRatedTVShows(),
      getOnTheAirTVShows()
    ]);

    new MovieSlider('popular-tv', 'Popular TV Shows', popular.results);
    new MovieSlider('toprated-tv', 'Top Rated TV Shows', topRated.results);
    new MovieSlider('ontheair-tv', 'On The Air', onTheAir.results);
  } catch (error) {
    console.error('Error loading TV shows:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadTVShowsPage);