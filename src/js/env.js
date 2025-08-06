// Environment configuration with fallback values
const API_CONFIG = {
  TMDB_API_KEY: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTEwNmE5YWUzOTZhYWIyYTg1MTliOTE4YjNjZTU2YyIsIm5iZiI6MTcxMTQ1MTk5MC43MzcsInN1YiI6IjY2MDJhZjU2NDU5YWQ2MDE4N2ZjMDk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kP5Gwqlw_4AQehKdmLjcKxNtEAvQTkyx6An9PMQBXa4',
  FIREBASE_API_KEY: 'AIzaSyCCawJHC1SlrdxobB7T6gdiI8D57CmMWcg',
  FIREBASE_AUTH_DOMAIN: 'stringmovies-b2c1d.firebaseapp.com',
  FIREBASE_PROJECT_ID: 'stringmovies-b2c1d',
  FIREBASE_STORAGE_BUCKET: 'stringmovies-b2c1d.firebasestorage.app',
  FIREBASE_MESSAGING_SENDER_ID: '892568059774',
  FIREBASE_APP_ID: '1:892568059774:web:2cdc76a877a38b174bbd2f',
  FIREBASE_MEASUREMENT_ID: 'G-E8KNPR1E9V'
};

const envConfig = {
  get(key) {
    return API_CONFIG[key];
  }
};

export default envConfig;