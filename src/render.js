import state from './state';

const root = document.getElementById('root');

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

const appendInputElement = (container, placeholder, id) => {
  const DOMElement = document.createElement('input');
  DOMElement.setAttribute('id', id);
  DOMElement.setAttribute('placeholder', placeholder);
  DOMElement.addEventListener('keyup', (event) => {
    state.text = event.target.value;
  });
  container.appendChild(DOMElement);
};
const appendButtonElement = (container, text, callback) => {
  const DOMElement = document.createElement('button');
  const DOMElementContent = document.createTextNode(text);
  DOMElement.appendChild(DOMElementContent);
  DOMElement.addEventListener('click', callback);
  container.appendChild(DOMElement);
};

const renderRate = (container, rate) => {
  const rateElement = document.createElement('div');
  rateElement.className = 'rate';
  const rateContent = document.createTextNode(parseFloat(rate).toFixed(1));
  rateElement.appendChild(rateContent);
  container.appendChild(rateElement);
};

const renderStars = (container, value, editable) => {
  const starsElement = document.createElement('div');

  starsElement.className = 'rating';
  if (editable) {
    starsElement.setAttribute('id', 'edit-rating');
  } else {
    starsElement.className += ' disabled';
  }

  const stars = [5, 4, 3, 2, 1];
  stars.forEach((star, index) => {
    const starElement = document.createElement('span');
    starElement.className = 'star';
    // Becuase of reverse order
    if (star <= value) {
      starElement.className += ' active';
    }
    const startContent = document.createTextNode('☆');
    starElement.appendChild(startContent);
    starElement.addEventListener('click', () => {
      state.rating = star;
      document.getElementById('edit-rating').innerHTML = '';
      renderStars(document.getElementById('edit-rating'), state.rating, true);
    });
    starsElement.appendChild(starElement);
  });
  container.appendChild(starsElement);
};

const renderOverlay = (container, name, onReviewSubmit) => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.setAttribute('id', 'overlay');
  renderHeader(overlay, name);
  appendDOMElement(overlay, 'Rating', 'label', 'label');
  renderStars(overlay, state.rating, true);
  appendDOMElement(overlay, 'Review', 'label', 'label');
  appendInputElement(overlay, 'Start typing...', 'review');
  appendButtonElement(overlay, 'Submit review', onReviewSubmit);
  container.appendChild(overlay);
};

const renderAddReviewBtn = (container, onReviewSubmit) => {
  const addReviewBtn = document.createElement('button');
  addReviewBtn.className = 'add-review-btn';
  const addReviewBtnContent = document.createTextNode('Add review');
  addReviewBtn.appendChild(addReviewBtnContent);
  addReviewBtn.addEventListener('click', () => {
    renderOverlay(root, 'What’s your rating?', onReviewSubmit);
    console.log('Add review');
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

const renderProduct = (container, name, reviews, rate, onReviewSubmit) => {
  renderHeader(container, name);
  // Render Rate,Start and Add Review button
  const leftPartContainer = document.createElement('div');
  leftPartContainer.className = 'left-part';
  renderRate(leftPartContainer, rate);
  renderStars(leftPartContainer, rate, false);

  const rightPartContainer = document.createElement('div');
  rightPartContainer.className = 'right-part';

  renderAddReviewBtn(rightPartContainer, onReviewSubmit);

  const rowContaier = document.createElement('div');
  rowContaier.className = 'row';

  container.appendChild(rowContaier);
  rowContaier.appendChild(leftPartContainer);
  rowContaier.appendChild(rightPartContainer);

  renderHeader(container, 'Reviews');
  // Render reviews
  renderReviews(container, reviews);
};

export { renderProducts, renderProduct };
