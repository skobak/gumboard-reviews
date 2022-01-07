import './App.css';

import React, { useEffect, useState } from 'react';
import ProductItem from './components/ProductItem';
import ProductCard from './components/ProductCard';
import {
  getProducts,
  addProduct,
  addReview,
  getProductUpdateSubsciption,
  productChange$,
} from './db';
import ReviewModal from './components/ReviewModal';

function App() {
  // Handle subscriptions
  let productChangeSubscription;
  let dbStreamSubscription;

  // State
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ uid: '', name: '' });
  const [reviews, setReviews] = useState([]);
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const [loader, setLoader] = useState(true);

  // Handle pages: We do not use routing for simplicity and smaller bundle size
  const [isHomePage, setHomePage] = useState(true);
  const [isProductPage, setProductPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setProducts(await getProducts());
      setLoader(false);
    };
    fetchData();
  }, []);

  const saveReview = async (rating, text) => {
    setOverlayVisibility(false);
    if (!rating) return;
    await addReview(product.uid, rating, text);
  };

  const setProductChangeSubscription = () => {
    if (productChangeSubscription) {
      productChangeSubscription.unsubscribe();
    }
    productChangeSubscription = productChange$.subscribe(async (doc) => {
      if (doc) {
        setReviews(doc.docs.map((result) => result.data()));
        setLoader(false);
      }
    });
  };

  const setFirestoreSubscription = (productUID) => {
    if (dbStreamSubscription) {
      dbStreamSubscription();
    }
    dbStreamSubscription = getProductUpdateSubsciption(productUID);
  };

  const cleanAllSubscriptions = () => {
    if (productChangeSubscription) {
      productChangeSubscription.unsubscribe();
    }
    if (dbStreamSubscription) {
      dbStreamSubscription();
    }
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
    setLoader(true);
    goProductPage();
    setProduct({ uid: product.uid, name: product.name });
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
              await addProduct(`New Product ${products.length + 1}`);
              setProducts(await getProducts());
            }}
          >
            Add product
          </button>
          <button onClick={() => goHomePage()} className="btn">
            Home
          </button>
        </div>
        {loader && <div className="loader">Loading...</div>}
        {isHomePage && !loader && (
          <div>
            {products.map((product, index) => (
              <ProductItem
                key={product.uid}
                product={product}
                onClick={(product) => onProductSelected(product)}
              />
            ))}
          </div>
        )}
        {isProductPage && !loader && (
          <div>
            <ProductCard
              name={product?.name}
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
