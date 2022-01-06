import './App.css';

import React, { useEffect, useState } from 'react';
import Product from './components/Product';
import ProductReviews from './components/ProductReviews';
import {
  getProducts,
  addProduct,
  getProductReviews,
  addReview,
  getProductUpdateSubsciption,
  productChange$,
} from './db';
import ReviewModal from './components/ReviewModal';

function App() {
  const [streamSubcription, setStreamSubcription] = useState(null);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productUID, setProductUid] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isOverlayVisible, setOverlayVisibility] = useState(false);

  // We do not use routing for simplicity and smaller bundle size
  const [isHomePage, setHomePage] = useState(true);
  const [isProductPage, setProductPage] = useState(false);

  useEffect(async () => {
    setProducts(await getProducts());
  }, []);

  const saveReview = async (rating, text) => {
    setOverlayVisibility(false);
    if (!rating) return;
    await addReview(productUID, rating, text);
    setReviews(await getProductReviews(productUID));
  };

  const onProductSelected = async (product) => {
    setProductPage(true);
    setHomePage(false);
    setProductName(product.name);
    setProductUid(product.uid);
    if (streamSubcription) {
      streamSubcription.unsubscribe();
    }
    const subscripton = productChange$.subscribe((doc) => {
      if (doc) {
        console.log(doc.data());
      }
    });
    setStreamSubcription(subscripton);

    getProductUpdateSubsciption(product.uid);

    setReviews(await getProductReviews(product.uid));
  };

  const showOverlay = () => {
    setOverlayVisibility(false);
  };

  return (
    <div className="App">
      <div id="root">
        <h1>Review challenge MVP</h1>
        <div className="helping-panel">
          <button className="btn">Add product</button>
          <button
            onClick={() => {
              setHomePage(true);
              setProductPage(false);
            }}
            className="btn"
          >
            Home
          </button>
        </div>
        {isHomePage && (
          <div>
            {products.map((product, index) => (
              <Product
                key={product.uid}
                product={product}
                onClick={(product) => onProductSelected(product)}
              />
            ))}
          </div>
        )}
        {isProductPage && (
          <div>
            <ProductReviews
              name={productName}
              reviews={reviews}
              onAddReviewClick={() => setOverlayVisibility(true)}
            />
          </div>
        )}
      </div>
      {isOverlayVisible && (
        <ReviewModal
          onSubmit={(rating, text) => saveReview(rating, text)}
        ></ReviewModal>
      )}
    </div>
  );
}

export default App;
