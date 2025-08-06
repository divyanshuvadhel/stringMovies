
 async function getToprated(){
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTEwNmE5YWUzOTZhYWIyYTg1MTliOTE4YjNjZTU2YyIsIm5iZiI6MTcxMTQ1MTk5MC43MzcsInN1YiI6IjY2MDJhZjU2NDU5YWQ2MDE4N2ZjMDk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kP5Gwqlw_4AQehKdmLjcKxNtEAvQTkyx6An9PMQBXa4'
  }
};

  try {
    const res=await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    if(res.ok){
      return res.json();
    }
  } catch (error) {
      console.log(`err at fetching toprated movies tmdb ${error}`);
  }
}


async function getTodayTop(){
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTEwNmE5YWUzOTZhYWIyYTg1MTliOTE4YjNjZTU2YyIsIm5iZiI6MTcxMTQ1MTk5MC43MzcsInN1YiI6IjY2MDJhZjU2NDU5YWQ2MDE4N2ZjMDk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kP5Gwqlw_4AQehKdmLjcKxNtEAvQTkyx6An9PMQBXa4'
  }
};
try {
  const res=await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options);
  if(res.ok){
    return res.json();
  }   
} catch (error) {
console.log(`err at fetching toptoday movies tmdb ${error}`);
}
}

async function getFeaturedMovies(){
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTEwNmE5YWUzOTZhYWIyYTg1MTliOTE4YjNjZTU2YyIsIm5iZiI6MTcxMTQ1MTk5MC43MzcsInN1YiI6IjY2MDJhZjU2NDU5YWQ2MDE4N2ZjMDk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kP5Gwqlw_4AQehKdmLjcKxNtEAvQTkyx6An9PMQBXa4'
  }
};
try {
  const res=await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
  if(res.ok){
    return res.json();
  }
} catch (error) {
console.log(`err at fetching featured movies tmdb ${error}`);
}
} 


async function getNewRelease(){
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTEwNmE5YWUzOTZhYWIyYTg1MTliOTE4YjNjZTU2YyIsIm5iZiI6MTcxMTQ1MTk5MC43MzcsInN1YiI6IjY2MDJhZjU2NDU5YWQ2MDE4N2ZjMDk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kP5Gwqlw_4AQehKdmLjcKxNtEAvQTkyx6An9PMQBXa4'
  }
};

  try {


    const res=await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
    if(res.ok){
      return res.json();
    }
  } catch (error) {
      console.log(`err at fetching toprated movies tmdb ${error}`);
  }
}

export {getToprated ,getTodayTop , getFeaturedMovies,getNewRelease};