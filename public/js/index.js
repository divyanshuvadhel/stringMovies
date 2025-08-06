import { getToprated,getTodayTop,getFeaturedMovies,getNewRelease } from "../../src/js/data.js";



// // const featuredMovies = [
// //   {
// //     title: "The Batman",
// //     image: "https://i.ytimg.com/vi/mqqft2x_Aa4/maxresdefault.jpg",
// //     rating: "⭐ 8.9",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "Oppenheimer",
// //     image: "https://i.ytimg.com/vi/uYPbbksJxIg/maxresdefault.jpg",
// //     rating: "⭐ 9.1",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "Joker",
// //     image: "https://i.ytimg.com/vi/zAGVQLHvwOY/maxresdefault.jpg",
// //     rating: "⭐ 8.5",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "Inception",
// //     image: "https://i.ytimg.com/vi/YoHD9XEInc0/maxresdefault.jpg",
// //     rating: "⭐ 8.8",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "Interstellar",
// //     image: "https://i.ytimg.com/vi/zSWdZVtXT7E/maxresdefault.jpg",
// //     rating: "⭐ 8.6",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "Avengers: Endgame",
// //     image: "https://i.ytimg.com/vi/TcMBFSGVi1c/maxresdefault.jpg",
// //     rating: "⭐ 8.4",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "Dune",
// //     image: "https://i.ytimg.com/vi/n9xhJrPXop4/maxresdefault.jpg",
// //     rating: "⭐ 8.3",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "No Time to Die",
// //     image: "https://i.ytimg.com/vi/BIhNsAtPbPI/maxresdefault.jpg",
// //     rating: "⭐ 7.5",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "The Dark Knight",
// //     image: "https://i.ytimg.com/vi/EXeTwQWrcwY/maxresdefault.jpg",
// //     rating: "⭐ 9.0",
// //     detailsBtnText: "View Details"
// //   },
// //   {
// //     title: "Avatar: The Way of Water",
// //     image: "https://i.ytimg.com/vi/d9MyW72ELq0/maxresdefault.jpg",
// //     rating: "⭐ 7.9",
// //     detailsBtnText: "View Details"
// //   }
// // ];

// // const topPicks = [
//   {
//     title: "The Batman",
//     rating: "8.9",
//     image: "https://i.ytimg.com/vi/mqqft2x_Aa4/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BOGE2NWUwMDItMjA4Yi00N2Y3LWJjMzEtMDJjZTMzZTdlZGE5XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt1877830/"
//   },
//   {
//     title: "Oppenheimer",
//     rating: "9.1",
//     image: "https://i.ytimg.com/vi/uYPbbksJxIg/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt15398776/"
//   },
//   {
//     title: "Inception",
//     rating: "8.8",
//     image: "https://i.ytimg.com/vi/YoHD9XEInc0/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt1375666/"
//   },
//   {
//     title: "Interstellar",
//     rating: "8.6",
//     image: "https://i.ytimg.com/vi/zSWdZVtXT7E/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt0816692/"
//   },
//   {
//     title: "The Dark Knight",
//     rating: "9.0",
//     image: "https://i.ytimg.com/vi/EXeTwQWrcwY/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt0468569/"
//   },
//   {
//     title: "Avatar: The Way of Water",
//     rating: "8.1",
//     image: "https://i.ytimg.com/vi/d9MyW72ELq0/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt1630029/"
//   },
//   {
//     title: "Avengers: Endgame",
//     rating: "8.4",
//     image: "https://i.ytimg.com/vi/TcMBFSGVi1c/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt4154796/"
//   },
//   {
//     title: "Joker",
//     rating: "8.5",
//     image: "https://i.ytimg.com/vi/zAGVQLHvwOY/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt7286456/"
//   },
//   {
//     title: "Dune",
//     rating: "8.2",
//     image: "https://i.ytimg.com/vi/8g18jFHCLXk/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt1160419/"
//   },
//   {
//     title: "Spider-Man: No Way Home",
//     rating: "8.7",
//     image: "https://i.ytimg.com/vi/JfVOs4VSpmA/maxresdefault.jpg",
//     image9_16: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1280_.jpg",
//     detailsLink: "https://www.imdb.com/title/tt10872600/"
//   }
// // ];
// // // const newReleases = [
// //   {
// //     title: "Nobody 2",
// //     rating: "TBD", // To Be Determined - just released
// //     image: "https://i.ytimg.com/vi/wZti8QKBWPo/maxresdefault.jpg",
// //     image9_16: "https://i.ytimg.com/vi_webp/wZti8QKBWPo/sddefault.webp",
// //     detailsLink: "https://www.imdb.com/title/tt28996126/",
// //     releaseDate: "August 15, 2025"
// //   },
// //   {
// //     title: "The Bad Guys 2",
// //     rating: "7.2",
// //     image: "https://i.ytimg.com/vi/_dVFknPLTrY/maxresdefault.jpg",
// //     image9_16: "https://i.ytimg.com/vi_webp/_dVFknPLTrY/sddefault.webp",
// //     detailsLink: "https://www.imdb.com/title/tt30017619/",
// //     releaseDate: "August 1, 2025"
// //   },
// //   {
// //     title: "The Naked Gun",
// //     rating: "TBD",
// //     image: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
// //     image9_16: "https://i.ytimg.com/vi_webp/dQw4w9WgXcQ/sddefault.webp",
// //     detailsLink: "https://www.imdb.com/title/tt27688495/",
// //     releaseDate: "August 1, 2025"
// //   },
// //   {
// //     title: "Weapons",
// //     rating: "TBD",
// //     image: "https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg",
// //     image9_16: "https://i.ytimg.com/vi_webp/9bZkp7q19f0/sddefault.webp",
// //     detailsLink: "https://www.imdb.com/title/tt15255876/",
// //     releaseDate: "August 8, 2025"
// //   },
// //   {
// //     title: "Witchboard",
// //     rating: "TBD",
// //     image: "https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
// //     image9_16: "https://i.ytimg.com/vi_webp/jNQXAC9IVRw/sddefault.webp",
// //     detailsLink: "https://www.imdb.com/title/tt13143276/",
// //     releaseDate: "August 15, 2025"
// //   },
// //   {
// //     title: "Caught Stealing",
// //     rating: "TBD",
// //     image: "https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
// //     image9_16: "https://i.ytimg.com/vi_webp/ScMzIvxBSi4/sddefault.webp",
// //     detailsLink: "https://www.imdb.com/title/tt15092488/",
// //     releaseDate: "August 29, 2025"
// //   },
// //   {
// //     title: "Eenie Meanie",
// //     rating: "TBD",
// //     image: "https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
// //     image9_16: "https://i.ytimg.com/vi_webp/kJQP7kiw5Fk/sddefault.webp",
// //     detailsLink: "https://www.imdb.com/title/tt16426934/",
// //     releaseDate: "August 22, 2025"
// //   },
// //   {
// //     title: "Trust",
// //     rating: "TBD",
// //     image: "https://i.ytimg.com/vi/YQHsXMglC9A/maxresdefault.jpg",
// //     image9_16: "https://i.ytimg.com/vi_webp/YQHsXMglC9A/sddefault.webp",
// //     detailsLink: "https://www.imdb.com/title/tt15398690/",
// //     releaseDate: "August 8, 2025"
// //   }
// // // ];

//get the top reated movies array;
const toprated=await getToprated();
const topToday=await getTodayTop();
const featuredMovies=await getFeaturedMovies();
const newReleases=await getNewRelease();

// hero section 
const heroSection = document.querySelector('#hero-section');

const heroElements = {
  heroSection: heroSection,
  backgroundImg: heroSection.querySelector('#hero-background'),
  title: heroSection.querySelector('#hero-movieTitle'),
  time: heroSection.querySelector('#time'),
  release: heroSection.querySelector('#release'),
  description: heroSection.querySelector('#description'),
  viewDetails: heroSection.querySelector('#viewDetails'),
};

// function for change the every 5 sec context
function changeHeroSection() {
  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % topToday.results.length;
    const movie = topToday.results[currentIndex];
    heroElements.backgroundImg.innerHTML = `
      <img
        src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}"
        alt=""
        class="w-full h-full object-cover"
      >
    `;
    heroElements.title.textContent = movie.title;
    heroElements.release.textContent =`📆 ${movie.release_date}`;
    heroElements.time.textContent = `⭐ ${movie.vote_average}`;
    heroElements.description.textContent = movie.overview;
    heroElements.viewDetails.href = `XXXXXXXXXXXXXXXXXXXXXXXXXXX${movie.id}`
  }, 7000);
}

changeHeroSection();




// feturd movies list caresoul 

const feturedCarousel=document.body.querySelector('#fetured-carousel');
const feturedContainer=feturedCarousel.parentElement;


featuredMovies.results.forEach((movie, index) => {
  const div = document.createElement("div");
  div.id = index;
  div.className = "relative min-w-[350px] min-h-[200px] rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300";
  div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="${movie.title}" class="w-full h-full object-cover bg-cover">
    <div class="absolute text-white top-0 w-full h-full p-3">
      <span class="text-2xl font-semibold absolute top-1/2 -translate-y-1/2" id="title">${movie.title}</span>
      <span class="absolute top-3 right-5 backdrop-blur-2xl px-3 py-1 rounded-md" id="rating">⭐ ${movie.vote_average}</span>
      <button class="absolute bottom-3 backdrop-blur-3xl px-3 py-1 rounded-md bg-white/45" id="btn">view details</button>
    </div>
  `;
  feturedCarousel.appendChild(div);
});


movieScroll(feturedCarousel);

// function for  moviefs list caresoul scrolling

function movieScroll(container) {
 container.addEventListener('wheel', (e) => {
  e.preventDefault();
  container.scrollBy({
    left: e.deltaY * 4,
    behavior: 'auto'
  });
}); 
}


// function for scrolling trigger 

feturedContainer.querySelector('#left').addEventListener('click',()=>scroll('left',feturedCarousel));
feturedContainer.querySelector('#right').addEventListener('click',()=>scroll('right',feturedCarousel));

function scroll(direction,container){
  container.scrollBy({
    left: direction === 'left' ? -500 : 500,
    behavior: 'smooth'
  });
}



// for top picks movies section 

const topPicksCarousel=document.body.querySelector('#top-picks-carousel');
const topPicksContainer=topPicksCarousel.parentElement;

movieScroll(topPicksCarousel);


// function for scrolling trigger 

topPicksContainer.querySelector('#left').addEventListener('click',()=>scroll('left',topPicksCarousel));
topPicksContainer.querySelector('#right').addEventListener('click',()=>scroll('right',topPicksCarousel));



toprated.results.forEach((movie,index)=>{
    const div=document.createElement('div');
    div.id=index;
    div.className="relative min-w-[220px] min-h-[300px] h-full bg-center rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
    div.innerHTML=` <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="w-full h-full object-contain" alt="">
                <div class="absolute top-0 h-full w-full p-3 ">
                  <span class="text-2xl font-semibold absolute bottom-10 -translate-y-1/2" id="title">${movie.title}</span>
                  <span class="absolute top-3 right-5 backdrop-blur-2xl px-3 py-1 rounded-md" id="rating"">⭐ ${movie.vote_average}</span>
                  <button class="absolute bottom-3  backdrop-blur-md bg-white/10   px-3 py-1 rounded-md" id="btn"> 
                    <a href="">view details</a>
                    
                  </button>
                </div>`

  topPicksCarousel.appendChild(div);             
})



// for new realse section 

const newReleasesCarousel=document.body.querySelector('#new-carousel');
const newReleasesContainer=newReleasesCarousel.parentElement;

movieScroll(newReleasesCarousel);

newReleases.results.forEach((movie,index)=>{
     const div=document.createElement('div');
    div.id=index;
    div.className="relative min-w-[220px] min-h-[300px] h-full bg-center rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
    div.innerHTML=` <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="w-full h-full object-contain" alt="">
                <div class="absolute top-0 h-full w-full p-3 ">
                  <span class="text-2xl font-semibold absolute bottom-10 -translate-y-1/2" id="title">${movie.title}</span>
                  <span class="absolute top-3 right-5 backdrop-blur-2xl px-3 py-1 rounded-md" id="rating"">⭐ ${movie.vote_average}</span>
                  <button class="absolute bottom-3  backdrop-blur-md bg-white/10   px-3 py-1 rounded-md" id="btn"> 
                    <a href="">view details</a>
                    
                  </button>
                </div>`

  newReleasesCarousel.appendChild(div);       
})
newReleasesContainer.querySelector('#left').addEventListener('click',()=>scroll('left',newReleasesCarousel));
newReleasesContainer.querySelector('#right').addEventListener('click',()=>scroll('right',newReleasesCarousel));
