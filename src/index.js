import { getProducts, addProduct, getProductReviews } from './db';
import { renderProducts } from './render';

// Working with DOM part
const addProductBtn = document.getElementById('add-product-button');
addProductBtn.addEventListener('click', () => addProduct('New Product'));

// Callback on product click
const showProduct = async (uid) => {
  await getProductReviews(uid);
};

// async main function
async function main() {
  const products = await getProducts();
  renderProducts(products, (uid) => {
    showProduct(uid);
  });
}

(async () => {
  try {
    await main();
  } catch (e) {
    // Deal with the fact the chain failed
  }
})();
