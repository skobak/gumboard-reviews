import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product, onClick }) => {
  return (
    <div className="product" onClick={() => onClick(product)}>
      {product?.name}
    </div>
  );
};

Product.defaultProps = {
  product: {},
  onClick: () => {},
};
Product.propTypes = {
  product: PropTypes.object,
  onClick: PropTypes.func,
};

export default Product;
