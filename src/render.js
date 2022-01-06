/** *
 *
 *  This file is in charge of rendering dynamic content
 *  All data is stored into simple state object (which is mutable on purpose, for simplicity)
 *
 */
import state from './state';

const root = document.getElementById('root');
const overlay = document.getElementById('overlay');

const renderProducts = (products, onProductClick) => {
  root.innerHTML = '';
  for (let index = 0; index < products.length; index++) {
    const data = products[index];
    const productElement = document.createElement('div');
    productElement.className = 'product';
    const productNameContent = document.createTextNode(data.name);
    productElement.appendChild(productNameContent);
    productElement.addEventListener('click', () =>
      onProductClick(data.uid, data.name),
    );
    root.appendChild(productElement);
  }
};

const renderSpan = (container, text, className) => {
  className = className || '';
  const span = document.createElement('span');
  span.className = className;
  const spanConent = document.createTextNode(text);
  span.appendChild(spanConent);
  container.appendChild(span);
};

const renderHeader = (container, name) => {
  appendDOMElement(container, name, 'h2', 'product-header');
};

const appendDOMElement = (container, text, type, className) => {
  const DOMElement = document.createElement(type);
  DOMElement.className = className;
  const DOMElementContent = document.createTextNode(text);
  DOMElement.appendChild(DOMElementContent);
  container.appendChild(DOMElement);
};

const renderRate = (container, rate) => {
  const rateElement = document.createElement('div');
  rateElement.className = 'totalRate';
  const rateContent = document.createTextNode(parseFloat(rate).toFixed(1));
  rateElement.appendChild(rateContent);
  container.appendChild(rateElement);
};

function renderStarIcon(node) {
  const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path',
  );
  iconSvg.setAttribute('fill', 'fill');
  iconSvg.setAttribute('viewBox', '0 0 24 24');
  iconSvg.classList.add('star-icon');

  iconPath.setAttribute(
    'd',
    'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  );
  iconPath.setAttribute('stroke-linecap', 'round');
  iconPath.setAttribute('stroke-linejoin', 'round');
  iconPath.setAttribute('stroke-width', '2');
  iconSvg.appendChild(iconPath);
  return node.appendChild(iconSvg);
}

const renderStars = (container, value) => {
  const starsElement = document.createElement('div');

  starsElement.className = 'rating disabled';

  const stars = [5, 4, 3, 2, 1];
  stars.forEach((star) => {
    const starElement = document.createElement('span');
    starElement.className = 'star';
    // We use reverse becuase we use CSS for hihglighting hover stars and their previous siblings
    if (star <= value) {
      starElement.className += ' active';
    }
    renderStarIcon(starElement);
    starElement.addEventListener('click', (e) => {
      // we need to stop propagation to prevent closing overlay
      e.stopPropagation();
      state.rating = star;
      document.getElementById('edit-rating').innerHTML = '';
      renderStars(document.getElementById('edit-rating'), state.rating, true);
    });
    starsElement.appendChild(starElement);
  });
  container.appendChild(starsElement);
};

const showOverlay = () => {
  overlay.classList.remove('hide');
};

const renderAddReviewBtn = (container) => {
  const addReviewBtn = document.createElement('button');
  addReviewBtn.className = 'add-review-btn btn';
  addReviewBtn.setAttribute('id', 'add-review-btn');
  const addReviewBtnContent = document.createTextNode('Add review');
  addReviewBtn.appendChild(addReviewBtnContent);
  addReviewBtn.addEventListener('click', () => {
    showOverlay();
  });
  container.appendChild(addReviewBtn);
};

const renderReview = (container, review) => {
  const reviewElement = document.createElement('div');
  reviewElement.className = 'review';
  renderStars(reviewElement, review.rating, false);
  renderSpan(reviewElement, review.rating, 'reviewRating');
  renderSpan(reviewElement, `,${review.text}`, 'reviewText');
  container.appendChild(reviewElement);
};

const renderReviews = (container, reviews) => {
  reviews.forEach((review) => {
    renderReview(container, review);
  });
};

const renderProduct = (container, name, reviews, rate) => {
  renderHeader(container, name);
  const leftPartContainer = document.createElement('div');
  leftPartContainer.className = 'left-part';
  renderRate(leftPartContainer, rate);
  renderStars(leftPartContainer, rate, false);

  const rightPartContainer = document.createElement('div');
  rightPartContainer.className = 'right-part';

  renderAddReviewBtn(rightPartContainer);

  const rowContaier = document.createElement('div');
  rowContaier.className = 'ratingRow';

  container.appendChild(rowContaier);
  rowContaier.appendChild(leftPartContainer);
  rowContaier.appendChild(rightPartContainer);

  appendDOMElement(container, 'Reviews', 'h3', 'reviews-title');
  renderReviews(container, reviews);
};

const reRenderRating = () => {
  const rating = document.getElementById('edit-rating');

  // We use reverse because of how CSS highlighting hover stars and their previous siblings
  for (let i = rating.childNodes.length; i > 0; i--) {
    const child = rating.childNodes[i];
    if (child && child.nodeName && child.nodeName === 'SPAN') {
      if (parseInt(child.dataset.value, 10) <= state.rating) {
        child.classList.add('active');
      } else {
        child.classList.remove('active');
      }
    }
  }
};

export { renderProducts, renderProduct, reRenderRating };
