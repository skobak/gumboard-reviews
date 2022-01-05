import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
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

// Methods
const addReview = (stars, text) => {
  console.log('AddReview!!');

  // db.collection('reviews').add({
  //   stars,
  //   text,
  // });
};

// get DOM elements references
const addButton = document.getElementById('add-button');
// add event listeners
addButton.addEventListener('click', addReview(4.5, 'I love this product!'));
console.log('--> App is starting');
