import { getProducts, addProduct, getProductReviews, addReview } from './db';
import { renderProduct, renderProducts } from './render';
import { getRate } from './__helpers';
import state from './state';

// Working with DOM part
const addProductBtn = document.getElementById('add-product-button');
const root = document.getElementById('root');

addProductBtn.addEventListener('click', () => addProduct('New Product'));

// Callback on product click
const showProduct = async (uid, name) => {
  root.innerHTML = '';
  state.currentProductUid = uid;
  state.currentProductName = name;
  const reviews = await getProductReviews(uid);

  const rates = [];
  reviews.forEach((review) => {
    rates.push(review.rating);
  });

  const rate = getRate(rates);

  renderProduct(root, name, reviews, rate, onReviewSubmit);
};

const onReviewSubmit = async () => {
  await addReview(state.currentProductUid, state.rating, state.text);
  document.getElementById('overlay').remove();
  showProduct(state.currentProductUid, state.currentProductName);
};

// async main function
async function main() {
  const products = await getProducts();
  renderProducts(products, (uid, name) => {
    showProduct(uid, name);
  });
}

(async () => {
  try {
    await main();
  } catch (e) {
    // Deal with the fact the chain failed
  }
})();
