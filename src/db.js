import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map((result) => result.data());
};
const getProductReviews = async (uid) => {
  const docSnap = await getDocs(collection(db, 'products', uid, 'reviews'));
  return docSnap.docs.map((result) => result.data());
};

async function addProduct(name) {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      name,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export { getProducts, addProduct, getProductReviews };
