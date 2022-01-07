import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ product, onClick }) => {
  return (
    <div className="product" onClick={() => onClick(product)}>
      {product?.name}
    </div>
  );
};

ProductItem.defaultProps = {
  product: {},
  onClick: () => {},
};
ProductItem.propTypes = {
  product: PropTypes.object,
  onClick: PropTypes.func,
};

export default ProductItem;
