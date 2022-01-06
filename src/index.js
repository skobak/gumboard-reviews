import { getProducts, addProduct, getProductReviews, addReview } from './db';
import { renderProduct, renderProducts, reRenderRating } from './render';
import calculateAvgRate from './__helpers';
import state from './state';

// DOM references
const addProductBtn = document.getElementById('add-product-button');
const submitReview = document.getElementById('submit-review');
const restartBtn = document.getElementById('restart-button');
const root = document.getElementById('root');
const overlay = document.getElementById('overlay');
const reviewInput = document.getElementById('review-input');
const starOne = document.getElementById('star-1');
const starTwo = document.getElementById('star-2');
const starThree = document.getElementById('star-3');
const starFour = document.getElementById('star-4');
const starFive = document.getElementById('star-5');

// Callback on product click
const showProduct = async (uid, name) => {
  root.innerHTML = '';

  // Save to state (no immutability for MVP simplicity sake)
  state.currentProductUid = uid;
  state.currentProductName = name;

  const reviews = await getProductReviews(uid);

  const rates = [];
  reviews.forEach((review) => {
    rates.push(review.rating);
  });

  const rate = calculateAvgRate(rates);
  renderProduct(root, name, reviews, rate);
};
const hideOverlay = () => {
  overlay.classList.add('hide');
};

const onReviewSubmit = async () => {
  await addReview(state.currentProductUid, state.rating, state.text);
  hideOverlay();
  showProduct(state.currentProductUid, state.currentProductName);
};

const restart = async () => {
  const products = await getProducts();
  renderProducts(products, (uid, name) => {
    showProduct(uid, name);
  });
};

// LISTENERS
submitReview.addEventListener('click', onReviewSubmit);

// Click outside overlay to close
document.addEventListener('click', (event) => {
  // We remove open button too to prevent instant closing
  if (event.target.id === 'add-review-btn') return;

  const isClickInside = overlay.contains(event.target);
  if (!isClickInside) {
    hideOverlay();
  }
});

addProductBtn.addEventListener('click', async () => {
  await addProduct('New Product');
  await restart();
});

restartBtn.addEventListener('click', async () => {
  await restart();
});

reviewInput.addEventListener('keyup', (event) => {
  state.text = event.target.value;
});

starOne.addEventListener('click', () => {
  state.rating = 1;
  reRenderRating();
});

starTwo.addEventListener('click', () => {
  state.rating = 2;
  reRenderRating();
});

starThree.addEventListener('click', () => {
  state.rating = 3;
  reRenderRating();
});
starFour.addEventListener('click', () => {
  state.rating = 4;
  reRenderRating();
});
starFive.addEventListener('click', () => {
  state.rating = 5;
  reRenderRating();
});

// async main function
async function main() {
  await restart();
}

// MAIN
(async () => {
  try {
    await main();
  } catch (e) {
    // Deal with the fact the chain failed
  }
})();
