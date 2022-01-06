import './App.css';

import React, { useEffect, useState } from 'react';
import Product from './components/Product';
import ProductReviews from './components/ProductReviews';
import { getProducts, addProduct, getProductReviews, addReview } from './db';

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isOverlayVisible, setOverlayVisibility] = useState(false);

  // We do not use routing for simplicity and smaller bundle size
  const [isHomePage, setHomePage] = useState(true);
  const [isProductPage, setProductPage] = useState(false);

  useEffect(async () => {
    setProducts(await getProducts());
  }, []);

  const onProductSelected = async (product) => {
    setProductPage(true);
    setHomePage(false);
    setProductName(product.name);
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
          <button onClick={() => setHomePage(true)} className="btn">
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
        <div id="overlay" className="overlay">
          <h2></h2>
        </div>
      )}
    </div>
  );
}

export default App;
