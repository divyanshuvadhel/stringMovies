import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCCawJHC1SlrdxobB7T6gdiI8D57CmMWcg',
  authDomain: 'stringmovies-b2c1d.firebaseapp.com',
  projectId: 'stringmovies-b2c1d',
  storageBucket: 'stringmovies-b2c1d.firebasestorage.app',
  messagingSenderId: '892568059774',
  appId: '1:892568059774:web:2cdc76a877a38b174bbd2f',
  measurementId: 'G-E8KNPR1E9V'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addReview(contentId, contentType, reviewData) {
  try {
    console.log('Adding review:', { contentId, contentType, reviewData });
    await addDoc(collection(db, 'reviews'), {
      contentId: String(contentId),
      contentType: String(contentType),
      ...reviewData,
      timestamp: new Date()
    });
    console.log('Review added successfully');
    return true;
  } catch (error) {
    console.error('Error adding review:', error);
    return false;
  }
}

export async function getReviews(contentId, contentType) {
  try {
    console.log('Fetching reviews for:', { contentId, contentType });
    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const reviews = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(review => review.contentId === String(contentId) && review.contentType === String(contentType))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    console.log('Reviews fetched:', reviews);
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}