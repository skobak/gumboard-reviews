const root = document.getElementById('root');

const renderProducts = (products, onProductClick) => {
  root.innerHTML = '';
  for (let index = 0; index < products.length; index++) {
    const data = products[index];
    const productElement = document.createElement('div');
    productElement.className = 'product';
    const productNameContent = document.createTextNode(data.name);
    productElement.appendChild(productNameContent);
    productElement.addEventListener('click', () => onProductClick(data.uid));
    root.appendChild(productElement);
  }
};

const renderProduct = (product) => {};

const _renderProductHeader = (name) => {};

const _renderTotalScore = (totalScore) => {};

const _rederAddReviewBtn = () => {};

const _renderRevew = (review) => {};

const _renderReviews = (reviews) => {};

const _renderReview = (review) => {};

export { renderProducts, renderProduct };
