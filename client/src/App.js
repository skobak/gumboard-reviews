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
  let productChangeSubscription;
  let dbStreamSubscription;
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
  };

  const setProductChangeSubscription = () => {
    if (productChangeSubscription) {
      productChangeSubscription.unsubscribe();
    }
    productChangeSubscription = productChange$.subscribe(async (doc) => {
      if (doc) {
        setReviews(doc.docs.map((result) => result.data()));
      }
    });
  };

  const cleanAllSubscriptions = () => {
    if (productChangeSubscription) {
      productChangeSubscription.unsubscribe();
    }
    if (dbStreamSubscription) {
      dbStreamSubscription();
    }
  };

  const setFirestoreSubscription = (productUID) => {
    if (dbStreamSubscription) {
      dbStreamSubscription();
    }
    dbStreamSubscription = getProductUpdateSubsciption(productUID);
  };

  const goHomePage = () => {
    cleanAllSubscriptions();
    setProductPage(false);
    setHomePage(true);
  };

  const goProductPage = () => {
    setProductPage(true);
    setHomePage(false);
  };

  const onProductSelected = async (product) => {
    goProductPage();
    setProductName(product.name);
    setProductUid(product.uid);
    setProductChangeSubscription();
    setFirestoreSubscription(product.uid);
  };

  return (
    <div className="App">
      <div id="root">
        <h1>Review challenge MVP</h1>
        <div className="helping-panel">
          <button
            className="btn"
            onClick={async () => {
              await addProduct('New Product');
              setProducts(await getProducts());
            }}
          >
            Add product
          </button>
          <button onClick={() => goHomePage()} className="btn">
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
