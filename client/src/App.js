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
import Seed from './helpers/Seeder';

function App() {
  // Handle subscriptions
  let productChangeSubscription;
  let dbStreamSubscription;

  // State
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ uid: '', name: '' });
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isOverlayVisible, setOverlayVisibility] = useState(false);

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
  const saveReview = async (rating, text) => {
    if (!rating) return;
    await addReview(product.uid, rating, text);
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
        <h1>Review challenge v2</h1>
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
          {isProductPage && (
            <button onClick={() => Seed(product.uid)} className="btn">
              Seed reviews
            </button>
          )}
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
              onReviewAdded={(rating, text) => saveReview(rating, text)}
              isOverlayVisible={isOverlayVisible}
              setOverlayVisibility={setOverlayVisibility}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
