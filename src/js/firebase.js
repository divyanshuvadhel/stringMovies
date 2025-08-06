import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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
    // Validate input data
    if (!contentId || !contentType || !reviewData) {
      throw new Error('Missing required review data');
    }
    
    await addDoc(collection(db, 'reviews'), {
      contentId: String(contentId),
      contentType: String(contentType),
      ...reviewData,
      timestamp: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding review:', error);
    return { success: false, error: error.message };
  }
}

export async function getReviews(contentId, contentType) {
  try {
    // Validate input
    if (!contentId || !contentType) {
      throw new Error('Missing contentId or contentType');
    }
    
    // Optimized query with server-side filtering
    const q = query(
      collection(db, 'reviews'),
      where('contentId', '==', String(contentId)),
      where('contentType', '==', String(contentType)),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { error: error.message, reviews: [] };
  }
}