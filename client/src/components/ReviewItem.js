import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';

const Review = ({ review }) => {
  return (
    <div className="review">
      <Stars editable={false} value={review.rating}></Stars>
      <span className="review-rating">
        {parseFloat(review.rating).toFixed(1)}
      </span>
      {review.text && (
        <span className="review-text">
          {`, `} {review.text}
        </span>
      )}
    </div>
  );
};

Review.defaultProps = {
  product: {},
  onClick: () => {},
};
Review.propTypes = {
  product: PropTypes.object,
  onClick: PropTypes.func,
};

export default Review;
