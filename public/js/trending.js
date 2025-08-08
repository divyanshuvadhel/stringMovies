import { getTodayTop, getTrendingWeek } from "../src/js/data.js";
import MovieSlider from "../src/js/movieSlider.js";

async function loadTrendingPage() {
  try {
    const [trendingToday, trendingWeek] = await Promise.all([
      getTodayTop(),
      getTrendingWeek()
    ]);

    new MovieSlider('trending-today', 'Trending Today', trendingToday.results);
    new MovieSlider('trending-week', 'Trending This Week', trendingWeek.results);
  } catch (error) {
    console.error('Error loading trending:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadTrendingPage);