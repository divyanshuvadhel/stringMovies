const featuredMovies = [
  {
    title: "The Batman",
    image: "https://i.ytimg.com/vi/mqqft2x_Aa4/maxresdefault.jpg",
    rating: "⭐ 8.9",
    detailsBtnText: "View Details"
  },
  {
    title: "Oppenheimer",
    image: "https://i.ytimg.com/vi/uYPbbksJxIg/maxresdefault.jpg",
    rating: "⭐ 9.1",
    detailsBtnText: "View Details"
  },
  {
    title: "Joker",
    image: "https://i.ytimg.com/vi/zAGVQLHvwOY/maxresdefault.jpg",
    rating: "⭐ 8.5",
    detailsBtnText: "View Details"
  },
  {
    title: "Inception",
    image: "https://i.ytimg.com/vi/YoHD9XEInc0/maxresdefault.jpg",
    rating: "⭐ 8.8",
    detailsBtnText: "View Details"
  },
  {
    title: "Interstellar",
    image: "https://i.ytimg.com/vi/zSWdZVtXT7E/maxresdefault.jpg",
    rating: "⭐ 8.6",
    detailsBtnText: "View Details"
  },
  {
    title: "Avengers: Endgame",
    image: "https://i.ytimg.com/vi/TcMBFSGVi1c/maxresdefault.jpg",
    rating: "⭐ 8.4",
    detailsBtnText: "View Details"
  },
  {
    title: "Dune",
    image: "https://i.ytimg.com/vi/n9xhJrPXop4/maxresdefault.jpg",
    rating: "⭐ 8.3",
    detailsBtnText: "View Details"
  },
  {
    title: "No Time to Die",
    image: "https://i.ytimg.com/vi/BIhNsAtPbPI/maxresdefault.jpg",
    rating: "⭐ 7.5",
    detailsBtnText: "View Details"
  },
  {
    title: "The Dark Knight",
    image: "https://i.ytimg.com/vi/EXeTwQWrcwY/maxresdefault.jpg",
    rating: "⭐ 9.0",
    detailsBtnText: "View Details"
  },
  {
    title: "Avatar: The Way of Water",
    image: "https://i.ytimg.com/vi/d9MyW72ELq0/maxresdefault.jpg",
    rating: "⭐ 7.9",
    detailsBtnText: "View Details"
  }
];


console.log("hellow");


// feturd movies list caresoul 

const feturedCarousel=document.body.querySelector('#fetured-carousel');


featuredMovies.forEach((movie, index) => {
  const div = document.createElement("div");
  div.id = index;
  div.className = "relative min-w-[350px] min-h-[200px] rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300";
  div.innerHTML = `
    <img src="${movie.image}" alt="${movie.title}" class="w-full h-full object-cover">
    <div class="absolute text-white top-0 w-full h-full p-3">
      <span class="text-2xl font-semibold absolute top-1/2 -translate-y-1/2" id="title">${movie.title}</span>
      <span class="absolute top-3 right-5 backdrop-blur-2xl px-3 py-1 rounded-md" id="rating">${movie.rating}</span>
      <button class="absolute bottom-3 backdrop-blur-3xl px-3 py-1 rounded-md bg-white/45" id="btn">${movie.detailsBtnText}</button>
    </div>
  `;
  feturedCarousel.appendChild(div);
});
