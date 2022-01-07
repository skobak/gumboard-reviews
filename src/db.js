/**
 * This file in charge of DB(Firebase) comunication
 *
 */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBRNQq97S1unHWw-xPIWLeBpzba6_w8sHQ',
  authDomain: 'gumroad-challenge-b8fe4.firebaseapp.com',
  projectId: 'gumroad-challenge-b8fe4',
  storageBucket: 'gumroad-challenge-b8fe4.appspot.com',
  messagingSenderId: '397377957832',
  appId: '1:397377957832:web:76166449ca45f6de609afd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getProductReviews = async (uid) => {
  const docSnap = await getDocs(collection(db, 'products', uid, 'reviews'));
  return docSnap.docs.map((result) => result.data());
};
const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map((result) => result.data());
};

async function addProduct(name) {
  try {
    const docRef = doc(collection(db, 'products'));
    await setDoc(docRef, { name, uid: docRef.id }, { merge: true });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function addReview(productId, rating, text) {
  try {
    await addDoc(collection(db, `products/${productId}/reviews`), {
      rating,
      text,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export { getProducts, addProduct, addReview, getProductReviews };
