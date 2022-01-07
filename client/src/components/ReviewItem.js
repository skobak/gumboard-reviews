import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';
import { formatRating } from '../utils/Utils';

const ReviewItem = ({ review }) => {
  return (
    <div className="review">
      <Stars editable={false} value={review.rating}></Stars>
      <span className="review-rating" data-testid="rating">
        {formatRating(review.rating)}
      </span>
      {review.text && (
        <span className="review-text">
          {`, `} {review.text}
        </span>
      )}
    </div>
  );
};

ReviewItem.defaultProps = {
  product: {},
  onClick: () => {},
};
ReviewItem.propTypes = {
  product: PropTypes.object,
  onClick: PropTypes.func,
};

export default ReviewItem;
