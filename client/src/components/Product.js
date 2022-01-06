import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product, onClick }) => {
  return (
    <div className="product" onClick={() => onClick(product.uid)}>
      {product?.name}
    </div>
  );
};

Product.defaultProps = {
  product: {},
};
Product.propTypes = {
  name: PropTypes.object,
};

export default Product;
