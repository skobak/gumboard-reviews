import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';
import ReviewItem from './ReviewItem';
import { calculateAvgRate, formatRating } from '../utils/Utils';
import ReviewModal from './ReviewModal';

const ProductCard = ({
  name,
  reviews,
  onReviewAdded,
  isOverlayVisible,
  setOverlayVisibility,
}) => {
  const rates = [];
  reviews.forEach((review) => {
    rates.push(review.rating);
  });
  const avgRating = calculateAvgRate(rates);

  return (
    <div>
      <h2 className="product-header">{name}</h2>
      <div className="rating-row">
        <div className="left-part">
          <div className="total-rate">{formatRating(avgRating)}</div>
          <Stars value={avgRating}></Stars>
        </div>
        <div className="right-part">
          <button
            className="btn"
            onClick={() => setOverlayVisibility(true)}
            data-testid="addReviewButton"
          >
            Add review
          </button>
        </div>
      </div>
      <h3 className="reviews-title">Reviews</h3>
      {reviews.map((review, index) => (
        <ReviewItem key={`review_${index}`} review={review}></ReviewItem>
      ))}
      {isOverlayVisible && (
        <ReviewModal
          onSubmit={(rating, text) => {
            setOverlayVisibility(false);
            onReviewAdded(rating, text);
          }}
        ></ReviewModal>
      )}
    </div>
  );
};

ProductCard.defaultProps = {
  name: '',
  reviews: [],
  onReviewAdded: () => {},
  isOverlayVisible: false,
  setOverlayVisibility: () => {},
};
ProductCard.propTypes = {
  name: PropTypes.string,
  reviews: PropTypes.array,
  onReviewAdded: PropTypes.func,
  isOverlayVisible: PropTypes.bool,
  setOverlayVisibility: PropTypes.func,
};

export default ProductCard;
