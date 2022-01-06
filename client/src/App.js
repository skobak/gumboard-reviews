import './App.css';

import React, { useEffect, useState } from 'react';
import Product from './components/Product';
import { getProducts, addProduct, getProductReviews, addReview } from './db';

function App() {
  const [products, setProducts] = useState([]);
  const [isOverlayVisible, setOverlayVisibility] = useState(false);

  // We do not use routing for simplicity and smaller bundle size
  const [isHomePage, setHomePage] = useState(true);
  const [isProductPage, setProductPage] = useState(false);

  useEffect(async () => {
    setProducts(await getProducts());
  }, []);

  const onProductSelected = (productId) => {
    setProductPage(true);
    setHomePage(false);
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
                onClick={(uid) => onProductSelected(uid)}
              />
            ))}
          </div>
        )}
        {isProductPage && <div className="product">Product</div>}
      </div>
      {isOverlayVisible && (
        <div id="overlay" className="overlay">
          Hi
        </div>
      )}
    </div>
  );
}

export default App;
